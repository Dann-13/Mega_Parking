import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { RegisterEntryUseCase } from '../application/use-cases/register-entry.use-case';
import { RegisterExitUseCase } from '../application/use-cases/register-exit.use-case';
import { PARKING_REPOSITORY } from '../domain/repositories/parking.repository.token';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingRecordDocument, ParkingRecordSchema } from './repositories/schemas/parking-record.schema';
import { MongooseParkingRepository } from '../domain/repositories/mongoose-parking.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingRecordDocument.name, schema: ParkingRecordSchema },
    ]),
  ],
  controllers: [ParkingController],
  providers: [
    RegisterEntryUseCase,
    RegisterExitUseCase,
    {
      provide: PARKING_REPOSITORY,
      useClass: MongooseParkingRepository,
    },
  ],
  exports: [RegisterEntryUseCase, RegisterExitUseCase],
})
export class ParkingModule {}
