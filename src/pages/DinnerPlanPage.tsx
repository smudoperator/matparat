import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dinner } from '../types/interfaces';
import DinnerCard from '../components/DinnerCard';
import IngredientList from '../components/IngredientList';
import { DayOfWeek, DayOfWeekLabels, EnumUtils  } from '../types/enums';

const dayUtils = EnumUtils.of(DayOfWeek);

  // Create list of weekdays based on start day and number of days
  const createWeekdays = (startDay: DayOfWeek, numberOfDays: number): DayOfWeek[] => {
    let weekdays: DayOfWeek[] = [];
    let day: DayOfWeek = startDay;

    console.log("StartDayt", startDay);
    console.log("numberOfDays", numberOfDays);

    for (let counter = 0; counter < numberOfDays; counter++) {
        weekdays.push(day);
        day = dayUtils.next(day);
    }

    return weekdays;
  };

const DinnerPlanPage: React.FC = () => {
    const location = useLocation();
    const [showIngredients, setShowIngredients] = useState(false);

    const dinnerPlan = location.state.result as { startDay: DayOfWeek; numberOfDays: number; dinners: Dinner[]; shoppingList: string[] };
    
    const toggleIngredientsList = () => {
        setShowIngredients((prev) => !prev);
    };

    if (!dinnerPlan) {
        return <div>No dinner plan available.</div>;
    }

    const weekdays = createWeekdays(dinnerPlan.startDay, dinnerPlan.numberOfDays);


    return (
        <main className="container">
            <h1>Dinner Plan</h1>
            <button className="shopping-list-button" onClick={toggleIngredientsList}>
                {showIngredients ? 'Handleliste' : 'Handleliste'}
            </button>
            {showIngredients && (
                <div className="ingredient-list-container">
                    <IngredientList ingredients={dinnerPlan.shoppingList} />
                </div>
            )}
            {weekdays.map((day, index) => (
                <div key={day} className="dinner-plan-container">
                    <h2>{DayOfWeekLabels[day]}</h2>
                    <div className="dinner-cards">
                        {dinnerPlan.dinners[index] && (
                            <DinnerCard
                                key={dinnerPlan.dinners[index].id}
                                name={dinnerPlan.dinners[index].name}
                                description={dinnerPlan.dinners[index].description}
                                imageData={dinnerPlan.dinners[index].imageData}
                                type={dinnerPlan.dinners[index].type.toString()}
                                meatType={dinnerPlan.dinners[index].meatType.toString()}
                                skillLevel={dinnerPlan.dinners[index].skillLevel.toString()}
                                ingredients={dinnerPlan.dinners[index].ingredients}
                                tags={dinnerPlan.dinners[index].tags}
                            />
                        )}
                    </div>
                </div>
            ))}
        </main>
    );
};

export default DinnerPlanPage;