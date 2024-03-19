import { Controller, Get, Post, Put, Delete, Patch, Body, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.schema';
import { ApiBody } from '@nestjs/swagger';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    async findAll(): Promise<Employee[]> {
        return this.employeeService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Employee> {
        const employee = await this.employeeService.findById(id);
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }
        return employee;
    }

    @Post()
    async create(@Body() createEmployeeDto: Employee): Promise<Employee> {
        const createdEmployee = await this.employeeService.create(createEmployeeDto);
        return createdEmployee;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateEmployeeDto: Employee): Promise<Employee> {
        const updatedEmployee = await this.employeeService.update(id, updateEmployeeDto);
        if (!updatedEmployee) {
            throw new NotFoundException('Employee not found');
        }
        return updatedEmployee;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Employee> {
        const removedEmployee = await this.employeeService.remove(id);
        if (!removedEmployee) {
            throw new NotFoundException('Employee not found');
        }
        return removedEmployee;
    }

    @Patch(':id')
    @ApiBody({ type: Employee })
    async partialUpdate(@Param('id') id: string, @Body() partialEmployeeDto: Partial<Employee>): Promise<Employee> {
        const updatedEmployee = await this.employeeService.partialUpdate(id, partialEmployeeDto);
        if (!updatedEmployee) {
            throw new NotFoundException('Employee not found');
        }
        return updatedEmployee;
    }
    @Get('/email/:email')
    async findByEmail(@Param('email') email: string): Promise<Employee | null> {
        const employee = await this.employeeService.findByEmail(email);
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }
        return employee;
    }
}
