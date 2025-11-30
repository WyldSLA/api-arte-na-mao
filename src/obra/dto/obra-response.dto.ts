import { Expose } from 'class-transformer';

export class ObraResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly tipoObra: string;

  @Expose()
  readonly nome: string;

  @Expose()
  readonly descricao: string;

  @Expose()
  readonly preco: string;

  @Expose()
  readonly disponivel: boolean;

  @Expose()
  readonly vendida: boolean;

  @Expose()
  readonly dataCriacao: Date;

  @Expose()
  readonly fotoObra?: string | null;
}
