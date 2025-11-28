import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { TipoUsuario, Usuario, Cliente, Artista } from '@prisma/client';
import { CreateUserData } from './interfaces/create-user.interface';
import { CreatePerfilData } from './interfaces/create-perfil.interface';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userData: CreateUserData,
    perfilData: CreatePerfilData,
  ): Promise<Usuario> {
    const { tipoUsuario, ...userRest } = userData;
    const { endereco, ...perfilRest } = perfilData;

    if (tipoUsuario === TipoUsuario.CLIENTE) {
      return await this.prismaService.usuario.create({
        data: {
          ...userRest,
          tipoUsuario,
          cliente: {
            create: {
              ...perfilRest,
              endereco: endereco
                ? {
                    create: {
                      ...endereco,
                    },
                  }
                : undefined,
            },
          },
        },
      });
    } else {
      return await this.prismaService.usuario.create({
        data: {
          ...userRest,
          tipoUsuario,
          artista: {
            create: {
              ...perfilRest,
              endereco: endereco
                ? {
                    create: {
                      ...endereco,
                    },
                  }
                : undefined,
            },
          },
        },
      });
    }
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.prismaService.usuario.findUnique({ where: { email } });
  }

  async findUserById(
    id: string,
  ): Promise<
    (Usuario & { cliente: Cliente | null; artista: Artista | null }) | null
  > {
    return this.prismaService.usuario.findUnique({
      where: { id },
      include: { cliente: true, artista: true },
    });
  }
}
