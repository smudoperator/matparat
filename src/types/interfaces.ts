import { DayOfWeek, DinnerType, MeatType, SkillLevel } from "./enums";

// interfaces/Dinner.ts
export interface Dinner {
    id: string;
    name: string;
    description: string;
    type: DinnerType;
    meatType: MeatType;
    skillLevel: SkillLevel;
    ingredients: string[];
    tags: string[];
    imageData: string | null;
}

// interfaces/CreateDinner.ts
export interface CreateDinner {
    name: string;
    description: string;
    type: DinnerType;
    meatType: MeatType;
    skillLevel: SkillLevel;
    ingredients: string[];
    tags: string[];
    imageData: string | null;
}

// interfaces/CreateDinnerPlanRequest.ts
export interface CreateDinnerPlanRequest {
    tacoFriday: boolean,
    startDay: DayOfWeek,
    numberOfDays: number,
    numberOfFish: number
}

// interfaces/DinnerPlan.ts
export interface DinnerPlan {
    dinners: Dinner[],
    startDay: DayOfWeek,
    numberOfDays: number
}