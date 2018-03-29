import React, { Component } from 'react';
import { Button, Input, Slider, InputNumber, Row, Col, Table } from 'antd';
import $ from 'jquery';

import './Wiki.css';

const Search = Input.Search;

class Wiki extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 3,
      inputText: '',
      data: [],
      tableDisplay: 'none'
    };
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCancelChange = this.handleCancelChange.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)

  }

  handleInputChange(e) {
    this.setState({
      inputText: e.target.value
    });
  }

  handleCancelChange(e) {
    e.preventDefault();
    this.setState({
      count: 3,
      inputText: '',
      data: [],
      tableDisplay: 'none'
    });
  }

  handleCountChange(value) {
    this.setState({
      count: value,
    });
  }

  handleSearch(e) {
    if (this.state.inputText) {
      $.ajax({
        url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${this.state.inputText}&limit=50&format=json`,
        type: "GET",
        dataType: 'jsonp',
        success: res => {
          var data = [];
          for (var i = 0; i < 50; i++) {
            data[i] = {
              key: i,
              title: res[1][i],
              snippet: res[2][i],
              link: res[3][i],
            }
          }
          this.setState({input: '', data: data, tableDisplay: "block"});
        }
      });
    } else {
      alert('no input text')
    }

  }

  render() {
    const columns = [
      { title: 'Article Title', dataIndex: 'title', key: 'title', width: '10%'},
      { title: 'Snippet', dataIndex: 'snippet', key: 'snippet', width: '75%'},
      { title: 'Link',
        dataIndex: 'link',
        key: 'link',
        render: (link) => <a href={link} target='_blank' rel="noopener noreferrer">view article</a>
      },
    ];

    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a react wikipedia app built with Bootstrap and Ant Design design system including paginition and slider features.</p>
          <p>Try typing text in the search area and change article numbers to see how it works.</p>
        </div>
        <div className="panel panel-default text-center">
          <h1 className='display-4 my-5'>Wikipedia Viewer</h1>
          <h2>Search Wikipedia:</h2>
          <Search
            placeholder="input search text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            onSearch={this.handleSearch}
            enterButton
            style={{width:'500px'}}
          />
          <br />
          <br />
          <Button onClick={this.handleCancelChange}>Cancel search</Button>
          <br />
          <br />
          <Button><a href='https://en.wikipedia.org/wiki/Special:Random' target='_blank' rel="noopener noreferrer">Generate a random article</a></Button>
          <br />
          <br />
          <Row type="flex" justify="center" style={{width:'100%'}}>
            <Col span={12}>
              <Slider
                min={1}
                max={50}
                onChange={this.handleCountChange}
                value={this.state.count}
                disabled={(this.state.tableDisplay === 'none') ? true : false}/>
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={50}
                style={{ marginLeft: 16 }}
                value={this.state.count}
                onChange={this.handleCountChange}
                disabled={(this.state.tableDisplay === 'none') ? true : false}
              />
            </Col>
          </Row>

          <Table style={{display:this.state.tableDisplay,width:'100%'}} columns={columns} dataSource={this.state.data.slice(0, this.state.count)} scroll={{y: 500}}/>
        </div>
      </div>
    );
  }
}

export default Wiki;
