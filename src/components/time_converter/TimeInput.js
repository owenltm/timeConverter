import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './TimeInput.css';

dayjs.extend(utc)
dayjs.extend(timezone)

function TimeInput({index, timeValue, zoneValue, handleChange, handleAddTime}) {
  const [skyRGB, setSkyRGB] = useState("");

  /* const day = [56, 189, 248];
  const night = [12, 74, 110]; */

  useEffect(() => {
    calculateSky(timestampToSlider(timeValue))
  }, [timeValue])

  const onZoneChange = (e) => {
    
  }

  const onTimeChange = (e) => {
    const sliderValue = e.target.value;
    
    handleChange(index, zoneValue, sliderToTimestamp(sliderValue));
  }

  const calculateSky = (slider) => {
    const mid = 1440 / 2;

    //count difference
    let diff = slider - mid;
    if(diff < 0) diff *= -1; //make sure value is positive

    //count percentage of day (00.00 = 100%, 12.00 = 0%)
    let percentage = diff/mid * 100;

    console.log(percentage);

    const baseRGB = [56, 189, 248];
    const rgbDiff = [44, 115, 138];

    //count rgb diff
    const skyRGB = baseRGB.map((val, id) => {
      return val -= percentage/100 * rgbDiff[id];
    })

    setSkyRGB(skyRGB);
  }

  const timestampToSlider = (timestamp) => {
    return (timestamp.hour() * 60) + timestamp.minute()
  }

  const sliderToTimestamp = (slider) => {
    const hour = slider / 1440 * 24;
    const minute = slider % 60;

    return dayjs(timeValue).tz(zoneValue).hour(parseInt(hour)).minute(parseInt(minute));
  }

  return (
    <div className='time-input flex-1 relative'>
      {/* <div className='add-time-btn-container absolute h-full w-full flex justify-between items-center'>
        <div className='add-time-btn-left h-3/4 px-1 -ml-7 flex items-center opacity-0 hover:opacity-100'>
          <button className='p-2 bg-white rounded-full' onClick={() => handleAddTime(index)}>
            <PlusIcon className="h-8 w-8 text-gray-800"/>
          </button>
        </div>
        <div className='add-time-btn-right h-3/4 px-1 -mr-7 flex items-center opacity-0 hover:opacity-100'>
          <button className='p-2 bg-white rounded-full' onClick={() => handleAddTime(index + 1)}>
            <PlusIcon className="h-8 w-8 text-gray-800"/>
          </button>
        </div>
      </div> */}
      <div className='add-time-btn-container absolute h-full flex items-center'>
        <div className='add-time-btn-left h-3/4 px-1 -ml-7 flex items-center opacity-0 hover:opacity-100'>
          <button className='p-2 bg-white rounded-full' onClick={() => handleAddTime(index)}>
            <PlusIcon className="h-8 w-8 text-gray-800"/>
          </button>
        </div>
      </div>
      <div className='add-time-btn-container absolute h-full flex items-center right-0'>
        <div className='add-time-btn-right h-3/4 px-1 -mr-7 flex items-center opacity-0 hover:opacity-100'>
          <button className='p-2 bg-white rounded-full' onClick={() => handleAddTime(index + 1)}>
            <PlusIcon className="h-8 w-8 text-gray-800"/>
          </button>
        </div>
      </div>
      <div className='flex flex-col h-full' style={{ backgroundColor: 'rgb(' + skyRGB[0] + ',' + skyRGB[1]+ ',' + skyRGB[2] + ')' }}>
        <div className='flex justify-center py-4'>
          <input className='p-2 rounded-md text-center' type='text' value={zoneValue} onChange={onZoneChange} />
        </div>
        <div className='flex-1 flex flex-col justify-evenly items-center text-white'>
          {/* <div className='bg-yellow-200 w-1/3 h-20'>
            Sun/Moon Icon
          </div> */}
          <div className='w-3/4'>
            <div className='text-center mb-5'>
              <h1 className='text-3xl'>{timeValue.format('ddd, D MMM YY')}</h1>
              <h2 className='text-5xl font-bold'>{timeValue.format('HH:mm')}</h2>
            </div>
            <input className='text-red-100' type='range' min={0} max={1439} value={timestampToSlider(timeValue)} onChange={onTimeChange}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeInput;