import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../models/employee.schema';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

    async findAll(): Promise<Employee[]> {
        return this.employeeModel.find().populate('skills').populate('career').exec();
    }

    async findById(id: string): Promise<Employee> {
        const employee = await this.employeeModel.findById(id).populate('skills').populate('career').exec();
        if (!employee) {
            throw new NotFoundException('Empleado no encontrado');
        }
        return employee;
    }

    async create(newEmployee: Employee): Promise<Employee> {
        const createdEmployee = new this.employeeModel(newEmployee);
        return createdEmployee.save();
    }

    async update(id: string, updatedEmployee: Employee): Promise<Employee> {
        return this.employeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true });
    }

    async remove(id: string): Promise<Employee> {
        return this.employeeModel.findByIdAndDelete(id);
    }

    async partialUpdate(id: string, partialEmployee: Partial<Employee>): Promise<Employee> {
        const existingEmployee = await this.employeeModel.findByIdAndUpdate(
            { _id: id },
            { $set: partialEmployee },
            { new: true }
        );

        if (!existingEmployee) {
            throw new NotFoundException('Empleado no encontrado');
        }

        return existingEmployee;
    }
    
    async findByEmail(email: string): Promise<Employee | null> {
        return this.employeeModel.findOne({ email }).exec();
    }
}