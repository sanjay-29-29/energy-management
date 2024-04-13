import { Line } from 'react-chartjs-2';
import { DataContext } from '../DataContext';
import { useContext, useState, useEffect, useRef } from 'react';

function EnergyPredictedChart() {

    const data = useContext(DataContext);
    const [energyCost, setEnergyCost] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
          const newEnergyCost = [...energyCost, data[0].Total].slice(-10);
          const newLabels = [...labels, data[0].Time].slice(-10);
          setEnergyCost(newEnergyCost);
          setLabels(newLabels);
        }
      }, [data]);

      const total_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'Energy Usage(in kw/h)',
                backgroundColor: 'skyblue',
                borderColor: 'skyblue',
                data: energyCost,
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
            <div className='grid grid-cols-2 h-[60vh] gap-4'>
                <div className='bg-myblack rounded-lg'>
                    <div className='font-roboto font-bold text-4xl text-white px-4 py-4'>
                        Total Energy Usage
                    </div>
                        <Line data={total_data_chart} options={options} />
                </div>
                <div className='bg-myblack rounded-lg'>
                    <div className='font-roboto font-bold text-4xl text-white px-4 py-4'>
                        Predicted Energy Usage
                    </div>
                    <Line data={total_data_chart} options={options} />
                </div>
            </div>
        </>
    )
}

export default EnergyPredictedChart;