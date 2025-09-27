-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `lessons` DROP FOREIGN KEY `Lessons_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `registrations` DROP FOREIGN KEY `Registrations_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `registrations` DROP FOREIGN KEY `Registrations_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `Students_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `tasksubmissions` DROP FOREIGN KEY `TaskSubmissions_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `tasksubmissions` DROP FOREIGN KEY `TaskSubmissions_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `teachers` DROP FOREIGN KEY `Teachers_userId_fkey`;

-- DropIndex
DROP INDEX `Courses_categoryId_fkey` ON `courses`;

-- DropIndex
DROP INDEX `Courses_teacherId_fkey` ON `courses`;

-- DropIndex
DROP INDEX `Lessons_courseId_fkey` ON `lessons`;

-- DropIndex
DROP INDEX `Registrations_courseId_fkey` ON `registrations`;

-- DropIndex
DROP INDEX `Registrations_studentId_fkey` ON `registrations`;

-- DropIndex
DROP INDEX `Students_userId_fkey` ON `students`;

-- DropIndex
DROP INDEX `Tasks_courseId_fkey` ON `tasks`;

-- DropIndex
DROP INDEX `Tasks_lessonId_fkey` ON `tasks`;

-- DropIndex
DROP INDEX `TaskSubmissions_studentId_fkey` ON `tasksubmissions`;

-- DropIndex
DROP INDEX `TaskSubmissions_taskId_fkey` ON `tasksubmissions`;

-- DropIndex
DROP INDEX `Teachers_userId_fkey` ON `teachers`;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lessons` ADD CONSTRAINT `Lessons_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registrations` ADD CONSTRAINT `Registrations_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registrations` ADD CONSTRAINT `Registrations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lessons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskSubmissions` ADD CONSTRAINT `TaskSubmissions_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskSubmissions` ADD CONSTRAINT `TaskSubmissions_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
