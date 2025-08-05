import { useEffect, useRef, useState } from "react";


export default function useTimer(initialSeconds = 0) {

  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef(null)

  const start = () => {
    if(!isRunning && seconds > 0) 
      setIsRunning(true)
      setHasStarted(true)
  }

  const pause = () => {
    setIsRunning(false)
  }

  const reset = () => {
    setSeconds(initialSeconds)
    setIsRunning(false)
    setHasStarted(false)
  }

    const setTime = (totalSeconds) => {
    setSeconds(totalSeconds)
    setIsRunning(false)
    setHasStarted(false)
  } 

  useEffect(() => {
    if(isRunning && seconds > 0){
      intervalRef.current = setInterval( () => {
        setSeconds(sec => Math.max(sec - 1, 0))
      }, 1000)
    }

    return () => clearInterval(intervalRef.current)   

  }, [isRunning, seconds])


  useEffect(() => {
    if(seconds == 0 && isRunning)
      setIsRunning(false)
  }, [isRunning, seconds])

  return { seconds, isRunning, hasStarted, start, pause, reset, setTime};
}
