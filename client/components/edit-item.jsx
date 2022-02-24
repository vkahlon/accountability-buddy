import React from 'react';
import Header from './header';
import Loading from './loading';
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
    const newState = { objective: objective, id: id };
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
    }
  }

}
