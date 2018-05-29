import React, { Component } from 'react';
import RecipeItem from './RecipeItem';
import $ from 'jquery';

class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: Object.values((Object.assign({}, this.props.recipes)))
    };
  }

  handleDeleteClick(recipe) {
    this.props.deleteRecipe(recipe);
  }

  handleEditClick(recipe) {
    this.props.editRecipe(recipe);
    $('#v-pills-messages-tab').addClass('active');
    $('#v-pills-messages').addClass('show active');
    $('#v-pills-profile-tab').removeClass('active');
    $('#v-pills-profile').removeClass('show active');    
  }

  componentWillReceiveProps(newProps) {
    this.setState({recipes: newProps.recipes});
  }

  render() {
    return(
      <div>
         {
          this.state.recipes.map((recipe, index) => {
            const description = recipe.description.split("\n").map((des, i) => {
              return <li key={i}>{des}</li>;
            })
            return <RecipeItem key={index} title={recipe.title} description={description} handleDeleteClick={this.handleDeleteClick.bind(this, recipe)} handleEditClick={this.handleEditClick.bind(this, recipe)} />
          })
         }
       </div>
    );
  }
}

export default RecipesList;
