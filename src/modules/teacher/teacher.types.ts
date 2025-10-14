export interface ITeacher {
  userId: number;
  specialization: string;
  bio?: string | null;
  experienceYears: number;
  linkedinUrl?: string | null;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  hiredAt: Date; // fecha de contratacion
}

export interface ITeacherUpdate extends Partial<ITeacher> {}
