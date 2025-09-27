/*
  Warnings:

  - You are about to drop the column `address` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `teachers` table. All the data in the column will be lost.
  - Added the required column `address` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registrations` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `students` DROP COLUMN `address`,
    DROP COLUMN `dateOfBirth`,
    DROP COLUMN `phone`,
    MODIFY `enrollmentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `teachers` DROP COLUMN `phone`,
    MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `hiredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateOfBirth` DATETIME(3) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Students_status_idx` ON `Students`(`status`);

-- CreateIndex
CREATE INDEX `Teachers_status_idx` ON `Teachers`(`status`);
