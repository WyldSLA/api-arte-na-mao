import { TipoUsuario } from "@prisma/client";

export interface CreateUserData {
  email: string;
  senha: string;
  tipoUsuario: TipoUsuario;
}