import { TipoUsuario } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ObraDetailsResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly nome: string;

  @Expose()
  readonly fotoObra: string | null;

  @Expose()
  readonly preco: number;

  @Expose()
  readonly tipoObra: string;

  @Expose()
  readonly descricao: string;

  @Expose()
  readonly disponivel: boolean;

  @Expose()
  readonly nomeArtista: string;

  @Expose()
  readonly idArtista: string;

  @Expose()
  readonly comentarios: ComentarioDto[];

  @Expose()
  readonly totalComentarios: number;

  @Expose()
  readonly totalFavoritos: number;
}

export class ComentarioDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly conteudo: string;

  @Expose()
  readonly dataCriacao: Date;

  @Expose()
  readonly usuario: UsuarioComentarioDto;
}

export class UsuarioComentarioDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly nome: string;

  @Expose()
  readonly avatarUrl: string;

  @Expose()
  readonly tipo: TipoUsuario;
}
