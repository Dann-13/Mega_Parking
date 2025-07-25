import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterEntryDto } from '../../application/dto/register-entry.dto';
import { RegisterExitDto } from '../../application/dto/register-exit.dto';
import { RegisterEntryUseCase } from '../../application/use-cases/register-entry.use-case';
import { RegisterExitUseCase } from '../../application/use-cases/register-exit.use-case';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('parking')
@Controller('parking')
export class ParkingController {
  constructor(
    private readonly registerEntryUseCase: RegisterEntryUseCase,
    private readonly registerExitUseCase: RegisterExitUseCase,
  ) {}

  @Post('entry')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar entrada de vehículo', description: 'Registra la entrada de un vehículo al parqueo.' })
  @ApiBody({ type: RegisterEntryDto, description: 'Datos del vehículo (placa)' })
  @ApiResponse({ status: 201, description: 'Entrada registrada con éxito.' })
  @ApiResponse({ status: 400, description: 'Placa inválida o vehículo ya estacionado.' })
  async registerEntry(@Body() dto: RegisterEntryDto) {
    const record = await this.registerEntryUseCase.execute(dto.plate);
    return {
      message: 'Entrada registrada',
      data: record,
    };
  }

  @Post('exit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Registrar salida de vehículo', description: 'Registra la salida de un vehículo del parqueo.' })
  @ApiBody({ type: RegisterExitDto, description: 'Placa del vehículo que sale' })
  @ApiResponse({ status: 200, description: 'Salida registrada con éxito.' })
  @ApiResponse({ status: 400, description: 'Placa no encontrada o vehículo ya salió.' })
  async registerExit(@Body() dto: RegisterExitDto) {
    const record = await this.registerExitUseCase.execute(dto.plate);
    return {
      message: 'Salida registrada',
      data: record,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los registros', description: 'Devuelve todos los registros de entrada/salida.' })
  @ApiResponse({ status: 200, description: 'Lista de registros obtenida.' })
  async getAll() {
    return await (this as any).registerEntryUseCase['parkingRepo'].getAll();
  }
}