import { useEffect, useRef, useState } from "react";
import { notifyUser, requestNotificationPermission } from "@/utils/notifications";

const STORAGE_KEY = "timer-states-v1"

export default function useTimer(initialSeconds = 0) {

  const loadState = () =>{
    try{
      const saved = localStorage.getItem(STORAGE_KEY)
      if(!saved) 
        return { 
          seconds: initialSeconds,
          isRunning: false,
          hasStarted: false 
        }

      const state = JSON.parse(saved);

      const now = Date.now() //Time now
      const elapsed = Math.floor((now - state.lastUpdated) / 1000) //time done

      // update time only when it was running and not when paused
      const updatedSeconds = state.isRunning? Math.max(state.seconds - elapsed, 0) : state.seconds//remaining and avoid negative seconds

      return { 
        seconds: updatedSeconds,
        isRunning: state.isRunning && updatedSeconds > 0,
        hasStarted: state.hasStarted || false
      }
    }catch{
      localStorage.removeItem(STORAGE_KEY)
      return {
        seconds: initialSeconds,
        isRunning: false,
        hasStarted: false
      }
    }

  }


  const initialState = loadState()

  const [seconds, setSeconds] = useState(initialState.seconds); 
  const [isRunning, setIsRunning] = useState(initialState.isRunning)
  const [hasStarted, setHasStarted] = useState(initialState.hasStarted)
  //set to resume from previous state after refresh

  const intervalRef = useRef(null)
  const notifiedRef = useRef(false)


  const saveState = (secondsToSave, running, started) =>{
    const state = {
      seconds: secondsToSave,
      isRunning: running,
      hasStarted: started,
      lastUpdated: Date.now()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }


  const start = () => {
    if(!isRunning && seconds > 0){
      setIsRunning(true)
      setHasStarted(true)
      saveState(seconds, true, true)
    }
  }

  const pause = () => {
    setIsRunning(false)
    saveState(seconds, false, hasStarted)
  }

  const reset = () => {
    setSeconds(initialSeconds)
    setIsRunning(false)
    setHasStarted(false)
    saveState(initialSeconds, false, false)
    localStorage.removeItem(STORAGE_KEY);
    notifiedRef.current = false;
  }

  const setTime = (totalSeconds) => {
    setSeconds(totalSeconds)
    setIsRunning(false)
    setHasStarted(false)
    saveState(totalSeconds, false, false)
    notifiedRef.current = false;
  } 


  //App Start
  useEffect(() => {
    requestNotificationPermission()
  }, []);


  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(sec => {
          const newSec = Math.max(sec - 1, 0);
          return newSec;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);


  useEffect(() => {
    saveState(seconds, isRunning, hasStarted);
  }, [seconds, isRunning, hasStarted]);

 useEffect(() => {
  if (seconds === 0 && isRunning) {
    setIsRunning(false);
    setHasStarted(false);
    if (!notifiedRef.current) {
      notifyUser();
      notifiedRef.current = true;
    }
  } else if (seconds > 0) {
    notifiedRef.current = false;
  }
}, [isRunning, seconds]);

  return { seconds, isRunning, hasStarted, start, pause, reset, setTime};
}


