import { ParkingRecord } from '../entities/parking-record.entity';

export interface ParkingRepository {
  save(record: ParkingRecord): Promise<void>;
  findByPlate(plate: string): Promise<ParkingRecord | null>;
  findById(id: string): Promise<ParkingRecord | null>;
  getAll(): Promise<ParkingRecord[]>;
}