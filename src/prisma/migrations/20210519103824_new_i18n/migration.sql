/*
  Warnings:

  - You are about to drop the column `question_id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `lang` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question_id",
DROP COLUMN "lang",
DROP COLUMN "text";

-- CreateTable
CREATE TABLE "QuestionText" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionText" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
