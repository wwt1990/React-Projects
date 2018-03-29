import React, { Component } from 'react';
import $ from 'jquery';


const clear = require('./images/clear.png');
const cloudy = require('./images/cloudy.png');
const haze = require('./images/haze.png');
const rain = require('./images/rain.png');
const snow = require('./images/snow.png');
const sunny = require('./images/sunny.png');
const thunderstorm = require('./images/thunderstorm.png');

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: '',
      temp: '',
      tempInK: '',
      unit: 'Kelvin',
      latitude: '',
      longitude: '',
      city: '',
      region: '',
      country: '',
    }
    this.handleKelvinClick = this.handleKelvinClick.bind(this);
    this.handleCelsiusClick = this.handleCelsiusClick.bind(this);
    this.handleFarenheitClick = this.handleFarenheitClick.bind(this);
  }

  handleKelvinClick(e) {
    e.preventDefault();
    this.setState({
      temp: this.state.tempInK,
      unit: 'Kelvin',
    });
  }

  handleCelsiusClick(e) {
    e.preventDefault();
    this.setState({
      temp: this.state.tempInK - 273.15,
      unit: 'Celsius',
    });
  }

  handleFarenheitClick(e) {
    e.preventDefault();
    this.setState({
      temp: this.state.tempInK * 9 / 5 - 459.67,
      unit: 'Farenheit',
    });
  }

  getLocation() {
    var that = this;
    $.getJSON('http://ip-api.com/json', function(data) {
      that.setState({
        latitude: data.lat,
        longitude: data.lon,
        city: data.city,
        region: data.region,
        country: data.country,
      });
      that.getWeather();
    });

  }

  getWeather() {
    var that = this;
    const lat = this.state.latitude;
    const lon = this.state.longitude;
    const apiKey = '8c97451e3e5f2637d2b77cfbdf286a4e';
    $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, function(data) {
      const weather = data.weather[0].main;
      const tempInK = data.main.temp;
      that.setState({
        weather: weather,
        tempInK: tempInK,
        temp: tempInK,
      });
    });
  }

  componentWillMount() {
    this.getLocation();
  }

  render() {
    const { weather, temp, unit, latitude, longitude, city, region, country } = this.state;
    const unitShow = unit === 'Kelvin' ? <span>&#8490;</span> : (unit === 'Celsius' ? <span>&#8451;</span> : <span>&#8457;</span>);

    const kelvinStyle = () => ({
      color: this.state.unit === 'Kelvin' ? '#f94e3f' : '#3f4040'
    });

    const celsiusStyle = () => ({
      color: this.state.unit === 'Celsius' ? '#f94e3f' : '#3f4040'
    });

    const farenheitStyle = () => ({
      color: this.state.unit === 'Farenheit' ? '#f94e3f' : '#3f4040'
    });

    var weatherIcon;
    if (weather.toLowerCase().includes('clear')) {
      weatherIcon = <img className='weatherIcon' src={clear} alt='clear icon' />
    } else if (weather.toLowerCase().includes('haze')) {
      weatherIcon = <img className='weatherIcon' src={haze} alt='haze icon' />
    } else if (weather.toLowerCase().includes('rain')) {
      weatherIcon = <img className='weatherIcon' src={rain} alt='rain icon' />
    } else if (weather.toLowerCase().includes('snow')) {
      weatherIcon = <img className='weatherIcon' src={snow} alt='snow icon' />
    } else if (weather.toLowerCase().includes('sun')) {
      weatherIcon = <img className='weatherIcon'src={sunny} alt='sun icon' />
    } else if (weather.toLowerCase().includes('thunderstorm')) {
      weatherIcon = <img className='weatherIcon' src={thunderstorm} alt='thunderstorm icon' />
    } else {
      weatherIcon = <img className='weatherIcon' src={cloudy} alt='cloudy icon' />
    }

    return (
      <div className='row'>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <h4 className="pt-3 text-light">Coordinates:</h4>
              <ul className='list-unstyled text-info'>
                <li>Latitude:&nbsp;&nbsp;{latitude}</li>
                <li>Longitude:&nbsp;&nbsp;{longitude}</li>
              </ul>
            </div>
            <div className='col'>
              <h4 className="pt-3 text-light">Location:</h4>
              <ul className='list-unstyled text-info'>
                <li>{city}, {region}, {country}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='col'>
          <h4 className="pt-3 text-light">Weather:</h4>
          {weatherIcon}
          <ul className='list-unstyled text-info'>
            <li>{weather}</li>
            <li>{parseFloat(temp).toFixed(2)} {unitShow}</li>
          </ul>
          <div>
            <button className='btn btn-light btn-sm m-2' style={kelvinStyle()} onClick={this.handleKelvinClick}>Kelvin</button>
            <button className='btn btn-light btn-sm m-2' style={celsiusStyle()} onClick={this.handleCelsiusClick}>Celsius</button>
            <button className='btn btn-light btn-sm m-2' style={farenheitStyle()} onClick={this.handleFarenheitClick}>Farenheit</button>
          </div>
        </div>
      </div>
    );
  }
}

class Weather extends Component {
  render() {
    return(
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>These are two simple api calls to return the geographic coordinates of current location
          and the weather condition given these coordinates.</p>
          <p>Besides, click the bottom buttons to see the temperature switch among different units.</p>
        </div>

        <div className="panel panel-default text-center" style={{background: '#07080a'}}>
          <div className="panel-heading">
            <h3 className="panel-title pt-3 text-danger">Current Weather Service</h3>
          </div>
          <div className="panel-body">
            <Location />
          </div>

        </div>
      </div>
    );
  }
}

export default Weather;
