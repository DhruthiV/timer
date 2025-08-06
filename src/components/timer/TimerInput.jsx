import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function TimerInput({ onSetTime, disabled }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
    onSetTime(totalSeconds);
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-3'>
      <Input
        type="number"
        min="0"
        max="23"
        value={hours}
        onChange={e => setHours(e.target.value)}
        disabled={disabled}
        placeholder="HH"
      />
      <Input
        type="number"
        min="0"
        max="59"
        value={minutes}
        onChange={e => setMinutes(e.target.value)}
        disabled={disabled}
        placeholder="MM"
      />
      <Input
        type="number"
        min="0"
        max="59"
        value={seconds}
        onChange={e => setSeconds(e.target.value)}
        disabled={disabled}
        placeholder="SS"
      />
      <Button type="submit" disabled={disabled}>Set Time</Button>
    </form>
  );
}

export default TimerInput;
