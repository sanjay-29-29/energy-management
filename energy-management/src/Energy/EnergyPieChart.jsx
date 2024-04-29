import React, { useEffect, useState, useRef, useContext } from 'react';
import { DataContext } from '../DataContext';
import { Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';


function EnergyPieChart() {

  const context_data = useContext(DataContext);
  
  const [SHenergyCost, SHsetEnergyCost] = useState();
  const [ECEenergyCost, ECEsetEnergyCost] = useState();
  const [CSEenergyCost, CSEsetEnergyCost] = useState();
  const [EEEenergyCost, EEEsetEnergyCost] = useState();
  const [CTenergyCost, CTsetEnergyCost] = useState();
  const [AUTOenergyCost, AUTOsetEnergyCost] = useState();

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
      data: [SHenergyCost, ECEenergyCost, CSEenergyCost, EEEenergyCost, CTenergyCost, AUTOenergyCost],
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

  return (
    <>
      <div className='m-1 text-white  font-bold font-roboto'>
        Energy Overview
        <div className='flex p-4 rounded-lg bg-myblack items-center justify-center h-[50vh] w-[50vw]'>
          <Pie data={data} />
        </div>
      </div>

    </>
  );
}

export default EnergyPieChart;