import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ObraRepository } from './obra.repository';
import { CreateObraDto } from './dto/create-obra.dto';
import { ObraMapper } from './mappers/obra.mapper';
import { ObraResponseDto } from './dto/obra-response.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Injectable()
export class ObraService {
  constructor(private readonly obraRepository: ObraRepository) {}

  async getObraDetails(idObra: string) {
    const obraData = await this.obraRepository.getObraDetails(idObra);
    if(!obraData) throw new NotFoundException('Obra não encontrada');
    return ObraMapper.toObraDetailsResponseDto(obraData);
  }

  async create(
    artistaId: string,
    createObraDto: CreateObraDto,
  ): Promise<ObraResponseDto> {
    const obraData = ObraMapper.toObraData(artistaId, createObraDto);
    const newObra = await this.obraRepository.create(obraData);
    return ObraMapper.toResponse(newObra);
  }

  async update(
    idObra: string,
    perfilId: string,
    updateObraDto: UpdateObraDto,
  ): Promise<ObraResponseDto> {
    const obra = await this.obraRepository.getObraById(idObra);

    if (!obra) throw new NotFoundException('Obra não encontrada');
    if (obra.idArtista !== perfilId)
      throw new ForbiddenException('Você não pode editar essa obra');

    const updateObra = await this.obraRepository.update(idObra, updateObraDto);

    return ObraMapper.toResponse(updateObra);
  }

  async updateAvailability(
    idObra: string,
    perfilId: string,
    availability: boolean,
  ) {
    const obra = await this.obraRepository.getObraById(idObra);

    if (!obra) throw new NotFoundException('Obra não encontrada');
    if (obra.idArtista !== perfilId)
      throw new ForbiddenException('Você não pode editar essa obra');

    const updateObra = await this.obraRepository.updateAvailability(
      idObra,
      availability,
    );

    return ObraMapper.toResponse(updateObra);
  }

  async delete(idObra: string, perfilId: string): Promise<void> {
    const obra = await this.obraRepository.getObraById(idObra);

    if (!obra) throw new NotFoundException('Obra não encontrada');
    if (obra.idArtista !== perfilId)
      throw new ForbiddenException('Você não pode deletar essa obra');

    await this.obraRepository.delete(idObra);
  }
}
