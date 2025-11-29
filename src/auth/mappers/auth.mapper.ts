// auth/mappers/auth.mapper.ts
import { CreateUserDto } from '../dto/create-user.dto';
import { Usuario } from '@prisma/client';
import { EnderecoDto } from '../dto/endereco.dto';
import { CreateUserData } from '../interfaces/create-user.interface';
import { CreatePerfilData } from '../interfaces/create-perfil.interface';
import { Endereco } from '../interfaces/endereco.interface';
import { AuthMeResponseDto } from '../dto/auth-me-response.dto';

export class AuthMapper {
  static toUserData(
    dto: CreateUserDto,
    hashedPassword: string,
  ): CreateUserData {
    return {
      email: dto.email,
      senha: hashedPassword,
      tipoUsuario: dto.tipoUsuario,
    };
  }

  static toPerfilData(dto: CreateUserDto, idade: number): CreatePerfilData {
    return {
      nome: dto.nome,
      cpf: dto.cpf,
      cnpj: dto.cnpj,
      genero: dto.genero,
      telefone: dto.telefone,
      dataNascimento: new Date(dto.dataNascimento),
      idade,
      endereco: this.toEnderecoData(dto.endereco),
      descricao: dto.descricao,
      tags: dto.tags,
    };
  }

  static toAuthMeResponse(
    user: Usuario & {
      cliente?: any;
      artista?: any;
    },
  ): AuthMeResponseDto {
    const perfil = user.tipoUsuario === 'CLIENTE' ? user.cliente : user.artista;

    return {
      id: user.id,
      nome: perfil?.nome ?? '',
      email: user.email,
      tipoUsuario: user.tipoUsuario,
      avatarUrl: perfil?.fotoAvatar ?? null,
      bannerUrl: perfil?.banner ?? null,
      tags: perfil?.tags ?? [],
      descricao: perfil?.descricao ?? null,
      telefone: perfil?.telefone ?? null,
      genero: perfil?.genero ?? null,
      dataNascimento: perfil?.dataNascimento?.toISOString() ?? null,

      endereco: perfil?.endereco
        ? {
            rua: perfil.endereco.rua,
            numero: perfil.endereco.numero,
            bairro: perfil.endereco.bairro,
            estado: perfil.endereco.estado,
            pais: perfil.endereco.pais,
            cep: perfil.endereco.cep,
          }
        : undefined,

      cnpj: user.tipoUsuario === 'ARTISTA' ? perfil?.cnpj : undefined,
    };
  }

  private static toEnderecoData(
    enderecoDto?: EnderecoDto,
  ): Endereco | undefined {
    if (!enderecoDto) {
      return undefined;
    }

    const { rua, numero, bairro, estado, cep, pais } = enderecoDto;

    if (!rua || !numero || !bairro || !estado || !cep) {
      return undefined;
    }

    return {
      rua,
      numero,
      bairro,
      estado,
      cep,
      pais: pais || 'Brasil',
    };
  }
}
