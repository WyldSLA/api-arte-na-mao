import { TipoUsuario } from "@prisma/client";

export interface JwtPayload {
    sub: string;
    tipoUsuario: TipoUsuario;
    perfilId: string | null;
}