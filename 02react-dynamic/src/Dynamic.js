import React, { Component } from 'react';
import Media from "react-media";

import './Dynamic.css';

class RandomRgb extends Component {
  render() {
    var array = new Array(parseFloat(this.props.count));
    for (var i = 0; i < array.length; i++) {
      array[i] = i;
    };

    var randColor = function randColor() {
      return Math.round(Math.random() * 255);
    };
    var randRgb = function randRgb() {
      return { backgroundColor: 'rgb(' + randColor() + ',' + randColor() + ',' + randColor() + ')' };
    };

    var divs = array.map((val, index) => {
      return (
        <Media query="(max-width: 768px)">
          {matches =>
            matches ? (
              <div className="singleDivSm" style={randRgb()} key={index}></div>
            ) : (
              <div className="singleDiv" style={randRgb()} key={index}></div>
            )
          }
        </Media>





      );
    })

    return (
      <div className='divContainer'>
        {divs}
      </div>
    );
  }
}

class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      substract: false,
    };
    this.autoPlay = this.autoPlay.bind(this);
  }

  autoPlay() {
    setInterval(() => {
      var count = this.state.count;
      var newCount;

      if (count === 50) {
        this.setState({
          substract: true
        });
      } else if (count === 0) {
        this.setState({
          substract: false
        });
      }

      if (this.state.substract) {
        newCount = count - 1;
      } else {
        newCount = count + 1;
      }

      this.setState({
        count: newCount
      })
    }, 60);
  }

  componentDidMount() {
    this.autoPlay();
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>Dynamic "div" generation</p>
        </div>
        <RandomRgb count={this.state.count} />
      </div>
    );
  }
}

export default Dynamic;
