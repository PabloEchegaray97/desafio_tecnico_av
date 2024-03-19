import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export type CareerDocument = Career & Document;

@Schema()
export class Career {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Prop({ required: true })
    description: string;
}

export const CareerSchema = SchemaFactory.createForClass(Career);
