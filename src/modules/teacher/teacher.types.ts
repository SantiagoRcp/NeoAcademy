export interface ITeacher {
  userId: number;
  specialization: string;
  bio?: string | null;
  experienceYears: number;
  linkedinurl?: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  hiredAt: Date; // fecha de contratacion
}
