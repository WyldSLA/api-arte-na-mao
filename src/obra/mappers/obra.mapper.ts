import { Obra, Prisma } from '@prisma/client';
import { ObraResponseDto } from '../dto/obra-response.dto';
import { CreateObraDto } from '../dto/create-obra.dto';
import { UpdateObraDto } from '../dto/update-obra.dto';
import {
  ComentarioDto,
  ObraDetailsResponseDto,
  UsuarioComentarioDto,
} from '../dto/obra-details-response.dto';

export class ObraMapper {
  static toObraData(
    artistaId: string,
    dto: CreateObraDto,
  ): Prisma.ObraUncheckedCreateInput {
    return {
      idArtista: artistaId,
      tipoObra: dto.tipoObra,
      nome: dto.nome,
      descricao: dto.descricao,
      preco: new Prisma.Decimal(dto.preco),
      fotoObra: dto.fotoObra ?? null,
      disponivel: dto.disponivel ?? true,
      vendida: dto.vendida ?? false,
    };
  }

  static toResponse(obra: Obra): ObraResponseDto {
    return {
      id: obra.id,
      tipoObra: obra.tipoObra,
      nome: obra.nome,
      descricao: obra.descricao,
      preco: obra.preco.toString(),
      disponivel: obra.disponivel,
      vendida: obra.vendida,
      dataCriacao: obra.dataCriacao,
      fotoObra: obra.fotoObra ?? null,
    };
  }

  static toUpdateData(dto: UpdateObraDto): Partial<Obra> {
    return {
      nome: dto.nome,
      descricao: dto.descricao,
      tipoObra: dto.tipoObra,
      preco: dto.preco ? new Prisma.Decimal(dto.preco) : undefined,
      disponivel: dto.disponivel,
      vendida: dto.vendida,
      fotoObra: dto.fotoObra,
    };
  }

  static toObraDetailsResponseDto(entity: any): ObraDetailsResponseDto {
    return {
      id: entity.id,
      nome: entity.nome,
      tipoObra: entity.tipoObra,
      descricao: entity.descricao,
      fotoObra: entity.fotoObra,
      preco: entity.preco.toNumber(),
      disponivel: entity.disponivel,
      idArtista: entity.artista.id,
      nomeArtista: entity.artista.nome,
      comentarios: entity.comentarios.map((c: any) => {
        this.mapComentario(c);
      }),
      totalComentarios: entity._count.comentarios,
      totalFavoritos: entity._count.favoritos,
    };
  }

  private static mapComentario(c: any): ComentarioDto {
    return {
      id: c.id,
      conteudo: c.conteudo,
      dataCriacao: c.dataCriacao,
      usuario: this.mapUsuario(c.usuario),
    };
  }

  private static mapUsuario(usuario: any): UsuarioComentarioDto {
    if (usuario.cliente) {
      return {
        id: usuario.cliente.id,
        nome: usuario.cliente.nome,
        avatarUrl: usuario.cliente.fotoAvatar,
        tipo: 'CLIENTE',
      };
    }

    if (usuario.artista) {
      return {
        id: usuario.artista.id,
        nome: usuario.artista.nome,
        avatarUrl: usuario.artista.fotoAvatar,
        tipo: 'ARTISTA',
      };
    }

    return {
      id: '',
      nome: 'Desconhecido',
      avatarUrl: '',
      tipo: 'CLIENTE',
    };
  }
}
