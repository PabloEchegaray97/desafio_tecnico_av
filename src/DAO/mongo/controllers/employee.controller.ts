import { Controller, Get, Post, Put, Delete, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../models/employee.schema';

@Controller('employee')
export class EmployeeController {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) { }

    @Get()
    async findAll(): Promise<Employee[]> {
        return this.employeeModel.find().exec();
    }

    @Post()
    async create(@Body() createEmployeeDto: Employee): Promise<Employee> {
        const createdEmployee = new this.employeeModel(createEmployeeDto);
        return createdEmployee.save();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateEmployeeDto: Employee): Promise<Employee> {
        return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true });
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Employee> {
        return this.employeeModel.findByIdAndDelete(id);
    }
}
