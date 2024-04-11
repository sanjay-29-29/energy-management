import { useContext, useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DataContext } from '../DataContext';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

function ChartTest() {
  const data = useContext(DataContext);
  const [labels, setLabels] = useState([]);
  const [energyCost, setEnergyCost] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const newEnergyCost = data.map(item => item.Total);
      const newLabels = data.map(item => item.Time);
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
  
      // Update the chart
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
            {
                label : 'Water Cost',
                backgroundColor: 'blue',
                borderColor: 'blue',
                data: [0, 5, 10, 15, 20, 25, 30]
            },
            {
                label : 'Solar',
                backgroundColor: 'green',
                borderColor: 'green',
                data: [0, 5, 10, 15, 25, 25, 30]
            }
        ]
    };

    const options = {
        showLines: true,
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'yyyy-MM-dd HH:mm:ss',
              unit: 'second',
              displayFormats: {
                minute: 'HH mm'
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