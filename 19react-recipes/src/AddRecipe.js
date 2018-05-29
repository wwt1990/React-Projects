import React from 'react';
import $ from 'jquery';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: Object.values((Object.assign({}, this.props.recipes)))
    };
    this.handleTextareaFocus = this.handleTextareaFocus.bind(this);
    this.handleTextareaKeyUp = this.handleTextareaKeyUp.bind(this);
    this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
    this.handleCancelRecipe = this.handleCancelRecipe.bind(this);
  }

  handleTextareaFocus(e) {
    if(e.target.value.trim() === '') {
      e.target.value +='•\u00a0';
  	}
  }

  handleTextareaKeyUp(e) {
    var keycode = e.keyCode;
    if(keycode === 13){
      e.target.value += '•\u00a0';
    }
  }

  handleSaveRecipe(e) {
    e.preventDefault();
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;

    if (title.trim().length > 3 && description.trim().length > 10) {
      const newRecipe = {
        title: this.titleInput.value,
        description: this.descriptionInput.value
      };

      this.props.addRecipe(newRecipe);

      this.refs.form.reset();
      $('#v-pills-profile-tab').addClass('active');
      $('#v-pills-profile').addClass('show active');
      $('#v-pills-messages-tab').removeClass('active');
      $('#v-pills-messages').removeClass('show active');
    } else {
      alert('title must be at least 3 characters and description must be at least 10 characters!');
    }

  }

  handleCancelRecipe(e) {
    e.preventDefault();
    this.props.cancelRecipe();
    this.refs.form.reset();
    $('#v-pills-profile-tab').addClass('active');
    $('#v-pills-profile').addClass('show active');
    $('#v-pills-messages-tab').removeClass('active');
    $('#v-pills-messages').removeClass('show active');
  }

  render() {
    const isEditing = this.props.isEditing;
    if (isEditing) {
      $("input:text").val(this.props.recipeInEditing.title);
      $("input:text").prop('disabled', true);
      const descriptionObj = this.props.recipeInEditing.description.split("\n");
      const descriptionObj2 = descriptionObj.map((des, i) => {
        if (i === descriptionObj.length - 1) {
          return `•\u00a0${des}`;
        } else {
          return `•\u00a0${des}\n`;
        }
      });
      const description = descriptionObj2.toString().replace(/,•/g, '•')
      $("textarea").val(description);
    }
    return (
      <form ref='form'>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" ref={el => {this.titleInput = el}} className="form-control" id="title" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea ref={el => {this.descriptionInput = el}} className="form-control" id="description" rows={10} onFocus={this.handleTextareaFocus} onKeyUp={this.handleTextareaKeyUp}/>
        </div>
        <button className='btn btn-success mr-4' onClick={this.handleSaveRecipe.bind(this)}>Save Recipe</button>
        <button className='btn btn-warning' onClick={this.handleCancelRecipe}>Cancel Recipe</button>
      </form>
    );
  }
}

export default AddRecipe;
