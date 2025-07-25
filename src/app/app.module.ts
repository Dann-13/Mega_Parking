import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/infrastructure/parking.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/mega_park'),
    ParkingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }