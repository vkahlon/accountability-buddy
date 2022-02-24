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
        <div key={healthItem.id}className="container">
          <div className="row d-flex justify-content-center mt-2">
            <div className="d-flex justify-content-center">
              <img src={healthItem.icon} alt="icon" style={{ width: '33%' }} />
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-2">
            <div className="col-8 d-flex justify-content-center">
              <h4>{healthItem.content}</h4>
            </div>
            <div className="col-8 d-flex justify-content-center">
              <h5>{healthItem.calories} Cal</h5>
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
          {visualizeData}
        </>
      );
    }
  }

}
