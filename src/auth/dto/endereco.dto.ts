import { IsOptional, IsString } from "class-validator";

export class EnderecoDto {
  @IsString()
  readonly rua: string;

  @IsString()
  readonly numero: string;

  @IsString()
  readonly bairro: string;

  @IsString()
  readonly estado: string;

  @IsString()
  @IsOptional()
  readonly pais?: string;

  @IsString()
  readonly cep: string;
}