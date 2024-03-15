import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SkillDocument = Skill & Document;


@Schema()
export class Skill {
    @ApiProperty()
    @Prop()
    name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);