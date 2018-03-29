import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleResetChange = this.handleResetChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  handleResetChange(e) {
    this.setState({ input: '', results: [] });
  }

  componentDidMount() {
    axios.get('https://gist.githubusercontent.com/anonymous/1295788c7bff052a1e8a/raw/6e109604c7a7f3efe77c8048bb2fe2f3e1cdcb7b/gistfile1.json')
      .then(res => {
        const results = res.data.Reggae
        this.setState({ results });
      });
  }

  render() {
    var resultList = this.state.results;
    var inputStr = this.state.input.trim().toLowerCase();

    if (inputStr.length > 0) {
      resultList = resultList.filter(letter => {
        return letter.toLowerCase().match(inputStr);
      })
    }

    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This list renders 537 Reggae artists.</p>
          <p>Try typing text below to filter artists.</p>
        </div>


        <div className="panel panel-default text-center bg-warning">
          <div className="panel-heading">
            <h3 className="panel-title pt-3">React Search</h3>
          </div>
          <div className="panel-body">
            <form>
              <input className='mb-3 rounded mr-3' type="text" placeholder='Enter name here...' onChange={this.handleInputChange} />
              <br />
              <button className='btn btn-sm btn-success mb-3' onChange={this.handleResetChange}>Reset search</button>
            </form>
          </div>
          <div>
            <ul className='list-unstyled'>
              {resultList.map((result, index) =>
                <li key={index}>{result}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}



export default Search;
