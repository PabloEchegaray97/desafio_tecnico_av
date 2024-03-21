import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import { Skill, Employee } from '../types/types';

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

    const getEmployeesCountBySkill = (skillId: string) => {
        return employees.filter(employee => employee.skills.some(eSkill => eSkill._id === skillId)).length;
    };

    const barChartData = skills.map(skill => ({
        skill: skill.name,
        empleados: getEmployeesCountBySkill(skill._id)
    }));

    return (
        <div className="statistics">
            <div style={{ height: '400px' }}>
                <ResponsiveBar
                    data={barChartData}
                    keys={['empleados']}
                    indexBy="skill"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: 'paired' }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Empleados',
                        legendPosition: 'middle',
                        legendOffset: -40,
                        tickValues: [1, 2, 3, 4] 
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'top-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default SkillsStatistics;
