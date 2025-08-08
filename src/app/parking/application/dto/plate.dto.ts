import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlateDto {
  @ApiProperty({
    description: 'Placa del vehículo',
    example: 'ABC123',
  })
  @IsString({ message: 'La placa debe ser un texto.' })
  @MinLength(6, { message: 'La placa debe tener al menos 6 caracteres.' })
  @MaxLength(7, { message: 'La placa no debe exceder 7 caracteres.' })
  @Matches(/^[A-Z0-9]{6,7}$/, {
    message: 'La placa debe tener entre 6 y 7 caracteres alfanuméricos en mayúsculas.',
  })
  plate: string;
}
