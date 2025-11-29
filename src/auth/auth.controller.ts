import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@/types/api-response.type';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from '@/auth/guards/access-token.guard';
import { User } from '@/auth/decorators/user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    const tokens = await this.authService.create(createUserDto);
    return {
      status: 'success',
      data: tokens,
      message: 'Usuário cadastrado com sucesso.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse> {
    const tokens = await this.authService.login(loginDto);
    return {
      status: 'success',
      data: tokens,
      message: 'Login realizado com sucesso.',
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  async authMe(@User('userId') userId: string): Promise<ApiResponse> {
    const userData = await this.authService.authMe(userId);
    return {
      status: 'success',
      data: userData,
      message: 'Dados do usuário retornado com sucesso.',
    };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @User('userId') userId: string,
    @User('refreshToken') refreshToken: string,
  ): Promise<ApiResponse> {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    return {
      status: 'success',
      data: tokens,
      message: 'Token renovado com sucesso.',
    };
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@User('userId') userId: string): Promise<ApiResponse> {
    await this.authService.logout(userId);
    return {
      status: 'success',
      message: 'Logout feito com sucesso.',
    };
  }
}
