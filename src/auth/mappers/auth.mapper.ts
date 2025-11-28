// auth/mappers/auth.mapper.ts
import { CreateUserDto } from '../dto/create-user.dto';
import { Genero, TipoUsuario } from '@prisma/client';
import { EnderecoDto } from '../dto/endereco.dto';
import { CreateUserData } from '../interfaces/create-user.interface';
import { CreatePerfilData } from '../interfaces/create-perfil.interface';
import { Endereco } from '../interfaces/endereco.interface';


export class AuthMapper {
  static toUserData(dto: CreateUserDto, hashedPassword: string): CreateUserData {
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
      tags: dto.tags
    };
  }

  private static toEnderecoData(enderecoDto?: EnderecoDto): Endereco | undefined {
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