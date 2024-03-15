import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CareerDocument = Career & Document;


@Schema()
export class Career {
    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    description: string;

}

export const CareerSchema = SchemaFactory.createForClass(Career)