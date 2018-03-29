import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(e) {
    var current = this.state.value;
    var currentLength = current.toString().length;
    var update;
    var input = e;
    const operator = ['+', '-', '*', '/'];

    if (currentLength === 0) {
      if (operator.indexOf(input) > -1) {
        current = '';
        update = '';
      } else {
        current = '';
        update = input;
      }
    }

    else if ((currentLength > 0) && (currentLength < 20)) {
      current = this.state.value.toString().slice(0);
      if (operator.indexOf(input) > -1) {
        if (operator.indexOf(current.slice(-1)) > -1) {
          update = current.toString();
        } else {
          update = current.toString() + input.toString();
        }
      } else {
        update = current.toString() + input.toString();
      }
    }

    else if (currentLength === 20) {
      input = '';
      update = this.state.value.toString().slice(0);
    }
    this.setState({
      value: update
    });
  }


  handleEnter() {
    var current = this.state.value;
    var expression = current.toString().slice(0);
    var update;
    try {
      update = eval(expression);
      if (update === undefined) {
        update = ''
      }
      this.setState({
        value: update
      })
    } catch (err) {
      if (err instanceof SyntaxError) {
        update = current;
      } else if (err instanceof TypeError) {
        update = current;
      }
    }


  }

  handleClear() {
    this.setState({
      value: ''
    })
  }

  handleDelete() {
    var current = this.state.value;
    var update;
    if (current === undefined || current === '') {
      update = '';
    } else {
      update = current.toString().slice(0, current.toString().length-1)
    }
    this.setState({
      value: update
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a react calculator app built with Bootstrap and Ant Design design system.</p>
          <p>Try it out.</p>
        </div>
        <div className="panel panel-default text-center">
          <h1 className='display-4 my-5'>React Calculator</h1>
          <div className='calculatorBg'>
            <input className='calculatorValue' type='text' value={this.state.value} />
            <br />
            <CalcPad input={this.handleClick} enter={this.handleEnter} clear={this.handleClear} detele={this.handleDelete} />
          </div>
        </div>
      </div>
    );
  }
}


const CalcPad = props => {
  return (
    <div>
      <div>
        <Row style={{width:'400px',margin:'0 auto'}} >
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(this, "7")} >7</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "8")} >8</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "9")} >9</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "/")} >/</Button></Col>
        </Row>
        <Row style={{width:'400px',margin:'0 auto'}} >
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "4")} >4</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "5")} >5</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "6")} >6</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "*")} >*</Button></Col>
        </Row>
        <Row style={{width:'400px',margin:'0 auto'}} >
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "1")} >1</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "2")} >2</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "3")} >3</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "+")} >+</Button></Col>
        </Row>
        <Row style={{width:'400px',margin:'0 auto'}} >
          <Col span={6}><Button className='calculatorUnit' onClick={props.detele} >del</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "0")} >0</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.clear} >CE</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, "-")} >-</Button></Col>
        </Row>
        <Row style={{width:'400px',margin:'0 auto'}} >
          <Col span={18}><Button className='calculatorEnter' onClick={props.enter}>Enter</Button></Col>
          <Col span={6}><Button className='calculatorUnit' onClick={props.input.bind(null, ".")} >&middot;</Button></Col>
       </Row>
      </div>
    </div>
  )
};

export default Calculator