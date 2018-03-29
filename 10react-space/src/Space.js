import React, { Component } from 'react';
import $ from "jquery";


class Humans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPeople: '',
      people: [],

    };
  }
  componentWillMount() {
    // Using jquery:
    var that = this;
    $.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
      var number = data['number'];
      var people = [];
      var i
      for (i = 0; i < number; i++) {
        people.push(data['people'][i].name)
      }
      that.setState({ numberOfPeople: number, people: people})
    });
  }

  render() {
    const people = this.state.people
    const peopleList= people.map((p, index) => {
      return (<li key={index} className='list-group-item mx-auto' style={{width:'200px'}}>{p}</li>);
    })
    return (
      <div className='container'>
        <ul className="list-group">
          {peopleList}
        </ul>
      </div>
    );
  }
}

class ISSData extends Component {
  constructor(props){
    super(props);
    this.state= {
      latitude: '',
      longitude: '',
      time: '',
      table: [],
      count: 0,
    };
  }

  tick() {
    var newCount = this.state.count;
    var newTable = this.state.table;
    var that = this;
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
      var position = data['iss_position'];
      var latitude = position['latitude'];
      var longitude = position['longitude'];
      var timestamp = data['timestamp'];

      var date = new Date(timestamp*1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      newCount += 1;
      newTable.push({count: newCount, latitude: latitude, longitude: longitude, time: formattedTime, })
      that.setState({ latitude: latitude, longitude: longitude, time: formattedTime, count: newCount, table: newTable, })
    });
  }

  componentWillMount() {
    this.tick();
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }
  render() {
    const { latitude, longitude, time, table } = this.state;

    var newTable = table;
    var tableList;
    if (newTable.length !== 0) {
    tableList = newTable.map((row, index) => {
        return (
          <tr key={index} className='text-primary'>
            <td>{row.count}</td>
            <td>{row.latitude}</td>
            <td>{row.longitude}</td>
            <td>{row.time}</td>
          </tr>
        );
      })
    }

    return (
      <div className='container'>
        <table className='table border mx-auto' style={{width:'300px'}}>
          <tbody>
            <tr>
              <th className='bg-info text-light'>Current Latitude</th>
              <td className='text-primary'>{latitude}</td>
            </tr>
            <tr>
              <th className='bg-info text-light'>Current Longitude</th>
              <td className='text-primary'>{longitude}</td>
            </tr>
            <tr>
              <th className='bg-info text-light'>Current Time</th>
              <td className='text-primary'>{time}</td>
            </tr>
          </tbody>
        </table>
        <h4 className='text-warning mt-5'>Historical Data on the ISS:</h4>
        <table className='border mx-auto' style={{width:'80%'}}>
          <tbody>
            <tr className='bg-info text-light'>
              <th>Count</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Time</th>
            </tr>
            {tableList}
          </tbody>
        </table>
      </div>
    );
  }
}


class Space extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a simple api to return the current location of the ISS.
          It returns the current latitude and longitude of the space station
          with a unix timestamp for the time the location was valid.
          In this demo, the unix timestamp has been transformed to regular time format.</p>
          <p>This API takes no inputs.</p>
        </div>
        <div className="panel panel-default text-center" style={{background: 'url(http://wallpapercave.com/wp/8cEpZrx.jpg) no-repeat center center fixed'}}>
          <div className="panel-heading">
            <h3 className="panel-title pt-3 text-primary">Current Information From Space</h3>
            <h4 className='text-warning mt-5'>At this moment there are 6 humans in space. They are:</h4>
          </div>
          <div className="panel-body">
            <Humans />
            <h4 className='text-warning mt-5'>Current Data on the ISS:</h4>
            <ISSData />
            <p className='text-light mt-5'>Data provided courtesy of <a className='text-warning' href='http://open-notify.org/Open-Notify-API/ISS-Location-Now/' target='_blank' rel="noopener noreferrer">Open Notify</a> and refreshed every 5 seconds</p>
          </div>
        </div>



      </div>
    );
  }
}

export default Space;
