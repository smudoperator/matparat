import React from 'react';

interface IngredientListProps {
    ingredients: string[];
}

const IngredientList = ({ ingredients }: IngredientListProps) => {
    return (
        <div className="ingredient-card">
            <div className="ingredient-card-content">
                <h3>Ingredients</h3>
                {ingredients.length > 0 ? (
                    <ul className="ingredient-list">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="ingredient-item">
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No ingredients available.</p>
                )}
            </div>
        </div>
    );
};

export default IngredientList;