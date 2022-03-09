import React from 'react';
import Header from './header';
import Loading from './loading';
import EditForm from './edit-form';
import EditStats from './edit-stats';
export default class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrieving: true,
      data: '',
      objective: '',
      id: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  handleDeletion(item) {
    const action = this.props.purpose;
    const id = item.id;
    event.preventDefault();
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${this.props.token}`
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/delete-${action}/${id}`, req)
      .then(res => res.json())
      .then(data => {
        const [deletedItem] = data;
        this.setState({ results: deletedItem, objective: 'deleted' });
      });
  }

  handleClick(id, objective) {
    const currentStateList = [...this.state.data];
    let selectedItem = null;
    let newState = null;
    for (let i = 0; i < currentStateList.length; i++) {
      if (id === currentStateList[i].id) {
        selectedItem = currentStateList[i];
      }
    } if (objective === 'edit') {
      newState = { item: selectedItem, objective: objective, id: id };
    } else {
      newState = { item: selectedItem, id: id };
    }
    this.setState(newState);
  }

  componentDidMount() {
    const purpose = this.props.purpose;
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${this.props.token}`
      }
    };
    fetch(`/api/edit-${purpose}-items`, req)
      .then(res => res.json())
      .then(result => {
        const newState = { retrieving: false, data: result };
        this.setState(newState);
      });
  }

  render() {
    let emptyWarning = null;
    if (this.props.purpose === 'Meal') {
      emptyWarning = <div className='container'><div className='col-lg-11'><p className='text-center font-italic mt-4'> <a href="#meals">Add a {this.props.purpose}</a></p></div></div >;
    } else {
      emptyWarning = <div className='container'><div className='col-lg-11'><p className='text-center font-italic mt-4'> <a href="#exercises">Add a {this.props.purpose}</a></p></div></div >;
    }
    let visualizeData = [...this.state.data];
    visualizeData = visualizeData.map(healthItem => {
      return (
        <div key={healthItem.id} className="m-3 col-4 col-md-3 col-lg-2 rounded" style={{ border: '2px solid rgb(52,58,63)' }}>
          <span className='row d-flex justify-content-end'>
            <button onClick={() => { this.handleClick(healthItem.id); }} style={{ lineHeight: '.08' }} className='btn btn-outline-danger mr-1 mt-2 p-2' data-toggle="modal" data-target="#exampleModal">X</button>
          </span>
          <div className="row d-flex justify-content-center">
            <div className="d-flex justify-content-start">
              <div className="col-8">
                <button onClick={() => { this.handleClick(healthItem.id, 'edit'); }} className='btn btn-outline-primary'><i style={{ fontSize: '40px' }}className={healthItem.icon}></i></button>
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
    if (this.state.retrieving) {
      return (
        <>
        <Header header={this.props.status}></Header>
        <Loading></Loading>
        </>
      );
    } else if (this.state.data.length === 0) {
      return (
    <>
      <Header header={`No ${this.props.purpose}s`} />
      {emptyWarning}
    </>
      );
    } else if (this.state.objective === '') {
      return (
          <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Delete this {this.props.purpose}?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button onClick={() => { this.handleDeletion(this.state.item); }} type="button" className="btn btn-danger" data-dismiss="modal" aria-label="Close">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <Header header={this.props.status}></Header>
            <div className='container'>
              <div className='row d-flex justify-content-center'>
                {visualizeData}
              </div>
            </div>
          </>
      );
    } else if (this.state.objective === 'edit') {
      return (
            <>
              <EditForm token={this.props.token} user={this.props.user} item={this.state.item} purpose={this.props.purpose} status={`Edit ${this.props.purpose}`}></EditForm>
            </>
      );
    } else if (this.state.objective === 'deleted') {
      return (
          <>
            <Header header={`${this.props.purpose} Deleted`} />
            <EditStats stats={this.state.results} purpose={this.props.purpose} />
          </>
      );
    }
  }
}
