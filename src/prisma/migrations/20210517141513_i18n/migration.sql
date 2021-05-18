-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
