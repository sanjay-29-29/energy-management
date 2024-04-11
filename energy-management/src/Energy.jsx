import React, { useEffect, useState, useRef, useContext } from 'react';
import { DataContext } from './DataContext';
import VerticalNavbar from './components/VerticalNavbar';
import HorizontalNavbar from './components/HorizontalNavbar';
import myImage from '../assets/image.png';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

function drop_first_element(arr) {
    var a = delete arr[0];
    return a 
}

export default function Energy() {

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
      
        if (data.length > 1) {
          const SHnewEnergyCost = [];
          const ECEnewEnergyCost = [];
          const CSEnewEnergyCost = [];
          const EEEnewEnergyCost = [];
          const AUTOnewEnergyCost = [];
          const CTnewEnergyCost = [];
          const newLabels = [];
      
          for (let i = 1; i < data.length; i++) {
            SHnewEnergyCost.push(data[i]['S&H']);
            ECEnewEnergyCost.push(data[i].ECE);
            CSEnewEnergyCost.push(data[i].CSE);
            EEEnewEnergyCost.push(data[i].EEE);
            AUTOnewEnergyCost.push(data[i].AUTO);
            CTnewEnergyCost.push(data[i].CT);
            newLabels.push(data[i].Time);
          }
          
            SHsetEnergyCost();
            ECEsetEnergyCost(ECEnewEnergyCost);
            CSEsetEnergyCost(CSEnewEnergyCost);
            EEEsetEnergyCost(EEEnewEnergyCost);
            AUTOsetEnergyCost(AUTOnewEnergyCost);
            CTsetEnergyCost(CTnewEnergyCost);
            setLabels(newLabels);
        }
    },[data]);

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
                label: 'S&H(in kw/h)',
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
                label: 'S&H(in kw/h)',
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
                label: 'S&H(in kw/h)',
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
                label: 'S&H(in kw/h)',
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
                label: 'S&H(in kw/h)',
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
                    unit: 'second',
                    displayFormats: {
                        minute: 'HH mm'
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
            <div className="flex flex-row overflow-hidden h-screen">
                <VerticalNavbar />
                <div className="flex flex-col w-full overflow-y-auto">
                    <HorizontalNavbar />
                    <div className='flex flex-col m-4 rounded-lg px-6'>
                        <div className='pb-5 flex items-start font-roboto font-bold text-5xl text-white'>
                            <img src={myImage} alt="My Image" className="animate-pulse row-span-2 electricity-hover w-[50px] h-[50px]" />
                            Energy
                        </div>
                        <div className='grid grid-rows-2 gap-2'>
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
                    </div>
                </div>
            </div>
        </>
    );
}