import { Genero, TipoUsuario } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { EnderecoDto } from './endereco.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  readonly tipoUsuario: TipoUsuario;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  readonly senha: string;

  @IsNotEmpty()
  @IsString()
  readonly nome: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF deve estar no formato 000.000.000-00',
  })
  readonly cpf: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.tipoUsuario === TipoUsuario.ARTISTA)
  @IsString()
  @IsOptional()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'CNPJ deve estar no formato 00.000.000/0000-00',
  })
  readonly cnpj?: string;

  @IsNotEmpty()
  @IsEnum(Genero)
  readonly genero: Genero;

  @IsNotEmpty()
  @IsString()
  readonly telefone: string;
  
  @IsNotEmpty()
  @IsDateString()
  readonly dataNascimento: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[];

  @IsString()
  @IsOptional()
  readonly descricao?: string;

  @ValidateNested()
  @Type(() => EnderecoDto)
  @IsOptional()
  readonly endereco?: EnderecoDto;
}
