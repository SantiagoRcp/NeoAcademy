import { prisma } from "../../config/prisma";

export class AdminRepository {
  async getRegistrationReport() {
    const report = await prisma.registration.groupBy({
      by: ["paymentStatus"],
      _count: { id: true },
    });
    return report.map((r) => ({
      status: r.paymentStatus,
      count: r._count.id,
    }));
  }
}
