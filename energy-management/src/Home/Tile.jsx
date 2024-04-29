import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import '../App.css';

function TileBar() {

    const [EnergyCostMonth, setEnergyCostMonth] = useState(0);
    const [EnergyCostWeek, setEnergyCostWeek] = useState(0);
    const [EnergyCostDay, setEnergyCostDay] = useState(0);

    const [SolarCostMonth, setSolarCostMonth] = useState(0);
    const [SolarCostWeek, setSolarCostWeek] = useState(0);
    const [SolarCostDay, setSolarCostDay] = useState(0);

    return (
        <>
            <div className='flex flex-col justify-items items-center'>
                <div className='grid grid-cols-4 gap-5 m-4 ml-10 mr-10 h-[20vh] w-[98%]'>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-2 text-xs font-bold'>TOTAL ENERGY COST</div>
                            <div className='text-center m-2 text-4xl'>{EnergyCostDay}</div>
                        </div>
                    </div>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-2 text-xs font-bold'>TOTAL ENERGY COST</div>
                            <div className='text-center m-2 text-4xl'>{EnergyCostDay}</div>
                        </div>
                    </div>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-2 text-xs font-bold'>TOTAL SOLAR</div>
                            <div className='text-center m-2 text-4xl'>{EnergyCostDay}</div>
                        </div>
                    </div>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-2 text-xs font-bold'>TOTAL ENERGY COST</div>
                            <div className='text-center m-2 text-4xl'>{EnergyCostDay}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TileBar;
