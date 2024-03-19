import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Career, CareerDocument } from '../models/career.schema';

@Injectable()
export class CareerService {
    constructor(@InjectModel(Career.name) private careerModel: Model<CareerDocument>) {}

    async findAll(): Promise<Career[]> {
        return this.careerModel.find().exec();
    }

    async findByName(name: string): Promise<Career | null> {
        return this.careerModel.findOne({ name }).exec();
    }

    async create(careerData: { name: string; description: string }): Promise<Career> {
        const { name, description } = careerData;
        const createdCareer = new this.careerModel({ name, description });
        return createdCareer.save();
    }

    async update(id: string, updatedCareer: Career): Promise<Career> {
        return this.careerModel.findByIdAndUpdate(id, updatedCareer, { new: true });
    }

    async remove(id: string): Promise<Career> {
        return this.careerModel.findByIdAndDelete(id);
    }
    
    async partialUpdate(id: string, partialCareerDto: Partial<Career>): Promise<Career> {
        const existingCareer = await this.careerModel.findByIdAndUpdate(id, { $set: partialCareerDto }, { new: true });

        if (!existingCareer) {
            throw new NotFoundException('Carrera no encontrada');
        }

        return existingCareer;
    }
}
