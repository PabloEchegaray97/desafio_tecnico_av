import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface Employee {
    _id: string;
    name: string;
    lastname: string;
    age: number;
    email: string;

}
const EmployeeCount: React.FC = () => {
    const [currentCount, setCurrentCount] = useState<number>(0);
    const [targetCount, setTargetCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Employee[]>('http://localhost:3000/employee');
                const employees = response.data;
                setTargetCount(employees.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentCount < targetCount) {
                setCurrentCount(currentCount + 1);
            } else {
                clearInterval(interval);
            }
        }, 100); 

        return () => clearInterval(interval);
    }, [currentCount, targetCount]);

    return (
        <div className="employee-count m-top">
            <h2>Total de Empleados</h2>
            <p className="count">{currentCount}</p>
        </div>
    );
};

export default EmployeeCount;
