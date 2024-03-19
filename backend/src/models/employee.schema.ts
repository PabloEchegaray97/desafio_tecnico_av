import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Skill, SkillSchema } from './skill.schema'; 
import { Career, CareerSchema } from './career.schema'

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Prop({ required: true })
    lastname: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Prop({ required: true })
    age: number;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @Prop({ required: true })
    email: string;

    @ApiProperty({ type: () => [Skill] })
    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Skill)
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Skill' }] })
    skills: Skill[];

    @ApiProperty({ type: () => Career }) 
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Career)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Career' }) 
    career: Career; 
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
