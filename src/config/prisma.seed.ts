import { hashedPassword } from "../utils/bcryptjs";
import logger from "./logger.config";
import { prisma } from "./prisma";

async function main() {
  const categories = [
    { name: "Programación", description: "Cursos para aprender lenguajes de programación y desarrollo de software." },
    { name: "Diseño Web", description: "Aprende a crear sitios web modernos con HTML, CSS y frameworks." },
    {
      name: "Ciencia de Datos",
      description: "Analiza datos, crea modelos predictivos y domina herramientas de big data.",
    },
    {
      name: "Inteligencia Artificial",
      description: "Cursos sobre machine learning, deep learning y aplicaciones de IA.",
    },
    {
      name: "Ciberseguridad",
      description: "Protege sistemas y redes con buenas prácticas y herramientas de seguridad.",
    },
    { name: "Desarrollo Móvil", description: "Crea aplicaciones para Android e iOS con frameworks modernos." },
    {
      name: "Marketing Digital",
      description: "Aprende estrategias de marketing en redes sociales, SEO y publicidad online.",
    },
    {
      name: "Idiomas",
      description: "Cursos para aprender y mejorar idiomas extranjeros como inglés, francés o alemán.",
    },
    { name: "Finanzas y Negocios", description: "Gestión empresarial, inversiones y educación financiera." },
    {
      name: "Habilidades Blandas",
      description: "Mejora tu comunicación, liderazgo, trabajo en equipo y productividad.",
    },
  ];

  // Roles
  const admin = await prisma.role.create({ data: { role: "Admin", description: "ADMIN" } });
  const student = await prisma.role.create({ data: { role: "Student", description: "STUDENT" } });
  const teacher = await prisma.role.create({ data: { role: "Teacher", description: "TEACHER" } });

  // User type Admin
  const passAdmin = await hashedPassword("Admin_01@");
  const registerAdmin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@admin.com",
      password: passAdmin,
      dateOfBirth: "1995-08-28T23:00:00.000Z",
      phone: "5547620186",
      address: "A/V Address No. 5",
      roleId: 1,
    },
  });

  // Categories
  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  logger.info(admin);
  logger.info(student);
  logger.info(teacher);
  logger.info(registerAdmin);
}

main()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
