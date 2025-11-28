/*
  Warnings:

  - You are about to drop the column `banner` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artistas" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "banner",
DROP COLUMN "descricao",
DROP COLUMN "tags";
