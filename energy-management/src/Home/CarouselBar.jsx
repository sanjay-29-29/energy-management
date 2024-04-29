import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import myImage from '../../assets/image.png';
import Sun from '../../assets/sun.png';
import ChartTest from './ChartTest';
import SolarChart from './SolarChart';
import '../App.css';

function CarouselBar() {

    const [EnergyCostMonth, setEnergyCostMonth] = useState(0);
    const [EnergyCostWeek, setEnergyCostWeek] = useState(0);
    const [EnergyCostDay, setEnergyCostDay] = useState(0);

    const [SolarCostMonth, setSolarCostMonth] = useState(0);
    const [SolarCostWeek, setSolarCostWeek] = useState(0);
    const [SolarCostDay, setSolarCostDay] = useState(0);

    return (
        <>
            <div className='flex flex-col'>
                <div className='m-4 grid grid-cols-2'>
                    <div className="p-3 grid grid-cols-3 bg-myblack rounded-md m-2 h-full">
                        <div className="col-span-3 font-bold text-white text-4xl pl-4 pt-4 pb-4">Energy Cost</div>
                        <img src={myImage} alt="My Image" className="animate-pulse row-span-2 electricity-hover" />
                        <div className='px-2 text-white text-2xl  font-bold'>
                            <div >This Month</div>
                            <div>Rs.{EnergyCostMonth}</div>
                        </div>
                        <div className='px-2 text-white text-2xl font-bold'>
                            <div >This Week</div>
                            <div>Rs. {EnergyCostWeek}</div>
                        </div>
                        <div className='px-2 text-white text-2xl font-bold'>
                            <div >This Day</div>
                            <div>Rs. {EnergyCostDay} </div>
                        </div>
                        <div className='px-2 text-white text-2xl font-bold'>
                            <div >Total Cost</div>
                            <div>$0.00M</div>
                        </div>
                    <div className='rounded-lg bg-black col-span-3 w-full'>
                    <ChartTest />
                    </div>
                    </div>

                    <div className="p-3 grid grid-cols-3 bg-myblack rounded-md m-2 h-full">
                        <div className="col-span-3 font-bold text-white text-4xl pl-4 pt-4 pb-4">Solar</div>
                        <img src={Sun} alt="My Image" className="animate-spin-slow row-span-2" />
                        <div className='px-2 text-white text-2xl font-bold'>
                            <div>This Month</div>
                            <div >Rs.{SolarCostMonth}</div>
                        </div>
                        <div className='px-2 text-white text-2xl font-bold'>
                            <div >This Month</div>
                            <div>$0.00M</div>
                        </div>
                        <div className='px-2 text-white text-2xl  font-bold'>
                            <div >This Year</div>
                            <div>$0.00M</div>
                        </div>
                        <div className='px-2 text-white text-2xl  font-bold'>
                            <div >Total Cost</div>
                            <div>$0.00M</div>
                        </div>
                        <div className='rounded-lg bg-black col-span-3 w-full'>
                        <SolarChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarouselBar;
