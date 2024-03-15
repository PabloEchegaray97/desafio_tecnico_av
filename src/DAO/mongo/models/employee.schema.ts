import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
