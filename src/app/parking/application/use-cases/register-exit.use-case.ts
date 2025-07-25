import { Inject, Injectable } from '@nestjs/common';
import { ParkingRepository } from '../../domain/repositories/parking.repository.interface';
import { PARKING_REPOSITORY } from '../../domain/repositories/parking.repository.token';
import { ParkingRecord } from '../../domain/entities/parking-record.entity';

@Injectable()
export class RegisterExitUseCase {
  constructor(
    @Inject(PARKING_REPOSITORY)
    private readonly parkingRepo: ParkingRepository,
  ) {}

  async execute(plate: string): Promise<ParkingRecord> {
    const record = await this.parkingRepo.findByPlate(plate);
    if (!record) {
      throw new Error(`No se encontró un registro para la placa ${plate}.`);
    }

    if (!record.isParked()) {
      throw new Error(`El vehículo con placa ${plate} ya ha salido.`);
    }

    record.exit();
    await this.parkingRepo.save(record);
    return record;
  }
}
