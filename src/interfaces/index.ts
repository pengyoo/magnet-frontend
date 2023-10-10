export interface Company {
    id: number;
    name: string;
    description:string;
}

export interface Job {
    id: number;
    title: string;
}

export interface Resume {
    id: number;
    fullName: string;
}

export interface User {
    id: string;
    email: string;
    createdAt: Date;
    profile: string;
    role: string;
  }