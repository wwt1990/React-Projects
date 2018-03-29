import React, { Component } from 'react';
import $ from 'jquery';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
    }
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.tweetRandomQuote = this.tweetRandomQuote.bind(this);

    this.handleGetClick = this.handleGetClick.bind(this);
    this.handleTweetClick = this.handleTweetClick.bind(this);
  }

  componentWillMount() {
    this.getRandomQuote();
  }

  getRandomQuote() {
    var that = this;
    $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?', function(data) {
      const quote = data.quoteText;
      const author = data.quoteAuthor;
      that.setState({ quote: quote, author: author })
    });
  }


  tweetRandomQuote() {
    var tweet;
    tweet = this.state.author.length === 0
      ? this.state.quote
      : this.state.quote + " - " + this.state.author;

    var left = (window.screen.width - 800) / 2;
    window.open('http://twitter.com/home?status=' + tweet, '', 'menubar = no, toolbar = no, resizable = yes, scrollbars = yes, height = 250, width = 800, left = ' + left + ', top = 150');
  }

  handleGetClick(e) {
    e.preventDefault();
    this.getRandomQuote();
  }

  handleTweetClick(e) {
    e.preventDefault();
    this.tweetRandomQuote();
  }

  render() {
    const { quote, author } = this.state;
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a simple api to return a random expression. It returns the quote text and its author.</p>
          <p>This API takes no inputs.</p>
          <p>Click buttons to see how it works.</p>
        </div>
        <div className="panel panel-default text-center bg-info">
          <div className="panel-heading">
            <h3 className="panel-title pt-3 text-dark">Quote Machine</h3>
          </div>
          <div className="panel-body">
            <button className='btn btn-success mt-3 mb-1' onClick={this.handleGetClick}>show me a random quote</button>
            <br/>
            <button className='btn btn-success mb-3 mt-1' onClick={this.handleTweetClick}>tweet random quote</button>
            <blockquote className="blockquote rounded bg-dark mx-auto p-3" style={{width:'30%',minWidth:'280px'}}>
              <p className="mb-0 text-warning">{quote}</p>
              <footer className="blockquote-footer">- {author}</footer>
            </blockquote>
            <a className='text-dark lead' href='http://forismatic.com/en/' target='_blank' rel='noopener noreferrer'>Explore the most inspiring expressions of mankind</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Quote;
