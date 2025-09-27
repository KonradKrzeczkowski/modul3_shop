/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `exploreInfo` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryid` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageurl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Brand" DROP COLUMN "logoUrl";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "exploreInfo";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "brandId",
DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
ADD COLUMN     "brandid" INTEGER,
ADD COLUMN     "categoryid" INTEGER NOT NULL,
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageurl" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandid_fkey" FOREIGN KEY ("brandid") REFERENCES "public"."Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
