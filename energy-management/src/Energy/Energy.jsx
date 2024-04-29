import React, { useEffect, useState, useRef, useContext } from 'react';
import { DataContext } from '../DataContext';
import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar'
import EnergyOverviewChart from './EnergyOverviewChart';
import EnergyPieChart from './EnergyPieChart';
import EnergyPredictedChart from './EnergyPredictedChart';
import myImage from '../../assets/image.png';
import 'chartjs-adapter-date-fns';


export default function Energy() {
  const [currentComponent, setCurrentComponent] = useState(<EnergyOverviewChart />);
  const [currentButton, setCurrentButton] = useState('overview');

  const handleClick = (component, button) => {
    setCurrentComponent(component);
    setCurrentButton(button);
  };

  return (
    <>
      <div className="flex flex-row h-screen">
        <VerticalNavbar />
        <div className="flex flex-col w-full h-screen overflow-y-auto">
          <HorizontalNavbar />
          <div className='flex flex-col m-4 rounded-lg px-6'>
            <div className='pb-5 flex items-start font-roboto font-bold text-5xl text-white'>
              <img src={myImage} alt="My Image" className="animate-pulse row-span-2 electricity-hover w-[50px] h-[50px]" />
              Energy
            </div>

            <div className='flex flex-row items-start py-4 pb-4 px-4'>
              <button className={`text-white font-roboto font-bold px-4 rounded-lg m-1 ${currentButton === 'overview' ? 'highlight' : ''}`} onClick={() => handleClick(<EnergyOverviewChart />, 'overview')}>Overview</button>
              <button className={`text-white font-roboto font-bold px-4 rounded-lg m-1 ${currentButton === 'Pie' ? 'highlight' : ''}`} onClick={() => handleClick(<EnergyPieChart />, 'Pie')}>Pie</button>
              <button className={`text-white font-roboto font-bold px-4 rounded-lg m-1 ${currentButton === 'prediction' ? 'highlight' : ''}`} onClick={() => handleClick(<EnergyPredictedChart />, 'prediction')}>Prediction</button>
            </div>
            {currentComponent}
          </div>
        </div>
      </div>
    </>
  );
}