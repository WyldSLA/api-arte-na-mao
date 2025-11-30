import { Roles } from '@/auth/decorators/roles.decorator';
import { AccessTokenGuard } from '@/auth/guards/access-token.guard';
import { ApiResponse } from '@/types/api-response.type';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  Get,
  ParseBoolPipe,
} from '@nestjs/common';
import { TipoUsuario } from '@prisma/client';
import { CreateObraDto } from './dto/create-obra.dto';
import { User } from '@/auth/decorators/user.decorator';
import { ObraService } from './obra.service';
import { UpdateObraDto } from './dto/update-obra.dto';

@Controller('obras')
export class ObraController {
  constructor(private readonly obraService: ObraService) {}

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async getObraDetails(@Param('id') idObra: string): Promise<ApiResponse> {
    const obraData = await this.obraService.getObraDetails(idObra);
    return {
      status: 'success',
      data: obraData
    };
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @Roles(TipoUsuario.ARTISTA)
  async createObra(
    @Body() createObraDto: CreateObraDto,
    @User('perfilId') perfilId: string,
  ): Promise<ApiResponse> {
    const obraData = await this.obraService.create(perfilId, createObraDto);
    return {
      status: 'success',
      data: obraData,
      message: 'Obra criada com sucesso',
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Roles(TipoUsuario.ARTISTA)
  async updateObra(
    @Param('id') idObra: string,
    @User('perfilId') perfilId: string,
    @Body() updateObraDto: UpdateObraDto,
  ): Promise<ApiResponse> {
    const updateObra = await this.obraService.update(
      idObra,
      perfilId,
      updateObraDto,
    );
    return {
      status: 'success',
      data: updateObra,
      message: 'Obra atualizada com sucesso',
    };
  }

  @Patch(':id/disponibilidade')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Roles(TipoUsuario.ARTISTA)
  async updateAvailability(
    @Param('id') idObra: string,
    @User('perfilId') perfilId: string,
    @Body('disponivel', ParseBoolPipe) disponivel: boolean,
  ): Promise<ApiResponse> {
    await this.obraService.updateAvailability(idObra, perfilId, disponivel);
    return {
      status: 'success',
      message: 'Disponibilidade da obra atualizada com sucesso',
    };
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @Roles(TipoUsuario.ARTISTA)
  async deleteObra(
    @Param('id') idObra: string,
    @User('perfilId') perfilId: string,
  ): Promise<ApiResponse> {
    await this.obraService.delete(idObra, perfilId);
    return {
      status: 'success',
      message: 'Obra deletada com sucesso',
    };
  }
}
