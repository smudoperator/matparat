// enums/DinnerType.ts
export enum DinnerType {
    Fish = 0,
    Meat = 1,
    Chicken = 2,
    Vegan = 3,
    Soup = 4,
    Pasta = 5,
    Other = 6
}

export const DinnerTypeLabels: { [key in DinnerType]: string } = {
    [DinnerType.Fish]: 'Fish',
    [DinnerType.Meat]: 'Meat',
    [DinnerType.Chicken]: 'Chicken',
    [DinnerType.Vegan]: 'Vegan',
    [DinnerType.Soup]: 'Soup',
    [DinnerType.Pasta]: 'Pasta',
    [DinnerType.Other]: 'Other'
};

// enums/MeatType.ts
export enum MeatType {
    Beef = 0,
    Pork = 1,
    Lamb = 2,
    Chicken = 3,
    Wild = 4,
    Other = 5
}

export const MeatTypeLabels: { [key in MeatType]: string } = {
    [MeatType.Beef]: 'Beef',
    [MeatType.Pork]: 'Pork',
    [MeatType.Lamb]: 'Lamb',
    [MeatType.Chicken]: 'Chicken',
    [MeatType.Wild]: 'Wild',
    [MeatType.Other]: 'Other'
};

// enums/SkillLevel.ts
export enum SkillLevel {
    Easy = 0,
    Medium = 1,
    Hard = 2,
    Expert = 3,
    Impossible = 4
}

export const SkillLevelLabels: { [key in SkillLevel]: string } = {
    [SkillLevel.Easy]: 'Easy',
    [SkillLevel.Medium]: 'Medium',
    [SkillLevel.Hard]: 'Hard',
    [SkillLevel.Expert]: 'Expert',
    [SkillLevel.Impossible]: 'Impossible'
};