import { Controller, Get, Post, Put, Delete, Patch, Body, Param, NotFoundException, ConflictException } from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { Skill } from '../models/skill.schema';
import { ApiBody } from '@nestjs/swagger';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Get()
    async findAll(): Promise<Skill[]> {
        return this.skillService.findAll();
    }

    @Get(':name')
    async findByName(@Param('name') name: string): Promise<Skill> {
        const skill = await this.skillService.findByName(name);
        if (!skill) {
            throw new NotFoundException('Skill not found');
        }
        return skill;
    }

    @Post()
    @ApiBody({ schema: { properties: { name: { type: 'string' } }, required: ['name'] } })
    async create(@Body('name') name: string): Promise<Skill> {
        const existingSkill = await this.skillService.findByName(name);
        if (existingSkill) {
            throw new ConflictException('Skill already exist');
        }
        return this.skillService.create(name);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSkillDto: Skill): Promise<Skill> {
        const existingSkill = await this.skillService.findById(id);
        if (!existingSkill) {
            throw new NotFoundException('Skill not found');
        }
        return this.skillService.update(id, updateSkillDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Skill> {
        const existingSkill = await this.skillService.findById(id);
        if (!existingSkill) {
            throw new NotFoundException('Skill not found');
        }
        return this.skillService.remove(id);
    }

    @Patch(':id')
    async partialUpdate(@Param('id') id: string, @Body() partialSkillDto: Partial<Skill>): Promise<Skill> {
        const existingSkill = await this.skillService.findById(id);
        if (!existingSkill) {
            throw new NotFoundException('Skill not found');
        }
        return this.skillService.partialUpdate(id, partialSkillDto);
    }
}
