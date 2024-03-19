import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Prop({ required: true })
    name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
