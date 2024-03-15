import { Controller, Get, Post, Put, Delete, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../models/skill.schema';

@Controller('skill')
export class SkillController {
    constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>) { } 

    @Get()
    async findAll(): Promise<Skill[]> {
        return this.skillModel.find().exec();
    }

    @Post()
    async create(@Body() createSkillDto: Skill): Promise<Skill> {
        const createdSkill = new this.skillModel(createSkillDto);
        return createdSkill.save();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSkillDto: Skill): Promise<Skill> {
        return this.skillModel.findByIdAndUpdate(id, updateSkillDto, { new: true });
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Skill> {
        return this.skillModel.findByIdAndDelete(id);
    }
}