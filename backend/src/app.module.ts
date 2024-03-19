import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './controllers/employee.controller';
import { SkillController } from './controllers/skill.controller';
import { CareerController } from './controllers/career.controller';
import { Employee, EmployeeSchema } from './models/employee.schema';
import { Skill, SkillSchema } from './models/skill.schema';   
import { Career, CareerSchema } from './models/career.schema';
import { EmployeeService } from './services/employee.service';
import { SkillService } from './services/skill.service';
import { CareerService } from './services/career.service';
import { config } from 'dotenv';

config();
const MONGO_URI = process.env.MONGO_URI;

@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URI),
        MongooseModule.forFeature([
            { name: Employee.name, schema: EmployeeSchema },
            { name: Skill.name, schema: SkillSchema },
            { name: Career.name, schema: CareerSchema }
        ]),
    ],
    controllers: [EmployeeController, SkillController, CareerController],
    providers: [EmployeeService, SkillService, CareerService],
})
export class AppModule {}
