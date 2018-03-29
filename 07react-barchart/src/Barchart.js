import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Media from "react-media";


const data = [
  {percentage: 28, occupation: "Full-Stack Web Developer"},
  {percentage: 12.2, occupation: "Back-End Web Developer"},
  {percentage: 11.4, occupation: "Student"},
  {percentage: 8.4, occupation: "Mobile Developer (Android, iOS, WP, and MultiPlatform)"},
  {percentage: 6.9, occupation: "Desktop Develop"},
  {percentage: 5.8, occupation: "Front-End Web Developer"},
  {percentage: 5.2, occupation: "Other"},
  {percentage: 3.0, occupation: "Enterprise Level Services Developer"},
  {percentage: 2.6, occupation: "Embedded Application Developer"},
  {percentage: 2.2, occupation: "DevOps"},
  {percentage: 1.9, occupation: "Developer with a Statistics or Mathematics Background"},
  {percentage: 1.8, occupation: "Executive (VP of Engineering, CTO, CIO, etc.)"},
  {percentage: 1.6, occupation: "Data Scientist"},
  {percentage: 1.5, occupation: "System Administrator"},
  {percentage: 1.4, occupation: "Engineering Manager"},
  {percentage: 1.2, occupation: "Analyst"},
  {percentage: 0.1, occupation: "Business Intelligence or Data WWarehousing Expert"},
  {percentage: 0.1, occupation: "Maching Learning Developer"},
];

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reversed: false,
    }
    this.reverse = this.reverse.bind(this);
  }

  reverse(e) {
    this.setState({
      reversed: !this.state.reversed,
    });
  }

  render() {
    return (
      <div>
        <div className='chart'>

        <Media query="(max-width: 1000px)">
          {matches =>
            matches ? (
              <BarChart className='mx-auto'
                    style={{fontSize:'12px',background:'#f7caf2'}}
                    width={600}
                    height={400}
                    data={data}
                    layout='vertical'
                    barCategoryGap={`20%`}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis type="number" domain={[0, 36]}/>
            <YAxis type="category" dataKey="occupation" width={180} reversed={this.state.reversed}/>
            <CartesianGrid horizontal={false} strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey='percentage' fill='#ed1094' label />
          </BarChart>
            ) : (
              <BarChart className='mx-auto'
                    style={{fontSize:'15px',background:'#f7caf2'}}
                    width={900}
                    height={600}
                    data={data}
                    layout='vertical'
                    barCategoryGap={`20%`}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis type="number" domain={[0, 36]}/>
            <YAxis type="category" dataKey="occupation" width={250} reversed={this.state.reversed}/>
            <CartesianGrid horizontal={false} strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey='percentage' fill='#ed1094' label />
          </BarChart>
            )
          }
        </Media>


        </div>
        <button className='btn btn-danger my-3' onClick={this.reverse}>Click to reverse the data order</button>
      </div>
    );
  }
}


class Barchart extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This bar chart is a presentation of StackOverflow 2016 developer survey results
            for occupation and is drawn by using 'recharts' library.</p>
          <p>Click the button to reverse the data order.</p>
        </div>

        <div className="panel panel-default text-center">
          <div className="panel-heading">
            <h3 className="panel-title pt-3">2016 Developer Survey for Occupation</h3>
          </div>
          <Chart />
          <a className='link' href='http://stackoverflow.com/research/developer-survey-2016' target='_blank' rel="noopener noreferrer">- view the full survery results -</a>
        </div>
      </div>
    );
  }
}

export default Barchart;
