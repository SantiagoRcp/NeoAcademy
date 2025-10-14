/*
  Warnings:

  - Made the column `content` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `lessons` MODIFY `content` JSON NOT NULL;
