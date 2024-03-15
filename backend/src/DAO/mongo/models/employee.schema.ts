import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Skill, SkillSchema } from './skill.schema'; 
import { Career, CareerSchema } from './career.schema'

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    lastname: string;

    @ApiProperty()
    @Prop()
    age: number;

    @ApiProperty()
    @Prop()
    email: string;

    @ApiProperty({ type: () => [Skill] })
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Skill' }] })
    skills: Skill[];

    @ApiProperty({ type: () => Career }) 
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Career' }) 
    career: Career; 
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
