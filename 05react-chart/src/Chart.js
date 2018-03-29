import React, { Component } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, Brush } from 'recharts';
import Media from "react-media";

class SmallChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      array: [],
      slider: 10,
    };
  }

  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(res => {
        const results = res.data.data;


        var n = results.length;
        var mapData = [];
        for (var i = 0; i < n; i++)
          mapData.push({});

        const keyDate = 'date';
        const keyVal = 'value';

        for (var j = 0; j < n; j++) {
          mapData[j][keyDate] = results[j][0];
          mapData[j][keyVal] = results[j][1];

        }

        this.setState({
          data: mapData,
          array: mapData,
        });
      })
  }

  render() {
    return (
      <div className='container-fluid'>

        <Media query="(max-width: 1000px)">
          {matches =>
            matches ? (
              <AreaChart className='mx-auto' style={{background: '#cce4f1'}} width={600} height={400} data={this.state.data}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis dataKey="value"/>
                <Tooltip/>
                <Legend />
                <Area type="monotone" dataKey="value" fill="#00a4fc" activeDot={{r: 8}}/>
                <Brush dataKey='date' height={30} stroke="#00a4fc"/>
              </AreaChart>
            ) : (
              <AreaChart className='mx-auto' style={{background: '#cce4f1'}} width={900} height={600} data={this.state.data}
                   margin={{top: 10, right: 30, left: 20, bottom: 10}}>
                <XAxis dataKey="date"/>
                <YAxis dataKey="value"/>
                <Tooltip/>
                <Legend />
                <Area type="monotone" dataKey="value" fill="#00a4fc" activeDot={{r: 8}}/>
                <Brush dataKey='date' height={30} stroke="#00a4fc"/>
              </AreaChart>
            )
          }
        </Media>


      </div>
    );
  }
}

class Chart extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This area chart is a presentation of US GDP Economic Data from 1947 to 2015 and
          is drawn by using 'recharts' library.</p>
          <p>Move the range bar to zoom in.</p>
        </div>

        <div className="panel panel-default text-center">
          <div className="panel-heading">
            <h3 className="panel-title pt-3">US GDP Economic Data</h3>
          </div>
          <SmallChart />
        </div>
      </div>
    );
  }
}

export default Chart;
