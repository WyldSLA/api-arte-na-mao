import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@/commom/types/api-response.type';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    const accessToken = await this.authService.create(createUserDto);
    return {
      status: 'success',
      data: accessToken,
      message: 'Usuário cadastrado com sucesso.',
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse>{
    const accessToken = await this.authService.login(loginDto);
    return {
        status: 'success',
        data: accessToken,
        message: 'Login realizado com sucesso.'
    }
  }
}
