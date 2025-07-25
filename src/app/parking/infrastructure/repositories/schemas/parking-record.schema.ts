import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'parking_records', timestamps: true })
export class ParkingRecordDocument {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true, uppercase: true, match: /^[A-Z]{3}\d{3}$/ })
  plate: string;

  @Prop({ required: true, type: Date })
  entryTime: Date;

  @Prop({ type: Date, default: null })
  exitTime: Date | null;
}

export type ParkingRecordDocumentType = HydratedDocument<ParkingRecordDocument>;

export const ParkingRecordSchema = SchemaFactory.createForClass(ParkingRecordDocument);
