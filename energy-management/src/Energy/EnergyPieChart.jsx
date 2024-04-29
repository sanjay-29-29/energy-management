import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../DataContext';
import { Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from 'date-fns/locale/en-GB';
import '../index.css';

registerLocale('en-GB', enGB);

function EnergyPieChart() {

  const context_data = useContext(DataContext);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);


  const [dept, setDept] = useState('East_Campus');
  const [interval, setInterval] = useState('Past Week');
  const [SHenergyCost, SHsetEnergyCost] = useState(0);
  const [ECEenergyCost, ECEsetEnergyCost] = useState(0);
  const [CSEenergyCost, CSEsetEnergyCost] = useState(0);
  const [EEEenergyCost, EEEsetEnergyCost] = useState(0);
  const [CTenergyCost, CTsetEnergyCost] = useState(0);
  const [AUTOenergyCost, AUTOsetEnergyCost] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const TimeInterval = {
        "Past Week": "2024-04-19",
        "Past 3 Months": "2024-01-26",
        "Past Month": "2024-03-26",
      };

      console.log(TimeInterval[interval]);

      const { data: totalenergy, error } = await supabase
        .from('totalsolarcost')
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


  const data = {
    labels: [
      'S&H',
      'ECE',
      'CSE',
      'EEE',
      'CT',
      'AUTO'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      hoverOffset: 4
    }]
  };


  const config = {
    type: 'doughnut',
    data: data,
  };


  const deptColors = {
    "East_Campus": "blue",
    "MBA_MCA": "green",
    "Civil_Block": "red",
    "Mech": "yellow",
    "Auto": "purple"
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className='text-white font-bold bg-black mb-2'>Select Date</div>
        <DatePicker
          className='text-white bg-black w-64 border border-white rounded-lg p-2'
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd-MM-yyyy"
          locale="en-GB"
          popperPlacement="bottom-start"
        />
      </div>

        <div className='flex p-4 rounded-lg items-center justify-center h-[50vh] w-[50vw]'>
          <Pie data={data} />
        </div>
    

    </>
  );
}

export default EnergyPieChart;