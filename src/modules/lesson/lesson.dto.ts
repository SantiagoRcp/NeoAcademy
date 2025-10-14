import { z } from "zod";

// ✅ Subschemas para cada tipo de sección
const textSectionSchema = z.object({
  type: z.literal("text"),
  title: z.string().min(1),
  body: z.string().min(1),
});

const videoSectionSchema = z.object({
  type: z.literal("video"),
  title: z.string().min(1),
  url: z.string().url("Invalid video URL"),
});

const codeSectionSchema = z.object({
  type: z.literal("code"),
  title: z.string().min(1),
  language: z.string().min(1),
  snippet: z.string().min(1),
  explanation: z.string().optional(),
});

const resourceSectionSchema = z.object({
  type: z.literal("resources"),
  title: z.string().min(1),
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url("Invalid resource URL"),
      })
    )
    .min(1),
});

const quizQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2, "At least two options are required"),
  answer: z.string().min(1),
});

const quizSectionSchema = z.object({
  type: z.literal("quiz"),
  title: z.string().min(1),
  questions: z.array(quizQuestionSchema).min(1),
});

const taskSectionSchema = z.object({
  type: z.literal("task"),
  title: z.string().min(1),
  instructions: z.string().min(1),
  evaluation: z.object({
    criteria: z.array(z.string().min(1)).min(1),
  }),
});

// ✅ Union de todos los tipos de secciones válidas
const lessonSectionSchema = z.union([
  textSectionSchema,
  videoSectionSchema,
  codeSectionSchema,
  resourceSectionSchema,
  quizSectionSchema,
  taskSectionSchema,
]);

// ✅ Schema principal del contenido
const lessonContentSchema = z.object({
  sections: z.array(lessonSectionSchema).min(1),
});

// ✅ Schema completo de Lesson
export const lessonSchemaDto = z.object({
  title: z.string().min(3, "Lesson title must have at least 3 characters"),
  content: lessonContentSchema,
  order: z.number().int().positive(),
  courseId: z.number().int().positive(),
});

export const updatedLesson = lessonSchemaDto.partial();

export type LessonInput = z.infer<typeof lessonSchemaDto>;
export type UpdatedLesson = z.infer<typeof updatedLesson>;
