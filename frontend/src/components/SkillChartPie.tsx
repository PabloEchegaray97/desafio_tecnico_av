import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie';

interface Employee {
    _id: string;
    name: string;
    lastname: string;
    age: number;
    email: string;
    skills: Skill[];
}

interface Skill {
    _id: string;
    name: string;
}

const SkillsStatistics: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesResponse = await axios.get<Employee[]>('http://localhost:3000/employee');
                setEmployees(employeesResponse.data);

                const skillsResponse = await axios.get<Skill[]>('http://localhost:3000/skill');
                setSkills(skillsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calcular datos para el gráfico de torta
    const pieChartData = skills.map(skill => ({
        id: skill.name,
        label: skill.name,
        value: employees.filter(employee => employee.skills.some(eSkill => eSkill._id === skill._id)).length
    }));

    return (
        <div className="statistics">
            <div style={{ height: '400px' }}>
                <ResponsivePie
                    data={pieChartData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'paired' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}

                />
            </div>
        </div>
    );
};

export default SkillsStatistics;
