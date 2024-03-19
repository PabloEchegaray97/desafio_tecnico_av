import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../models/skill.schema';

@Injectable()
export class SkillService {
    constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>) {}

    async findAll(): Promise<Skill[]> {
        return this.skillModel.find().exec();
    }

    async findById(id: string): Promise<Skill | null> {
        return this.skillModel.findById(id).exec();
    }

    async findByName(name: string): Promise<Skill | null> {
        return this.skillModel.findOne({ name }).exec();
    }

    async create(name: string): Promise<Skill> {
        const newSkill = new this.skillModel({ name });
        return newSkill.save();
    }

    async update(id: string, updatedSkill: Skill): Promise<Skill> {
        return this.skillModel.findByIdAndUpdate(id, updatedSkill, { new: true });
    }

    async remove(id: string): Promise<Skill> {
        return this.skillModel.findByIdAndDelete(id);
    }

    async partialUpdate(id: string, partialSkill: Partial<Skill>): Promise<Skill> {
        return this.skillModel.findByIdAndUpdate(id, { $set: partialSkill }, { new: true });
    }
}
