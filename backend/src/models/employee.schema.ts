import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Skill, SkillSchema } from './skill.schema'; 
import { Career, CareerSchema } from './career.schema'

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @ApiProperty()
    @Prop()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @Prop()
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @Prop()
    @IsNotEmpty()
    @IsNumber() 
    age: number;

    @ApiProperty()
    @Prop()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: () => [Skill] })
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Skill' }] })
    @IsArray() 
    @ValidateNested({ each: true })
    @Type(() => Skill)
    skills: Skill[];

    @ApiProperty({ type: () => Career }) 
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Career' }) 
    @ValidateNested()
    @Type(() => Career)
    career: Career; 
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
