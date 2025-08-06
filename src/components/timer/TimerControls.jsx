import { Button } from "@/components/ui/button";

function TimerControls({ onStart, onPause, onResume, onReset, isRunning, hasStarted }) {
  let mainButton;
  if (!hasStarted) {
    mainButton = <Button onClick={onStart} aria-label="Start Timer">Start</Button>;
  } else if (isRunning) {
    mainButton = <Button onClick={onPause} aria-label="Pause Timer">Pause</Button>;
  } else {
    mainButton = <Button onClick={onResume} aria-label="Resume Timer">Resume</Button>;
  }

  return (
    <div className="flex space-x-2">
      {mainButton}
      <Button onClick={onReset} aria-label="Reset Timer">Reset</Button>
    </div>
  );
}

export default TimerControls;
