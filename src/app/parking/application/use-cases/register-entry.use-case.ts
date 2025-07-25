import { Inject, Injectable } from '@nestjs/common';
import { ParkingRepository } from '../../domain/repositories/parking.repository.interface';
import { PARKING_REPOSITORY } from '../../domain/repositories/parking.repository.token';
import { ParkingRecord } from '../../domain/entities/parking-record.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterEntryUseCase {
  constructor(
    @Inject(PARKING_REPOSITORY)
    private readonly parkingRepo: ParkingRepository,
  ) {}

  async execute(plate: string): Promise<ParkingRecord> {
    const existing = await this.parkingRepo.findByPlate(plate);
    if (existing && existing.isParked()) {
      throw new Error(`El vehículo con placa ${plate} ya está estacionado.`);
    }

    const record = new ParkingRecord(uuidv4(), plate, new Date());
    console.log("🚀 ~ file: register-entry.use-case.ts:21 ~ record:", record)
    await this.parkingRepo.save(record);
    return record;
  }
}
