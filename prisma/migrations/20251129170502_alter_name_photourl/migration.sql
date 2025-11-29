/*
  Warnings:

  - You are about to drop the column `banner` on the `artistas` table. All the data in the column will be lost.
  - You are about to drop the column `foto_artista` on the `artistas` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `foto_cliente` on the `clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artistas" DROP COLUMN "banner",
DROP COLUMN "foto_artista",
ADD COLUMN     "foto_avatar" TEXT,
ADD COLUMN     "foto_banner" TEXT;

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "banner",
DROP COLUMN "foto_cliente",
ADD COLUMN     "foto_avatar" TEXT,
ADD COLUMN     "foto_banner" TEXT;
