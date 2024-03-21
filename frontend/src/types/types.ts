export interface Skill {
    _id: string;
    name: string;
}

export interface Career {
    _id: string;
    name: string;
    description: string;
}

export interface Employee {
    _id: string;
    name: string;
    lastname: string;
    age: number;
    email: string;
    skills: Skill[];
    career?: Career;
}
