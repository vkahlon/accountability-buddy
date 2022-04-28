import React, { useState, useEffect } from 'react';
import Header from './header';
import Loading from './loading';
import EditForm from './edit-form';
import EditStats from './edit-stats';
import Error from './error-message';
export default function EditItem(props) {
  const [isRetrieving, setRetrieving] = useState(true);
  const [data, setData] = useState('');
  const [objective, setObjective] = useState('');
  const [results, setResults] = useState('');
  const [item, setItem] = useState('');

  const handleDeletion = item => {
    const action = props.purpose;
    const body = { data: data, id: item.id };
    event.preventDefault();
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${props.token}`
      },
      body: JSON.stringify(body)
    };
    fetch(`/api/delete-${action}/${item.id}`, req)
      .then(res => res.json())
      .then(data => {
        const [deletedItem] = data;
        setResults(deletedItem);
        setObjective('deleted');
      });
  };

  const handleClick = (id, objective) => {
    const currentStateList = [...data];
    let selectedItem = null;
    for (let i = 0; i < currentStateList.length; i++) {
      if (id === currentStateList[i].id) {
        selectedItem = currentStateList[i];
      }
    } if (objective === 'edit') {
      setObjective(objective);
      setItem(selectedItem);
    } else {
      setItem(selectedItem);
    }
  };

  useEffect(() => {
    const purpose = props.purpose;
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${props.token}`
      }
    };
    fetch(`/api/edit-${purpose}-items`, req)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setRetrieving(false);
      });
  }, []);

  if (data.error === 'an unexpected error occurred') {
    return (
        <>
          <Header header={'We are Sorry!'} />
          <Error />
        </>
    );
  }
  let emptyWarning = null;
  if (props.purpose === 'Meal') {
    emptyWarning = <div className='container'><div className='col-lg-11'><p className='text-center font-italic mt-4'> <a href="#meals">Add a {props.purpose}</a></p></div></div >;
  } else {
    emptyWarning = <div className='container'><div className='col-lg-11'><p className='text-center font-italic mt-4'> <a href="#exercises">Add a {props.purpose}</a></p></div></div >;
  }
  let visualizeData = [...data];
  visualizeData = visualizeData.map(healthItem => {
    return (
        <div key={healthItem.id} className="m-3 col-4 col-md-3 col-lg-2 rounded" style={{ border: '2px solid rgb(52,58,63)' }}>
          <span className='row d-flex justify-content-end'>
            <button onClick={() => { handleClick(healthItem.id); }} style={{ lineHeight: '.08' }} className='btn btn-outline-danger mr-1 mt-2 p-2' data-toggle="modal" data-target="#exampleModal">X</button>
          </span>
          <div className="row d-flex justify-content-center">
            <div className="d-flex justify-content-start">
              <div className="col-8">
                <button onClick={() => { handleClick(healthItem.id, 'edit'); }} className='btn btn-outline-primary'><i style={{ fontSize: '2.5rem' }}className={healthItem.icon}></i></button>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-2">
              <h5>{healthItem.content}</h5>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <h6>{healthItem.calories} Cal</h6>
            </div>
          </div>
        </div>
    );
  });
  if (isRetrieving) {
    return (
        <>
        <Header header={props.status}></Header>
        <Loading></Loading>
        </>
    );
  } else if (data.length === 0) {
    return (
    <>
      <Header header={`No ${props.purpose}s`} />
      {emptyWarning}
    </>
    );
  } else if (objective === '') {
    return (
          <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Delete this {props.purpose}?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button onClick={() => { handleDeletion(item); }} type="button" className="btn btn-danger" data-dismiss="modal" aria-label="Close">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <Header header={props.status}></Header>
            <div className='container'>
              <div className='row d-flex justify-content-center'>
                {visualizeData}
              </div>
            </div>
          </>
    );
  } else if (objective === 'edit') {
    return (
            <>
              <EditForm token={props.token} user={props.user} item={item} purpose={props.purpose} status={`Edit ${props.purpose}`}></EditForm>
            </>
    );
  } else if (objective === 'deleted') {
    return (
          <>
            <Header header={`${props.purpose} Deleted`} />
            <EditStats stats={results} purpose={props.purpose} />
          </>
    );
  }
}
