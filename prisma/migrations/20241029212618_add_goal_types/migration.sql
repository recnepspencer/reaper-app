/*
  Warnings:

  - Added the required column `type` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('TIMER', 'COUNTER', 'YESNO');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "type" "GoalType" NOT NULL;

-- AlterTable
ALTER TABLE "UserGoal" ADD COLUMN     "streak" INTEGER,
ADD COLUMN     "totalCount" INTEGER,
ADD COLUMN     "totalDuration" INTEGER;
