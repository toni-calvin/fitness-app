export interface Set {
    id: number;
    reps: number;
    weight: string;
    restTime: number;
    rir: number;
}

export interface Exercise {
    id: number;
    name: string;
    sets: [Set];
    MuscleGroup: string;
    MovementType: string;
    Notes: string;
}

export interface Training {
    id: number;
    targetMuscleGroup: string;
    excercises: [Exercise];
    preparationLevel: number;
    comments: string;
}

export interface Microcycle {
    id: number;
    startDate: string;
    endDate: string;
    trainings: [Training];
}

export interface Mesocycle {
    id: number;
    startDate: string;
    endDate: string;
    microcycles: [Microcycle];
    objectives: string;
}