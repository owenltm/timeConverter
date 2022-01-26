import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

function TimeInput({index, timeValue, zoneValue, handleChange}) {
  const onZoneChange = (e) => {
    
  }

  const onTimeChange = (e) => {
    const sliderValue = e.target.value
    
    handleChange(index, zoneValue, sliderToTimestamp(sliderValue));
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
    <div className='flex-1 flex flex-col bg-blue-400'>
      <div className='flex justify-center py-4'>
        <input className='p-2 rounded-md text-center' type='text' value={zoneValue} onChange={onZoneChange} />
      </div>
      <div className='flex-1 flex flex-col justify-evenly items-center text-white'>
        {/* <div className='bg-yellow-200 w-1/3 h-20'>
          Icon
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
  );
}

export default TimeInput;