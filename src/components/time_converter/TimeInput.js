import React, { useEffect, useState } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import tzList from '../../data/timezones';
import './TimeInput.css';

dayjs.extend(utc)
dayjs.extend(timezone)

function TimeInput({index, timeValue, zoneValue, handleTimeChange, handleZoneChange, handleAddTime, handleRemoveTime}) {
  //timezone need local state because timezone can not be changed for parent state
  const [timezone, setTimezone] = useState(zoneValue);
  const [autocompletes, setAutocompletes] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [skyRGB, setSkyRGB] = useState("");

  /* const day = [56, 189, 248];
  const night = [12, 74, 110]; */

  useEffect(() => {
    calculateSky(timestampToSlider(timeValue))
  }, [timeValue])

  const onZoneChange = (e) => {
    const newZoneValue = e.target.value;

    setTimezone(newZoneValue);

    console.log("onChange");

    updateAutocomplete(newZoneValue);

    handleZoneChange(index, newZoneValue, timeValue);
  }

  const onTimeChange = (e) => {
    const sliderValue = e.target.value;
    
    handleTimeChange(index, zoneValue, sliderToTimestamp(sliderValue));
  }

  const tz = tzList;
  const updateAutocomplete = (zoneValue) => {
    if(zoneValue === "") {
      setAutocompletes([]);
    } else {
      //fix case matching
      setAutocompletes(tz.filter((item) => item.indexOf(zoneValue) > -1));
    }
  }

  const onKeyDown = (e) => {
    var newFocus = 0 + currentFocus;
    if(e.keyCode === 40){
      //down arrow
      newFocus = currentFocus + 1;
    } else if (e.keyCode === 38){
      //up arrow
      newFocus = currentFocus - 1;
    } else if (e.keyCode === 13){
      //enter
      newFocus = 0;
      setTimezone(autocompletes[currentFocus]);

      handleZoneChange(index, autocompletes[currentFocus], timeValue);

      setAutocompletes([]);
    }

    if(newFocus < 0){
      newFocus = autocompletes.length - 1;
    } else if(newFocus >= autocompletes.length){
      newFocus = 0;
    }

    setCurrentFocus(newFocus);
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
    <div className='time-input flex-1 relative'>
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
        <div className='flex flex-col items-center py-4'>
          <input className='p-2 rounded-md text-center' type='text' value={zoneValue} onChange={onZoneChange} />
          {autocompletes.length > 0 && <div className='autocomplete-list mt-1 w-2/5 max-h-60 rounded overflow-y-scroll overflow-x-hidden text-center absolute top-16'>
            {autocompletes.map((item, i) => <div className={'autocomplete-item py-2 hover:bg-sky-200 ' + (i === currentFocus ? "bg-sky-200" : "bg-sky-100")}>
              <p>{item}</p>
            </div>)}
          </div>}
          <div className='close-btn mt-6 opacity-0 hover:opacity-100'>
            <button className='p-2 bg-red-300 rounded-full' onClick={() => handleRemoveTime(index)}>
              <XIcon className="h-8 w-8 text-white" />
            </button>
          </div>
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