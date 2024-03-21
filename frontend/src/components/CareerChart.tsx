import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import { Employee } from '../types/types';

const CareerStatistics: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [careers, setCareers] = useState<string[]>([]);
    const chartRefBar = useRef<HTMLDivElement>(null);
    const chartRefPie = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesResponse = await axios.get<Employee[]>('http://localhost:3000/employee');
                setEmployees(employeesResponse.data);
                const uniqueCareers = Array.from(new Set(employeesResponse.data.map(employee => employee.career?.name || '')));
                setCareers(uniqueCareers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleGeneratePDF = async () => {
        if (chartRefBar.current && chartRefPie.current) {
            const chartCanvasBar = await html2canvas(chartRefBar.current);
            const chartCanvasPie = await html2canvas(chartRefPie.current);

            const doc = new jsPDF();
            const imgDataBar = chartCanvasBar.toDataURL('image/jpeg', 1.0);
            const imgDataPie = chartCanvasPie.toDataURL('image/jpeg', 1.0);

            doc.addImage(imgDataBar, 'JPEG', 10, 20, 180, 100);
            doc.addImage(imgDataPie, 'JPEG', 10, 130, 180, 100);

            const totalEmployees = employees.length;
            doc.text(`Total de empleados: ${totalEmployees}`, 10, 250);

            doc.save('career_statistics.pdf');
        }
    };

    const barChartData = careers.map(career => ({
        career,
        empleados: employees.filter(employee => employee.career?.name === career).length
    }));

    const pieChartData = careers.map(career => ({
        id: career,
        label: career,
        value: employees.filter(employee => employee.career?.name === career).length
    }));

    return (
        <div className='flex-column'>
            <div className='w100 d-flex'>
                <div className="statistics">
                    <div style={{ height: '400px' }} ref={chartRefBar}>
                        <ResponsiveBar
                            data={barChartData}
                            keys={['empleados']}
                            indexBy="career"
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
                                tickValues: [1, 2, 3, 4] // Especificar los valores del eje y
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
                <div className="statistics">
                    <div style={{ height: '400px' }} ref={chartRefPie}>
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

            </div>
            <Button variant='contained' onClick={handleGeneratePDF} sx={{ width: '10rem' }}>Generar PDF</Button>
        </div>
    );
};

export default CareerStatistics;
