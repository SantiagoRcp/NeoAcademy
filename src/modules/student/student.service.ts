import { StudentRepository } from "./student.repository";

export class StudentService {
  private studentRepo: StudentRepository;

  constructor() {
    this.studentRepo = new StudentRepository();
  }
}
