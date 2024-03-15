import { Controller, Get, Post, Put, Delete, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Career, CareerDocument } from '../models/career.schema';

@Controller('career')
export class CareerController {
    constructor(@InjectModel(Career.name) private careerModel: Model<CareerDocument>) {}

    @Get()
    async findAll(): Promise<Career[]> {
        return this.careerModel.find().exec();
    }

    @Post()
    async create(@Body() createCareerDto: Career): Promise<Career> {
        const createdCareer = new this.careerModel(createCareerDto);
        return createdCareer;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCareerDto: Career): Promise<Career> {
        return this.careerModel.findByIdAndUpdate(id, updateCareerDto, {new: true});
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Career> {
        return this.careerModel.findByIdAndDelete(id);
    }
}

