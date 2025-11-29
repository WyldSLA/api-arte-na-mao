import {
  ConflictException,
  ForbiddenException,
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
import { AuthMeResponseDto } from './dto/auth-me-response.dto';
import { Tokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Tokens> {
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

    const tokens = await this.tokenService.generateToken(
      newUser.id,
      newUser.tipoUsuario,
      profileId,
    );

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.authRepository.updateRefreshToken(
      newUser.id,
      hashedRefreshToken,
    );

    return tokens;
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.authRepository.findByEmail(loginDto.email);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const passwordMatch = await bcrypt.compare(loginDto.senha, user.senha);
    if (!passwordMatch) throw new UnauthorizedException('Senha incorreta.');

    const profileId = await this.getProfileId(user.id);

    const tokens = await this.tokenService.generateToken(
      user.id,
      user.tipoUsuario,
      profileId,
    );

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }

  async authMe(userId: string): Promise<AuthMeResponseDto> {
    const user = await this.authRepository.findUserById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return AuthMapper.toAuthMeResponse(user);
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.authRepository.findUserById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Acesso negado');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Acesso negado');
    }

    const profileId = await this.getProfileId(user.id);

    const tokens = await this.tokenService.generateToken(
      user.id,
      user.tipoUsuario,
      profileId,
    );

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.updateRefreshToken(userId, null);
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
