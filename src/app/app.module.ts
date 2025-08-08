import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/infrastructure/parking.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://dann-13:36758402@cluster0.xkadxas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ParkingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }