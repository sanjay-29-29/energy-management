import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { supabase } from '../Database/db';


function ChartPlot({ dept, interval, color }) {

    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [energyCost, setEnergyCost] = useState([]);

    const today = '2024-04-26';
    const sevenDaysAgo = '2024-04-19';
    const threeMonthsAgo = '2024-01-26';
    const oneMonthAgo = '2024-03-26';

    useEffect(() => {
        async function fetchData() {
            const TimeInterval = {
                "Past Week": "2024-04-19",
                "Past 3 Months": "2024-01-26",
                "Past Month": "2024-03-26",
            };

            console.log(TimeInterval[interval]);

            const { data: totalenergy, error } = await supabase
                .from('totalenergycost')
                .select(`Date,${dept}`)
                .gte('Date', TimeInterval[interval])
                .lte('Date', today);

            if (error) {
                console.error('Error fetching data:', error);
            } else if (totalenergy) {
                const parsedData = totalenergy.map(item => ({
                    ...item,
                    Date: new Date(item.Date),
                }));

                setData(parsedData);
            }
        }

        fetchData();
    }, [dept, interval]);

    useEffect(() => {
        if (data && data.length > 0) {
            const labels = data.map((item) => item.Date);
            const energyCost = data.map((item) => item[dept]);

            setLabels(labels);
            setEnergyCost(energyCost);
        }
    }, [data]);

    const data_chart = {
        labels: labels,
        datasets: [
            {
                label: dept + " " + '(in kw/h)',
                backgroundColor: color,
                borderColor: color,
                data: energyCost,
            }
        ]
    };
    const options = {
        showLines: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: 'yyyy-MM-dd',
                    unit: 'day',
                    displayFormats: {
                        day: 'dd/MM/yyyy'
                    },
                },
                title: {
                    display: true,
                    text: 'Time'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Energy Usage(in kw/h)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 1
                }
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-[60vh] w-[50vw]'>
            <Line data={data_chart} options={options} />
        </div>
    );
}

function EnergyOverviewChart() {
    const [dept, setDept] = useState('East_Campus');
    const [interval, setInterval] = useState('Past Week');

    const deptColors = {
        "East_Campus": "blue",
        "MBA_MCA": "green",
        "Civil_Block": "red",
        "Mech": "yellow",
        "Auto": "purple"
    };

    return (
        <>
            <div className='flex'>
                <div className='flex flex-col m-2'>
                    <div className='text-white font-bold bg-black ml-1 mb-1'>Department</div>
                    <select value={dept} onChange={(event) => setDept(event.target.value)} className='text-white bg-black w-64'>
                        {Object.keys(deptColors).map((deptName) => (
                            <option key={deptName} value={deptName}>
                                {deptName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col m-2'>
                    <div className='text-white font-bold bg-black  ml-1 mb-1'>Interval</div>
                    <select value={interval} onChange={(event) => setInterval(event.target.value)} className='text-white bg-black w-64'>
                        {['Past Week', 'Past Month', 'Past 3 Months'].map((intervalName) => (
                            <option key={intervalName} value={intervalName}>
                                {intervalName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <div className=''>
                    <ChartPlot dept={dept} interval={interval} color={deptColors[dept]} />
                </div>
            </div>
        </>
    );
}

export default EnergyOverviewChart;
