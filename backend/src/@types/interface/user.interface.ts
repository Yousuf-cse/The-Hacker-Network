export type ExLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface IUser {
  full_name: string;
  age: number;
  avatar?: string;
  email: string;
  password: string;
  phone_number: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    landmark?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };

  education: {
    college_name: string;
    year_of_study: number;
    department: string;
  };
  skills: {
    technical: string;
    non_technical: string;
  };
  experience_level: string;
}
