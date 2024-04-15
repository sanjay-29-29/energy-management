import { Line } from 'react-chartjs-2';
import { DataContext } from '../DataContext';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

function EnergyPredictedChart() {

    const firstUpdate = useRef(true);
    const data = useContext(DataContext);
    const [labels, setLabels] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [predictedData, setPredictedData] = useState([]);

    useEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
      
        axios.get('http://127.0.0.1:8000/get_current')
          .then(response => {
            const newData = response.data;
            const newEnergyCost = newData.map(item => item.Total);
            setCurrentData(newEnergyCost);
            setLabels(newLabels);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          });
      
        axios.get('http://127.0.0.1:8000/get_predicted')
          .then(response => {
            const newData = response.data;
            const newEnergyCost = newData.map(item => item.Total);
            const newLabels = newData.map(item => item.Time);
            setPredictedData(newEnergyCost);
            setLabels(newLabels);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          });
      }, []);

    const total_data_chart = {
        labels: labels,
        datasets: [
            {
                label: 'Energy Usage(in kw/h)',
                backgroundColor: 'skyblue',
                borderColor: 'skyblue',
                data: currentData,
            },
            {
                label: 'Predicted Energy Usage(in kw/h)',
                backgroundColor: 'yellow',
                borderColor: 'yellow',
                data: predictedData,
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
                    parser: 'yyyy-MM-dd',
                    unit: 'day',
                    displayFormats: {
                        month: 'dd'
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
            <div className='grid grid-cols-2 h-[20vh] flex items-center justify-center'>
                <div className='col-span- bg-myblack rounded-lg'>
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