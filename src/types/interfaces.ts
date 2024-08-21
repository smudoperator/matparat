import { DinnerType, MeatType, SkillLevel } from "./enums";

// interfaces/Dinner.ts
export interface Dinner {
    id: number;
    name: string;
    description: string;
    type: DinnerType;
    meatType: MeatType;
    skillLevel: SkillLevel;
    ingredients: string[];
    tags: string[];
    image: string | null;
}