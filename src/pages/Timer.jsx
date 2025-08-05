import { formatTime } from "@/utils/formatTime"
import TimerControls from "@/components/timer/TimerControls"
import TimerDisplay from "@/components/timer/TimerDisplay"
import useTimer from "@/hooks/useTimer"
import TimerInput from "@/components/timer/TimerInput"

function Timer(){
    const { seconds, isRunning, hasStarted, start, pause, reset, setTime } = useTimer(0)

    return(
        <div>
           <h1>Timer</h1> 
           <TimerInput onSetTime={setTime} disabled={isRunning}/>
           <TimerDisplay time={formatTime(seconds)}/>
           <TimerControls
                 onStart={start}
                 onPause={pause}
                 onResume={start}
                 onReset={reset}
                 isRunning={isRunning}
                 hasStarted={hasStarted}

            />
        </div>
    )
}
export default Timer