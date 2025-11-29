import { Expose } from 'class-transformer';

export class EnderecoResponseDto {
  @Expose()
  readonly rua: string;

  @Expose()
  readonly numero: string;

  @Expose()
  readonly bairro: string;

  @Expose()
  readonly estado: string;

  @Expose()
  readonly pais?: string;

  @Expose()
  readonly cep: string;
}
