import React, { Component } from 'react';
import $ from 'jquery';
import './Recipes.css';
import initialRecipes from './initialRecipes';
import RecipesList from './RecipesList';
import Home from './Home';
import AddRecipe from './AddRecipe';


class Recipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
      isEditing: false,
      recipeInEditing: {}
		};
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.cancelRecipe = this.cancelRecipe.bind(this);
  }

  componentWillMount() {
		if (!localStorage.getItem('firstTimeRecipesLoad')) {
			localStorage.setItem('firstTimeRecipesLoad', 'true');
			for (var i = 0; i < initialRecipes.length; i++) {
				localStorage.setItem(initialRecipes[i].title, initialRecipes[i].description)
			}
		}
		this.showAllRecipes();
	}

	showAllRecipes() {
		// this.setState({ recipes: initialRecipes })
		var keys = [];
		for (var i = 0; i < localStorage.length; i++) {
			keys[i] = localStorage.key(i);
		}
		for (var j = 0; j < keys.length; j++) {
			if (keys[j] === 'firstTimeRecipesLoad') {
				keys.splice(j, 1);
			}
		}

    var recipes = [];
		for (var k = 0; k < keys.length; k++) {
			recipes.push({
				title: keys[k],
				description: localStorage.getItem(keys[k])
			});
		}
		this.setState({ recipes });

	}

	componentDidMount() {
		for (var i = 0; i < this.state.recipes.length; i++) {
			localStorage.setItem(this.state.recipes[i].title, this.state.recipes[i].description)
		}
	}

  editRecipe(recipe) {
    this.setState({
      isEditing: true,
      recipeInEditing: recipe
    })
  }

  deleteRecipe(recipe) {
    this.setState(prevState => ({
        recipes: prevState.recipes.filter(el => el !== recipe )
    }));
		localStorage.removeItem(recipe.title)
  }

  addRecipe(newRecipe) {
		if (!this.state.isEditing && this.state.recipes.find(recipe => recipe.title === newRecipe.title)) {
			alert (`Recipe "${newRecipe.title}" alreay exists!`);
			return;
		}

    const newDescription = newRecipe.description.replace(/•\s/g, '');
    newRecipe.description = newDescription;
		const newRecipes = [
			Object.assign({}, newRecipe),
        ...this.state.recipes.filter(recipe => recipe.title !== newRecipe.title)
      ];
    this.setState({
      recipes: newRecipes,
      isEditing: false,
			recipeInEditing: {}
    });
		$("input:text").prop('disabled', false);
		localStorage.setItem(newRecipe.title, newRecipe.description)
  }

	cancelRecipe(){
		this.setState({
			isEditing: false,
			recipeInEditing: {}
		});
		$("input:text").prop('disabled', false);
	}

	render() {
    const editOrAdd = (this.state.isEditing) ? 'Edit Recipe' : 'Add New Recipe';
		return (
			<div>
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
          <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">All Recipes</a>
          <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">{editOrAdd}</a>
        </div>
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Home /></div>
          <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><RecipesList recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} editRecipe={this.editRecipe} /></div>
          <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><AddRecipe recipes={this.state.recipes} addRecipe={this.addRecipe} cancelRecipe={this.cancelRecipe} isEditing={this.state.isEditing} recipeInEditing={this.state.recipeInEditing} /></div>
        </div>
			</div>
		);
	}
};


export default Recipes;
