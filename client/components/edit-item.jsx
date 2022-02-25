import React from 'react';
import Header from './header';
import Loading from './loading';
import EditForm from './edit-form';
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
  }

  handleClick(id, objective) {
    const currentStateList = [...this.state.data];
    let selectedItem = null;
    for (let i = 0; i < currentStateList.length; i++) {
      if (id === currentStateList[i].id) {
        selectedItem = currentStateList[i];
      }
    }
    const newState = { item: selectedItem, objective: objective, id: id };
    this.setState(newState);
  }

  componentDidMount() {
    const purpose = this.props.purpose;
    fetch(`/api/edit-${purpose}-items`)
      .then(res => res.json())
      .then(result => {
        const newState = { retrieving: false, data: result };
        this.setState(newState);
      });
  }

  render() {
    let visualizeData = [...this.state.data];
    visualizeData = visualizeData.map(healthItem => {
      return (
        <div key={healthItem.id} className="m-3 col-4 col-md-3 col-lg-2 rounded" style={{ border: '2px solid rgb(52,58,63)' }}>
          <span className='row d-flex justify-content-end'>
            <button onClick={() => { this.handleClick(healthItem.id, 'delete'); }} style={{ lineHeight: '.08' }} className='btn btn-outline-danger mr-1 mt-1 p-2'>X</button>
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
    } else {
      if (this.state.objective === '') {
        return (
          <>
            <Header header={this.props.status}></Header>
            <div className='container'>
              <div className='row d-flex justify-content-center'>
                {visualizeData}
              </div>
            </div>
          </>
        );
      } else {
        if (this.state.objective === 'edit') {
          return (
            <>
              <EditForm item={this.state.item} purpose={this.props.purpose} status={`Edit ${this.props.purpose}`}></EditForm>
            </>
          );
        } else if (this.state.objective === 'delete') {
          return (
            <>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
              </button>
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Delete this {this.props.purpose}?</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      }
    }
  }
}
