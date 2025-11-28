import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenService } from '@/token/token.service';
import { LoginDto } from './dto/login.dto';
import { AuthMapper } from './mappers/auth.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const existingUser = await this.authRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) throw new ConflictException('Email já cadastrado.');

    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);
    const age = this.calculateAge(createUserDto.dataNascimento);

    const userData = AuthMapper.toUserData(createUserDto, hashedPassword);
    const perfilData = AuthMapper.toPerfilData(createUserDto, age);

    const newUser = await this.authRepository.create(userData, perfilData);
    const profileId = await this.getProfileId(newUser.id);

    return {
      accessToken: await this.tokenService.generateToken(
        newUser.id,
        newUser.tipoUsuario,
        profileId,
      ),
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.authRepository.findByEmail(loginDto.email);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const passwordMatch = await bcrypt.compare(loginDto.senha, user.senha);
    if (!passwordMatch) throw new UnauthorizedException('Senha incorreta.');

    const profileId = await this.getProfileId(user.id);

    return {
      accessToken: await this.tokenService.generateToken(
        user.id,
        user.tipoUsuario,
        profileId,
      ),
    };
  }

  private async getProfileId(userId: string): Promise<string | null> {
    const user = await this.authRepository.findUserById(userId);
    return user?.tipoUsuario === 'CLIENTE'
      ? (user?.cliente?.id ?? null)
      : (user?.artista?.id ?? null);
  }

  private calculateAge(birthDate: string | Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }
}
