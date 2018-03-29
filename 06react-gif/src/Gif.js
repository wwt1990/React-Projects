import React, { Component } from 'react';
import axios from 'axios';
import lodash from 'lodash';


class Buttons extends Component {
  render() {
    return(
      <div className='text-center'>
        <button className='btn btn-info my-3' onClick={this.props.callGiphy}>Load / Reload Trending GIFs</button>
        <br />
        <button className='btn btn-info my-3' onClick={this.props.selectOne}>Select One at Random</button>
        <br />
        <button className='btn btn-info my-3' onClick={this.props.randomize}>Randomize Order</button>
        <br />
        <button className='btn btn-info my-3' onClick={this.props.reverse}>Reverse Order</button>
        <br />
        <button className='btn btn-info my-3' onClick={this.props.clearAll}>Clear All</button>
        <br />
      </div>
    );
  }
}

class ImageRender extends Component {
  render() {
    var imgStyle = {
      borderRadius: '5px',
    }
    var data = this.props.data;
    var images = data.map((item, index) => {
        return (
          <div key={index}>
            <img src={item} alt='Giphy' style={imgStyle} />
          </div>
        );
      });

    return(
      <div>
        {images}
      </div>
    );
  }
}


class ButtonLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      copy: [],
    };
    this.callGiphy = this.callGiphy.bind(this);
    this.selectOne = this.selectOne.bind(this);
    this.randomize = this.randomize.bind(this);
    this.reverse = this.reverse.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }


  callGiphy(e) {
    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then(res => {
        const results = res.data.data;
        var array = [];
        for (var i = 0; i < results.length; i++) {
          array[i] = results[i].images.fixed_height.url;
        }
        this.setState({
          data: array,
          copy: array,
        });
      })
  }

  selectOne(e) {
    var stateCopy = this.state.copy.slice();
    var n = stateCopy.length;
    var random = [stateCopy[Math.round(Math.random() * (n - 1))]];
    this.setState({ data: random })
  }

  randomize(e) {
    var stateCopy = this.state.data.slice();
    var randomArr = lodash.shuffle(stateCopy)
    this.setState({ data: randomArr })
  }

  reverse(e) {
    var stateCopy = this.state.data.slice();
    var reverseArr = lodash.reverse(stateCopy)
    this.setState({ data: reverseArr })
  }

  clearAll(e) {
    this.setState({ data: [] })
  }

  render() {
    return(
      <div>
        <Buttons callGiphy={this.callGiphy}
                 selectOne={this.selectOne}
                 randomize={this.randomize}
                 reverse={this.reverse}
                 clearAll={this.clearAll}
        />
        <ImageRender data={this.state.data} />
      </div>
    );
  }
}

class Root extends Component {
  render() {
    return (
      <div>
        <h3 className='my-3 pt-3' style={{color: "#13293D"}}>Trending GIFs courtesy of the <a href='https://giphy.com/' target='_blank' rel="noopener noreferrer">Giphy API</a></h3>
      </div>
    );
  }
}

class Gif extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This react app returns GIPHY's trending endpoint which provides a
          collection of up-to-the-minute memes, tropes, and touchstones of pop culture,
          editorialized by real humans. Everyone will have instant access to all of it. </p>
          <p>The data returned mirrors the GIFs showcased on the GIPHY homepage. And it
          returns 25 results by default.</p>
        </div>
        <div className='text-center' style={{background: 'linear-gradient(red, yellow)'}}>
          <Root />
          <ButtonLogic />
        </div>
      </div>
    );
  }
}

export default Gif;
