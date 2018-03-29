import React, { Component } from 'react';


var initialTodos = [
  "Finish Redux Tutorials",
  "Learn more about Relay",
  "Build 5 more React apps",
  "Review React Component Lifecycle",
  "Obtain Data Visualization Certificate",
  "Review Algorithms",
  "Tweet Progress",
  "Get a coffee!",
  "Browse Google Fonts",
  "Learn more about React Native"
];

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: initialTodos,
      addTodoInput: '',
      search: '',
    }
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearTodos = this.clearTodos.bind(this);
    this.resetTodos = this.resetTodos.bind(this);
  }

  handleAddInput(e) {
    this.setState({ addTodoInput: e.target.value });
  }

  handleAddSubmit(e) {
    e.preventDefault();
    if (this.state.addTodoInput.length > 0) {
      this.state.todos.unshift(this.state.addTodoInput);
      this.setState( { addTodoInput: '' });
    }
  }


  handleSearch(e) {
    this.setState({ search: e.target.value });
  }

  handleDelete(index, e) {
    var cloneState = this.state.todos.slice();
    cloneState.splice(index, 1);
    this.setState({ todos: cloneState });
  }

  clearTodos() {
    this.setState({ todos: [] });
  }

  resetTodos() {
    this.setState({
      todos: initialTodos,
      addTodoInput: '',
      search: '',
    });
  }

  render() {
    var todoList = this.state.todos;
    var search = this.state.search.trim().toLowerCase();

    if (search.length > 0) {
      todoList = todoList.filter((todo) => {
        return todo.trim().toLowerCase().match(search)
      });
    }

    const table = todoList.map((todo, index) => {
      return (
        <tr key={index}>
          <td className='text-right'>{index + 1}.&nbsp;&nbsp;</td>
          <td className='text-left'>{todo}</td>
          <td><button className='btn mx-auto' style={{background:'#f9d423'}} onClick={this.handleDelete}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='container-fluid' style={{background: '#ff4e50'}}>
        <form onSubmit={this.handleAddSubmit}>
          <input className='rounded my-3'
                 style={{background: '#cbebf2'}}
                 type="text"
                 placeholder='Create todo...'
                 onChange={this.handleAddInput}
                 value={this.state.addTodoInput}/>
          <br/>
          <button className='btn mb-5' style={{background: 'skyblue'}}>Confirm Add</button>
        </form>
        <input className='rounded mb-3'
               style={{background: '#cbebf2'}}
               type="text"
               placeholder='Search todo...'
               onChange={this.handleSearch}
               value={this.state.search}/>
        <table className='mx-auto'>
          <tbody>
            <tr className='text-center'>
              <th>#</th>
              <th>Task</th>
              <th>Operation</th>
            </tr>
            {table}
          </tbody>
        </table>
        <button className='btn mr-3 my-3' style={{background: '#f9d423'}} onClick={this.clearTodos}>Clear Todo List</button>
        <button className='btn' style={{background: '#f9d423'}} onClick={this.resetTodos}>Reset Todo List</button>
      </div>
    );
  }
}

class Todo extends Component {
  render() {
    return(
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a react todo-list app.</p>
        </div>
        <div className="panel panel-default text-center">
          <div className='rounded pt-3 pb-2' style={{background: '#f9d423'}}>
            <header className='pb-2' style={{fontSize:'2rem'}}>React Todo App</header>
            <p style={{fontSize:'1rem'}}>Enhance Your Productivity</p>
          </div>
          <TodoList />
        </div>
      </div>
    );
  }
}

export default Todo;
