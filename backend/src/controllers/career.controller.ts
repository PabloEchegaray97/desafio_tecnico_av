import { Controller, Get, Post, Put, Delete, Body, Param, Patch, NotFoundException, ConflictException } from '@nestjs/common';
import { CareerService } from '../services/career.service';
import { Career } from '../models/career.schema';
import { ApiBody } from '@nestjs/swagger';

@Controller('career')
export class CareerController {
    constructor(private readonly careerService: CareerService) {}

    @Get()
    async findAll(): Promise<Career[]> {
        return this.careerService.findAll();
    }

    @Get(':name')
    async findByName(@Param('name') name: string): Promise<Career | null> {
        const career = await this.careerService.findByName(name);
        if (!career) {
            throw new NotFoundException('Career not found');
        }
        return career;
    }

    @Post()
    @ApiBody({ schema: { properties: { name: { type: 'string' }, description: { type: 'string' } }, required: ['name', 'description'] } })
    async create(@Body() careerData: { name: string; description: string }): Promise<Career> {
        try {
            return this.careerService.create(careerData);
        } catch (error) {
            throw new ConflictException('Career already exist');
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCareerDto: Career): Promise<Career> {
        const career = await this.careerService.update(id, updateCareerDto);
        if (!career) {
            throw new NotFoundException('Career not found');
        }
        return career;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Career> {
        const career = await this.careerService.remove(id);
        if (!career) {
            throw new NotFoundException('Career not found');
        }
        return career;
    }

    @Patch(':id')
    @ApiBody({ type: Career })
    async partialUpdate(@Param('id') id: string, @Body() partialCareerDto: Partial<Career>): Promise<Career> {
        const career = await this.careerService.partialUpdate(id, partialCareerDto);
        if (!career) {
            throw new NotFoundException('Career not found');
        }
        return career;
    }
}
