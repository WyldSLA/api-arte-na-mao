-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('CLIENTE', 'ARTISTA');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO', 'PREFIRO_NAO_DIZER');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('CONFIRMADO', 'ENTREGUE', 'RETIRADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoAdesao" AS ENUM ('VISITANTE', 'EXPOSITOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "banner" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "descricao" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "telefone" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "idade" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "foto_cliente" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artistas" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "cpf" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "telefone" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "idade" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "foto_artista" TEXT,

    CONSTRAINT "artistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrinhos" (
    "id" TEXT NOT NULL,
    "id_obra" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carrinhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obras" (
    "id" TEXT NOT NULL,
    "id_artista" TEXT NOT NULL,
    "tipo_obra" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "vendida" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "foto_obra" TEXT,

    CONSTRAINT "obras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoritos" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "id_obra" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "id_obra" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compras" (
    "id" TEXT NOT NULL,
    "id_obra" TEXT NOT NULL,
    "id_artista" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "forma_pagamento" TEXT NOT NULL,
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_entrega" TEXT NOT NULL,
    "status_pedido" "StatusPedido" NOT NULL DEFAULT 'CONFIRMADO',
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "id_cliente" TEXT,
    "id_artista" TEXT,
    "id_evento" TEXT,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL DEFAULT 'Brasil',
    "cep" TEXT NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" TEXT NOT NULL,
    "id_artista_criador" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_evento" TIMESTAMP(3) NOT NULL,
    "preco_adesao" DECIMAL(10,2),
    "gratuito" BOOLEAN NOT NULL DEFAULT false,
    "capacidade_maxima" INTEGER,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos_participantes" (
    "id" TEXT NOT NULL,
    "id_evento" TEXT NOT NULL,
    "id_artista" TEXT,
    "id_usuario" TEXT NOT NULL,
    "tipo_adesao" "TipoAdesao" NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventos_participantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_id_usuario_key" ON "clientes"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "artistas_id_usuario_key" ON "artistas"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "artistas_cnpj_key" ON "artistas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "artistas_cpf_key" ON "artistas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "carrinhos_id_usuario_id_obra_key" ON "carrinhos"("id_usuario", "id_obra");

-- CreateIndex
CREATE UNIQUE INDEX "favoritos_id_usuario_id_obra_key" ON "favoritos"("id_usuario", "id_obra");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_cliente_key" ON "enderecos"("id_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_artista_key" ON "enderecos"("id_artista");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_evento_key" ON "enderecos"("id_evento");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_participantes_id_evento_id_usuario_key" ON "eventos_participantes"("id_evento", "id_usuario");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artistas" ADD CONSTRAINT "artistas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinhos" ADD CONSTRAINT "carrinhos_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "obras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinhos" ADD CONSTRAINT "carrinhos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obras" ADD CONSTRAINT "obras_id_artista_fkey" FOREIGN KEY ("id_artista") REFERENCES "artistas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "obras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "obras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_id_artista_fkey" FOREIGN KEY ("id_artista") REFERENCES "artistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_id_artista_fkey" FOREIGN KEY ("id_artista") REFERENCES "artistas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_id_artista_criador_fkey" FOREIGN KEY ("id_artista_criador") REFERENCES "artistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_participantes" ADD CONSTRAINT "eventos_participantes_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_participantes" ADD CONSTRAINT "eventos_participantes_id_artista_fkey" FOREIGN KEY ("id_artista") REFERENCES "artistas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_participantes" ADD CONSTRAINT "eventos_participantes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
