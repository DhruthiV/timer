import { Button } from "@/components/ui/button"
function TimerControls({ onStart, onPause, onResume, onReset, isRunning, hasStarted }) {
  let mainButton;
  if (!hasStarted) {
    mainButton = <Button onClick={onStart}>Start</Button>;
  } else if (isRunning) {
    mainButton = <Button onClick={onPause}>Pause</Button>;
  } else {
    mainButton = <Button onClick={onResume}>Resume</Button>;
  }

  return (
    <>
      {mainButton}
      <Button onClick={onReset}>Reset</Button>
    </>
  );
}

export default TimerControls