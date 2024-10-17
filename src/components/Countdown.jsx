import { useState, useEffect } from "react";

export function Countdown({timeStamp}){
  const [timeRemaining, setTimeRemaining] = useState(timeStamp - Date.now());

  useEffect(() => {
   const timeInterval = setInterval(() => {
    setTimeRemaining(timeStamp - Date.now())
   }, 1000);
   return () => clearInterval(timeInterval)
  }, [timeStamp]);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const minutes = Math.floor(timeRemaining % (1000 * 60 * 60 * 24) / (1000 * 60));
  const seconds= Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000));

  return (
    Date.now() > timeStamp ? '00:00:00' : <div>{days}d : {hours}h : {minutes}m : {seconds}s</div>
  )
}