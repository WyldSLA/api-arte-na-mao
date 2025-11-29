import { Expose } from 'class-transformer';
import { EnderecoResponseDto } from './endereco-response.dto';

export class AuthMeResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly nome: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly tipoUsuario: 'CLIENTE' | 'ARTISTA';

  @Expose()
  readonly avatarUrl?: string;

  @Expose()
  readonly bannerUrl?: string;

  @Expose()
  readonly tags?: string[];

  @Expose()
  readonly descricao?: string;

  @Expose()
  readonly telefone?: string;

  @Expose()
  readonly genero?: string;

  @Expose()
  readonly dataNascimento?: string;

  @Expose()
  readonly endereco?: EnderecoResponseDto;

  @Expose()
  readonly cnpj?: string;
}
