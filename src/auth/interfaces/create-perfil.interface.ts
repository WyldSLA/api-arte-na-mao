import { Genero } from '@prisma/client';
import { Endereco } from './endereco.interface';

export interface CreatePerfilData {
  nome: string;
  cpf: string;
  cnpj?: string;
  genero: Genero;
  telefone: string;
  dataNascimento: Date;
  idade: number;
  endereco?: Endereco;
  tags?: string[];
  descricao?: string;
}
