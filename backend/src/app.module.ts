import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './DAO/mongo/controllers/employee.controller';
import { SkillController } from './DAO/mongo/controllers/skill.controller';
import { CareerController } from './DAO/mongo/controllers/career.controller';
import { Employee, EmployeeSchema } from './DAO/mongo/models/employee.schema';
import { Skill, SkillSchema } from './DAO/mongo/models/skill.schema';   
import { Career, CareerSchema } from './DAO/mongo/models/career.schema';
import { config } from 'dotenv';
config();
const MONGO_URI = process.env.MONGO_URI
@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URI),
        MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }, { name: Skill.name, schema: SkillSchema }, {name: Career.name, schema: CareerSchema}]),
    ],
    controllers: [EmployeeController, SkillController, CareerController],
})
export class AppModule {}
