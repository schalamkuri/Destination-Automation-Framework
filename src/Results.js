import { useLocation } from "react-router-dom";
import './results.css';
function Results() {
    
    const {state} = useLocation();
    const {text, time, arrivalTime} = state;
    var departureTime = arrivalTime - time * 1000;
    var date = new Date(departureTime);
    var hour = date.getHours();
    var TOD = "PM"
    if(hour < 12){
        TOD = "AM"
    }
    if(hour > 12){
        hour -= 12;
    }
    var minute = date.getMinutes();
    var conversion = parseInt(minute);
    if(conversion < 10){
        minute = "0"+minute;
    }
    console.log(hour);
    console.log(minute);
    console.log(TOD);
    return (
      <div className='container'>
          <label className="format">
       You should leave by {hour}:{minute} {TOD}
       </label>
      </div>
    )
    
   
   
  }
  
  export default Results;