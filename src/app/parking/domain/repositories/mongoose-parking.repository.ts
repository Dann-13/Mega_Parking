import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParkingRepository } from './parking.repository.interface';
import { ParkingRecord } from '../entities/parking-record.entity';
import { ParkingRecordDocument, ParkingRecordDocumentType } from '../../infrastructure/repositories/schemas/parking-record.schema';

@Injectable()
export class MongooseParkingRepository implements ParkingRepository {
  constructor(
    @InjectModel(ParkingRecordDocument.name)
    private readonly model: Model<ParkingRecordDocumentType>,
  ) { }

  async save(record: ParkingRecord): Promise<void> {
    // Busca usando el UUID, no _id
    const existing = await this.model.findOne({ uuid: record.id }).exec();

    if (existing) {
      await this.model.updateOne({ uuid: record.id }, {
        plate: record.plate,
        entryTime: record.entryTime,
        exitTime: record.exitTime,
        createdBy: record.createdBy,
      }).exec();
    } else {
      const newRecord = new this.model({
        uuid: record.id,
        plate: record.plate,
        entryTime: record.entryTime,
        exitTime: record.exitTime,
        createdBy: record.createdBy,
      });
      await newRecord.save();
    }
  }


  async findByPlate(plate: string): Promise<ParkingRecord | null> {
    const doc = await this.model
      .findOne({ plate: plate.toUpperCase(), exitTime: null })
      .exec();

    if (!doc) return null;

    return new ParkingRecord(doc._id.toString(), doc.plate, doc.entryTime, doc.exitTime, doc.createdBy);
  }

  async findById(id: string): Promise<ParkingRecord | null> {
    const doc = await this.model.findById(id).exec();
    if (!doc) return null;

    return new ParkingRecord(doc._id.toString(), doc.plate, doc.entryTime, doc.exitTime, doc.createdBy);

  }

  async getAll(): Promise<ParkingRecord[]> {
    const docs = await this.model.find().exec();
    return docs.map(
      (doc) => new ParkingRecord(doc._id.toString(), doc.plate, doc.entryTime, doc.exitTime, doc.createdBy)

    );
  }
}