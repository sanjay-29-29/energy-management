import { useContext, useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DataContext } from '../DataContext';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';

function ChartTest() {
  const data = useContext(DataContext);
  const [labels, setLabels] = useState([]);
  const [energyCost, setEnergyCost] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const newEnergyCost = [...energyCost, data[0].Total].slice(-10);
      const newLabels = [...labels, data[0].Time].slice(-10);
      setEnergyCost(newEnergyCost);
      setLabels(newLabels);
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      const chartInstance = chartRef.current.chartInstance;

      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = energyCost;
  
      chartInstance.options.scales.x.time.min = labels.length > 10 ? labels[labels.length - 10] : labels[0];
      chartInstance.options.scales.x.time.max = labels[labels.length - 1];
  
      chartInstance.update();
    }
  }, [labels, energyCost]);

  const data_chart = {
    labels: labels,
    datasets: [
      {
        label: 'Energy Usage(in kw/h)',
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        data: energyCost,
      },
        ]
    };

    const options = {
        showLines: true,
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'yyyy-MM-dd HH:mm:ss',
              unit: 'hour',
              displayFormats: {
                day: 'HH'
              },
              min: labels.length > 10 ? labels[labels.length - 10] : labels[0],
              max: labels[labels.length - 1],
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
        
        <div className='h-full w-full font-bold font-roboto'>
            <Line ref={chartRef} data={data_chart} options={options} />
        </div>
    );
}

export default ChartTest;