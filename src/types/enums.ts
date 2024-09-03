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

// enums/DayOfWeek.ts
export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export const DayOfWeekLabels: { [key in DayOfWeek]: string } = {
    [DayOfWeek.Sunday]: 'Sunday',
    [DayOfWeek.Monday]: 'Monday',
    [DayOfWeek.Tuesday]: 'Tuesday',
    [DayOfWeek.Wednesday]: 'Wednesday',
    [DayOfWeek.Thursday]: 'Thursday',
    [DayOfWeek.Friday]: 'Friday',
    [DayOfWeek.Saturday]: 'Saturday',
}

// Utility function for enum iteration
export class EnumUtils {
    static of<T extends object>(e: T) {
        const values = Object.values(e).filter(value => typeof value === 'number') as number[];
        return {
            next: <K extends keyof T>(v: T[K]) => values[(values.indexOf(v as unknown as number) + 1) % values.length],
            prev: <K extends keyof T>(v: T[K]) => values[(values.indexOf(v as unknown as number) - 1 + values.length) % values.length],
            values: () => values
        };
    }
}