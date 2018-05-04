import React, { Component } from 'react';
import './Autocomplete.css';

const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myInput: '',
      myResult: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    var inputValue = e.target.value;
    var result = countries.filter(country => country.toLowerCase().startsWith(inputValue));
    this.setState({
      myInput: inputValue,
      myResult: result
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      myInput: '',
      myResult: []
    })
  }

  handleClick(e) {
    e.preventDefault();
    const inputValue = e.target.innerHTML.replace(/<.?strong>/ig, '');
    this.setState({
      myInput: inputValue,
      myResult: []
    })
  }

  render() {
    const {myInput, myResult} = this.state;
    const resultList = myResult.map((res, index) => {
      return <li key={index}><strong>{res.substr(0, myInput.length)}</strong>{res.substr(myInput.length)}</li>;
    });
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a pure react autocomplete app.</p>
          <p>Try typing text in the input area see how it works.</p>
        </div>
        <div className="panel panel-default text-center">
          <h1 className='display-4 my-5'>Autocomplete</h1>
          <form autoComplete='off'>
            <h2>Start typing:</h2>
              <div className='autocomplete'>
                <input
                  type='text'
                  placeholder='search country name...'
                  value={this.state.myInput}
                  onChange={this.handleChange}/>
                <ul onClick={this.handleClick}>
                  {resultList}
                </ul>
              </div>
              <input type='submit' onClick={this.handleSubmit}/>
          </form>
        </div>
      </div>
    );
  }
}

export default Autocomplete;
