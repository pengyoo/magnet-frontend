export interface Company {
    id: string;
    name: string;
    description:string;
}

export interface Job {
    id: string;
    title: string;
    description:string;
    salaryRange:string;
    location:string;
    createdAt: Date;
    expireAt:Date;
    status:string;
    company:Company;
}

export interface Resume {
    id: string;
    fullName: string;
    profile: string;
    contact: {
      id: string;
      phoneNumber: string;
      email: string;
      address: string;
      city: string;
      country: string;
      postCode: string;
      linkedInUrl: string;
    };
    skills: string[];
    education: {
      id: string;
      schoolName: string;
      degree: string;
      major: string;
      startDate: Date;
      endDate: Date;
      key:string;
    }[];
    experience: {
      id: string;
      position: string;
      companyName: string;
      startDate: Date;
      endDate: Date;
      description: string;
      location: string;
      key:string;
    }[];
    projects: {
      id: string;
      name: string;
      startDate: Date;
      endDate: Date;
      description: string;
      key:string;
    }[];
    status: string;
  }

export interface User {
    id: string;
    email: string;
    password:string;
    createdAt: Date;
    profile: string;
    role: string;
    terms: boolean;

  }