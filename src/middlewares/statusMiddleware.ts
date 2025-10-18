import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

export async function statusTeacher(req: Request, res: Response, next: NextFunction) {
  const teacherId = Number(req.user?.teacherId);
  const teacher = await prisma.teacher.findUnique({ where: { id: teacherId }, select: { status: true } });
  if (!teacher || teacher.status !== "ACTIVE") {
    return res.status(403).json({ message: "Your teacher account is not active" });
  }
  next();
}

export async function statusStudent(req: Request, res: Response, next: NextFunction) {
  const studentId = Number(req.user?.studentId);
  const student = await prisma.student.findUnique({ where: { id: studentId }, select: { status: true } });
  if (!student || student.status !== "ACTIVE") {
    return res.status(403).json({ message: "Your student account is not active." });
  }
  next();
}

export async function statusUser(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email;
  const user = await prisma.user.findUnique({ where: { email }, select: { active: true } });

  if (!user) {
    return res.status(404).json({ message: "User no found." });
  }

  if (user.active === "INACTIVE") {
    return res.status(403).json({ message: "Your account is not active." });
  }
  next();
}
