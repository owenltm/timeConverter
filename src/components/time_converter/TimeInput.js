import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

function TimeInput({index, timeValue, timezoneValue, handleChange}) {
  const [hourLbl, setHourLbl] = useState("12");
  const [minLbl, setMinLbl] = useState("00");

  useEffect(() => {
    //console.log(dayjs().tz(timezoneValue).format());
  }, []);

  useEffect(() => {
    //convert slider to 24hrs value

    const newTimeValue = timeValue % 1440;

    const hour = newTimeValue / 1440 * 24;
    const minute = newTimeValue % 60;

    setHourLbl(parseInt(hour) < 10 ? '0' + parseInt(hour) : parseInt(hour));
    setMinLbl(parseInt(minute) < 10 ? '0' + parseInt(minute) : parseInt(minute));
  }, [timeValue]);

  const onZoneChange = (e) => {
    
  }

  const onTimeChange = (e) => {
    handleChange(index, timezoneValue, e.target.value);
  }

  return (
    <div className='flex-1 flex flex-col bg-blue-400'>
      <div className='flex justify-center py-4'>
        <input className='p-2 rounded-md text-center' type='text' value={timezoneValue} onChange={onZoneChange} />
      </div>
      <div className='flex-1 flex flex-col justify-evenly items-center text-white'>
        {/* <div className='bg-yellow-200 w-1/3 h-20'>
          Icon
        </div> */}
        <div className='w-3/4'>
          <div className='text-center mb-5'>
            {/* <h1 className='text-3xl'>Mon, 24 Jan 2022</h1> */}
            <h2 className='text-5xl font-bold'>{hourLbl}:{minLbl}</h2>
          </div>
          <input className='text-red-100' type='range' min={0} max={1439} value={timeValue % 1440} onChange={onTimeChange}/>
        </div>
      </div>
    </div>
  );
}

export default TimeInput;