-- AlterTable
ALTER TABLE "Form"
ADD COLUMN "content" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "shareUrl" TEXT;

ALTER TABLE "Form" ALTER COLUMN "description" SET DEFAULT '';

UPDATE "Form"
SET "shareUrl" = md5(random()::text || clock_timestamp()::text || "id"::text)
WHERE "shareUrl" IS NULL;

ALTER TABLE "Form" ALTER COLUMN "shareUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "FormSubmissions" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "data" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "FormSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormSubmissions_formId_idx" ON "FormSubmissions"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_name_key" ON "Form"("userId", "name");

-- AddForeignKey
ALTER TABLE "FormSubmissions"
ADD CONSTRAINT "FormSubmissions_formId_fkey"
FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
