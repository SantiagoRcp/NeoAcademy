export interface IStudent {
  userId: number;
  enrollmentDate: Date;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
}
