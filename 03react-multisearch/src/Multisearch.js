import React, { Component } from 'react';
import axios from 'axios';
import Media from "react-media";


class RenderList extends Component {
  render() {
    var data = this.props.data;
    var countrySearch = this.props.countrySearch.trim().toLowerCase();
    var capitalSearch = this.props.capitalSearch.trim().toLowerCase();
    var regionSearch = this.props.regionSearch.trim().toLowerCase();
    var subregionSearch = this.props.subregionSearch.trim().toLowerCase();

    if (countrySearch.length > 0) {
      data = data.filter(function (item) {
        return item.country.toLowerCase().match(countrySearch);
      });
    };

    if (capitalSearch.length > 0) {
      data = data.filter(function (item) {
        return item.capital.toLowerCase().match(capitalSearch);
      });
    };

    if (regionSearch.length > 0) {
      data = data.filter(function (item) {
        return item.region.toLowerCase().match(regionSearch);
      });
    };

    if (subregionSearch.length > 0) {
      data = data.filter(function (item) {
        return item.subregion.toLowerCase().match(subregionSearch);
      });
    };
    var listSmall = data.map((entry, index) => {
      return (
        <tr key={index}>
          <td>{entry.country}</td>
          <td>{entry.capital}</td>
          <td>{entry.region}</td>
          <td>{entry.subregion}</td>
        </tr>
      );
    });

    var list = data.map((entry, index) => {
      return (
        <tr key={index}>
          <td>{entry.country}</td>
          <td>{entry.capital}</td>
          <td>{entry.region}</td>
          <td>{entry.subregion}</td>
          <td>{entry.latitude}</td>
          <td>{entry.longitude}</td>
        </tr>
      );
    });

    return(
      <div className='container'>
        <Media query="(max-width: 768px)">
            {matches =>
              matches ? (
                <table className='table table-hover small border'>
                  <tbody>
                    <tr >
                      <th>Country</th>
                      <th>Capital</th>
                      <th>Region</th>
                      <th>Subregion</th>
                    </tr>
                    {listSmall}
                  </tbody>
                </table>
              ) : (
                <table className='table table-hover small border'>
                  <tbody>
                    <tr>
                      <th>Country</th>
                      <th>Capital</th>
                      <th>Region</th>
                      <th>Subregion</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                    {list}
                  </tbody>
                </table>
              )
            }
          </Media>
      </div>
    );
  }
}

class MultiSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      countrySearch: '',
      capitalSearch: '',
      regionSearch: '',
      subregionSearch: '',
    };
    this.handleCountrySearch = this.handleCountrySearch.bind(this);
    this.handleCapitalSearch = this.handleCapitalSearch.bind(this);
    this.handleRegionSearch = this.handleRegionSearch.bind(this);
    this.handleSubregionSearch = this.handleSubregionSearch.bind(this);
  }

  handleCountrySearch(event) {
    this.setState({ countrySearch: event.target.value });
  }
  handleCapitalSearch(event) {
    this.setState({ capitalSearch: event.target.value });
  }
  handleRegionSearch(event) {
    this.setState({ regionSearch: event.target.value });
  }
  handleSubregionSearch(event) {
    this.setState({ subregionSearch: event.target.value });
  }
  handleResetChange(event) {
    this.setState({ countrySearch: '', capitalSearch: '', regionSearch: '', subregionSearch: '' });
  }

  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
      .then(res => {
        const results = res.data

        var array = [];

        for (var i = 0; i < results.length; i++) {

          var entry = {};

          entry.country = results[i].name.official;
          entry.capital = results[i].capital.length === 0 ? '' : results[i].capital[0]
          entry.region = results[i].region;
          entry.subregion = results[i].subregion;
          entry.latitude = results[i].latlng[0].toFixed(2);
          entry.longitude = results[i].latlng[1].toFixed(2);
          array[i] = entry;
        }
        this.setState({ data: array });
      });
  }

  render() {
    return(
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This table represents 250 countries in different regions.</p>
          <p>Type text to filter by countries, capitals, regions and subregions.</p>
        </div>

        <div className="panel panel-default text-center">
          <div className="panel-heading">
            <h3 className="panel-title pt-3">React Multisearch</h3>
          </div>

          <div className="panel-body">
            <form>
              <input className='rounded' type='text' onChange={this.handleCountrySearch} placeholder='filter by country' /><br />
              <input className='rounded' type='text' onChange={this.handleCapitalSearch} placeholder='filter by capital' /><br />
              <input className='rounded' type='text' onChange={this.handleRegionSearch} placeholder='filter by region' /><br />
              <input className='rounded' type='text' onChange={this.handleSubregionSearch} placeholder='filter by subregion' /><br />
              <button className='btn btn-sm btn-success my-3' onChange={this.handleResetChange}>Reset search</button>
            </form>
          </div>

          <div>
            <RenderList
            data={this.state.data}
            countrySearch={this.state.countrySearch}
            capitalSearch={this.state.capitalSearch}
            regionSearch={this.state.regionSearch}
            subregionSearch={this.state.subregionSearch} />
          </div>
        </div>

      </div>
    );
  }
}

export default MultiSearch;
