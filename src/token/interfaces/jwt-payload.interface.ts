import { TipoUsuario } from "@prisma/client";

export interface JwtPayload {
    sub: string;
    role: TipoUsuario;
    profileId: string  |null;
}