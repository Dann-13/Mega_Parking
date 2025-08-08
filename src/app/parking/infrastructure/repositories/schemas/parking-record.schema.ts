import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'parking_records', timestamps: true })
export class ParkingRecordDocument {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true, uppercase: true })
  plate: string;

  @Prop({ required: true, type: Date })
  entryTime: Date;

  @Prop({ type: Date, default: null })
  exitTime: Date | null;

  @Prop({ required: true })
  createdBy: string;

}

export type ParkingRecordDocumentType = HydratedDocument<ParkingRecordDocument>;

export const ParkingRecordSchema = SchemaFactory.createForClass(ParkingRecordDocument);
