import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumberString,
  IsDecimal,
} from 'class-validator';

export class CreateObraDto {
  @IsString()
  @IsNotEmpty()
  readonly tipoObra: string;

  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsString()
  @IsNotEmpty()
  readonly descricao: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsDecimal()
  readonly preco: string;

  @IsBoolean()
  @IsOptional()
  readonly disponivel?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly vendida?: boolean;

  @IsString()
  @IsOptional()
  readonly fotoObra?: string;
}
