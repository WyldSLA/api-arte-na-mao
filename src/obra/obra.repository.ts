import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Obra, Prisma } from '@prisma/client';

@Injectable()
export class ObraRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ObraUncheckedCreateInput): Promise<Obra> {
    return await this.prismaService.obra.create({
      data,
    });
  }

  async getObraById(idObra: string): Promise<Obra | null> {
    return await this.prismaService.obra.findUnique({ where: { id: idObra } });
  }

  async update(idObra: string, data: Prisma.ObraUpdateInput): Promise<Obra> {
    return await this.prismaService.obra.update({
      where: { id: idObra },
      data,
    });
  }

  async getObraDetails(idObra: string) {
    return await this.prismaService.obra.findUnique({
      where: { id: idObra },
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
          },
        },
        comentarios: {
          select: {
            id: true,
            conteudo: true,
            dataCriacao: true,
            usuario: {
              select: {
                id: true,
                tipoUsuario: true,
                cliente: {
                  select: {
                    id: true,
                    nome: true,
                    fotoAvatar: true,
                  },
                },
                artista: {
                  select: {
                    id: true,
                    nome: true,
                    fotoAvatar: true,
                  },
                },
              },
            },
          },
          orderBy: {
            dataCriacao: 'desc',
          },
        },
        _count: {
          select: {
            comentarios: true,
            favoritos: true,
          },
        },
      },
    });
  }

  async updateAvailability(idObra: string, availability: boolean) {
    return await this.prismaService.obra.update({
      where: { id: idObra },
      data: { disponivel: availability },
    });
  }

  async delete(idObra: string): Promise<void> {
    await this.prismaService.obra.delete({ where: { id: idObra } });
  }
}
