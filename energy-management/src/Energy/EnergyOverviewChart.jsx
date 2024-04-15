import React, { useEffect, useState, useRef, useContext } from 'react';
import { DataContext } from '../DataContext';
import {Chart} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

function EnergyOverviewChart() {
    const data = useContext(DataContext);
    const [labels, setLabels] = useState([]);
    const [SHenergyCost, SHsetEnergyCost] = useState([]);
    const [ECEenergyCost, ECEsetEnergyCost] = useState([]);
    const [CSEenergyCost, CSEsetEnergyCost] = useState([]);
    const [EEEenergyCost, EEEsetEnergyCost] = useState([]);
    const [CTenergyCost, CTsetEnergyCost] = useState([]);
    const [AUTOenergyCost, AUTOsetEnergyCost] = useState([]);
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (data.length > 0) {
            const newSHenergyCost = [...SHenergyCost, data[0]['S&H']].slice(-10);
            const newECEenergyCost = [...ECEenergyCost, data[0]['ECE']].slice(-10);
            const newCSEenergyCost = [...CSEenergyCost, data[0]['CSE']].slice(-10);
            const newEEEenergyCost = [...EEEenergyCost, data[0]['EEE']].slice(-10);
            const newCTenergyCost = [...CTenergyCost, data[0]['CT']].slice(-10);
            const newAUTOenergyCost = [...AUTOenergyCost, data[0]['AUTO']].slice(-10);
            const newLabels = [...labels, data[0]['Time']].slice(-10);

            SHsetEnergyCost(newSHenergyCost);
            ECEsetEnergyCost(newECEenergyCost);
            CSEsetEnergyCost(newCSEenergyCost);
            EEEsetEnergyCost(newEEEenergyCost);
            CTsetEnergyCost(newCTenergyCost);
            AUTOsetEnergyCost(newAUTOenergyCost);
            setLabels(newLabels);
        }
    }, [data]);

    const sh_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'S&H(in kw/h)',
                backgroundColor: 'red',
                borderColor: 'red',
                data: SHenergyCost,
            }
        ]
    };

    const ece_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'ECE(in kw/h)',
                backgroundColor: 'yellow',
                borderColor: 'yellow',
                data: ECEenergyCost,
            }
        ]
    };
    const eee_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'EEE(in kw/h)',
                backgroundColor: 'purple',
                borderColor: 'purple',
                data: EEEenergyCost,
            }
        ]
    };
    const auto_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'AUTO(in kw/h)',
                backgroundColor: 'gray',
                borderColor: 'gray',
                data: AUTOenergyCost,
            }
        ]
    };
    const cse_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'CSE(in kw/h)',
                backgroundColor: 'cyan',
                borderColor: 'cyan',
                data: CSEenergyCost,
            }
        ]
    };
    const ct_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'CT(in kw/h)',
                backgroundColor: 'violet',
                borderColor: 'violet',
                data: CTenergyCost,
            }
        ]
    };

    const options = {
        plugins: {
            decimation: {
                enabled: false,
                algorithm: 'min-max',
            },
        },
        showLines: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: 'yyyy-MM-dd HH:mm:ss',
                    unit: 'hour',
                    displayFormats: {
                        day: 'HH'
                    }
                },
                title: {
                    display: true,
                    text: 'Time'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                }
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
        <>
            <div className='grid grid-rows-2 gap-5'>
                <div className='grid grid-cols-3 gap-2 text-white rounded-lg'>
                    <div className='font-bold font-roboto bg-myblack rounded-lg flex justify-center'>
                        <Line data={sh_data_chart} options={options} />
                    </div>
                    <div className='font-bold font-roboto bg-myblack rounded-lg flex justify-center'>
                        <Line data={ece_data_chart} options={options} />
                    </div>
                    <div className='font-bold font-roboto bg-myblack rounded-lg flex justify-center'>
                        <Line data={eee_data_chart} options={options} />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-2 text-white rounded-lg '>
                    <div className='font-bold font-roboto bg-myblack rounded-lg flex justify-center'>
                        <Line data={auto_data_chart} options={options} />
                    </div>
                    <div className='font-bold font-roboto bg-myblack rounded-lg flex justify-center'>
                        <Line data={cse_data_chart} options={options} />
                    </div>
                    <div className='font-bold font-roboto bg-myblack rounded-lg flex justify-center'>
                        <Line data={ct_data_chart} options={options} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnergyOverviewChart;