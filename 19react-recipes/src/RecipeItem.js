import React from 'react';

const RecipeItem = ({ title, description, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="card" >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button onClick={handleEditClick} className="btn btn-info mr-4">Edit</button>
        <button onClick={handleDeleteClick} className="btn btn-warning">Delete</button>
      </div>
    </div>
  );
};

export default RecipeItem;
