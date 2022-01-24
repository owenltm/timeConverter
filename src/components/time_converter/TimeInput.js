import React, { useEffect, useState } from 'react';
// import './TimeInput.css';

function TimeInput({timeValue, handleChange}) {
  const [value, setValue] = useState(50);
  const [hourLbl, setHourLbl] = useState("12");
  const [minLbl, setMinLbl] = useState("00");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    //convert slider to 24hrs value
    const hour = value / 1000 * 24;
    const minute = (value / 1000 * 1440) % 60;

    setHourLbl(parseInt(hour) < 10 ? '0' + parseInt(hour) : parseInt(hour));
    setMinLbl(parseInt(minute) < 10 ? '0' + parseInt(minute) : parseInt(minute));

    handleChange(timezone, value);
    //console.log(hour, minute, value);
  }, [value])

  const onZoneChange = (e) => {
    setTimezone(e.target.value)
  }

  const onTimeChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className='flex-1 flex flex-col bg-blue-400'>
      <div className='flex justify-center py-4'>
        <input className='p-2 rounded-md text-center' type='text' value={timezone} onChange={onZoneChange} />
      </div>
      <div className='flex-1 flex flex-col justify-evenly items-center text-white'>
        {/* <div className='bg-yellow-200 w-1/3 h-20'>
          Icon
        </div> */}
        <div className='w-3/4'>
          <div className='text-center mb-5'>
            <h1 className='text-3xl'>Mon, 24 Jan 2022</h1>
            <h2 className='text-5xl font-bold'>{hourLbl}:{minLbl}</h2>
          </div>
          <input className='text-red-100' type='range' min={0} max={1000} value={value} onChange={onTimeChange}/>
        </div>
      </div>
    </div>
  );
}

export default TimeInput;