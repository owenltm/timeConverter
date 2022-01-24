import React, { useState } from 'react';
import dayjs from 'dayjs';

import TimeInput from './TimeInput';

function TimeConverter(props) {
  const [times, setTimes] = useState([{
    timezone: "Asia/Singapore",
    time: 0
  }, {
    timezone: "PST8PDT",
    time: 0
  }])

  const handleChange = (index, timezone, value) => {

    const hour = value / 1440 * 24;
    const minute = value % 60;

    const tempTime = dayjs().tz(timezone).hour(parseInt(hour)).minute(parseInt(minute));

    setTimes(times.map((t, i) => {
      if(i != index){

        const newTime = tempTime.tz(t.timezone);

        return {
          ...t,
          time: (newTime.hour() * 60) + newTime.minute()
        }
      } else {
        return {
          ...t,
          time: parseInt(value)
        };
      }
    }))

    //console.log(times);
  }

  return (
    <div className='flex h-screen'>
      {
        times.map((time, index) => 
          <TimeInput key={index} index={index} timeValue={time.time} timezoneValue={time.timezone} handleChange={handleChange} />
        )
      }
    </div>
  );
}

export default TimeConverter;