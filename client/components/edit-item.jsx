import React from 'react';
import Header from './header';
import Loading from './loading';
export default class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrieving: true,
      data: ''
    };
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
        <div key={healthItem.id}className="col-4 col-md-3 col-lg-2" style={{ border: '1px solid black' }}>
          <span className='row d-flex justify-content-end'>
            <button style={{ lineHeight: '1.0' }} className='btn btn-outline-danger'>X</button>
          </span>
          <div className="row d-flex justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="col-8">
                <button className='btn btn-outline-primary'><img src={healthItem.icon} alt="icon" style={{ width: '100%' }} /></button>
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
          <div className=''>
            {visualizeData}
          </div>
        </>
      );
    }
  }

}
