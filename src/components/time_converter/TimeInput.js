import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

function TimeInput({index, timeValue, zoneValue, handleTimeChange, handleZoneChange}) {
  //timezone need local state because timezone can not be changed for parent state
  const [timezone, setTimezone] = useState(zoneValue);
  const [skyRGB, setSkyRGB] = useState("");

  /* const day = [56, 189, 248];
  const night = [12, 74, 110]; */

  useEffect(() => {
    calculateSky(timestampToSlider(timeValue))
  }, [timeValue])

  const onZoneChange = (e) => {
    const newZoneValue = e.target.value;

    setTimezone(newZoneValue);

    handleZoneChange(index, newZoneValue, timeValue);
  }

  const onTimeChange = (e) => {
    const sliderValue = e.target.value;
    
    handleTimeChange(index, zoneValue, sliderToTimestamp(sliderValue));
  }

  const calculateSky = (slider) => {
    const mid = 1440 / 2;

    //count difference
    let diff = slider - mid;
    if(diff < 0) diff *= -1; //make sure value is positive

    //count percentage of day (00.00 = 100%, 12.00 = 0%)
    let percentage = diff/mid * 100;

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
    <div className='flex-1 flex flex-col' style={{ backgroundColor: 'rgb(' + skyRGB[0] + ',' + skyRGB[1]+ ',' + skyRGB[2] + ')' }}>
      <div className='flex justify-center py-4'>
        <input className='p-2 rounded-md text-center' type='text' value={timezone} onChange={onZoneChange} />
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