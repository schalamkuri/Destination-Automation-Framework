import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Form(){
    let navigate = useNavigate();

    var lat;
    var lng;

    var apiDestination;

    var accuracy = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
    function error(err) {
        console.log("error getting location");
    }

    

    const reset = (e) => {
        setFormValues({ destination: "", 
        origin: "", 
        hour: "", 
        minute: "",
        TOD: "",
        mode: "",});
    }
    
    function getLocation() {
        navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        setFormValues({ destination: formValues.destination, 
        origin: position.coords.latitude + "," + position.coords.longitude, 
        hour: formValues.hour, 
        minute: formValues.minute,
        TOD: formValues.TOD,
        mode: formValues.mode,});
        console.log(lat);
        console.log(lng);
        return position.coords.latitude + "," + position.coords.longitude;
      }, error, accuracy);
    }

    var initialValues = {
    destination: "", 
    origin: "", 
    hour: "", 
    minute: "",
    TOD: "AM",
    mode: "driving",
    };

    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value});
    }
    
     const handleSubmit = (e) => {
        e.preventDefault();
        apiDestination = getDestinationFormat(formValues.destination);
        const seconds = getSeconds(formValues.hour, formValues.minute, formValues.TOD);
        
        var durationText;
        var durationValue;
        var distanceText;
        var distanceValue;
        
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${formValues.origin}&destination=${apiDestination}&arrival_time=${seconds}&mode=${formValues.mode}&key=${process.env.REACT_APP_API_KEY}`
        fetch(url) 
        .then(response =>{
            return response.json();
        }).then(data =>{
            var routes = data.routes[0];
            var legs = routes.legs[0];
            var distance = legs.distance;
            distanceText = distance.text;
            distanceValue = distance.value;
            var duration = legs.duration;
            durationText = duration.text;
            durationValue = duration.value;
            console.log(durationText);
            console.log(durationValue);
        navigate('/results', { state: {text: durationText, time: durationValue, arrivalTime: seconds} });
        })
        
    }

    function getDestinationFormat(destination){
        let apiFormat = "";
        for (let i = 0; i < destination.length; i++) { 
            let character = destination[i];
            if(character == " "){
                apiFormat += "+";
            } else if(character != ","){
                apiFormat += destination[i];
            }
        }
        return apiFormat;
    }

    function getSeconds(inputHour, inputMinute, inputTOD){
        var hour = inputHour;
        hour = parseInt(hour);
        var minute = inputMinute;
        minute = parseInt(minute);
        const timeOfDay = inputTOD;
        /*
        if(hour > 12 || hour < 1){
            // throw an error message and ask to input again
        }
        if(minute > 59 || minute < 0){
            // throw an error message and ask to input again
        }
        */
       
        if(timeOfDay == "PM"){
            hour = 12 + hour;
        } else if(hour == 12){
            hour = 0;
          }

        console.log("arrival time in military time: " + hour + " : " + minute);
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();
        
        /*
        if(minute == 0){
            var date = new Date(year+'-'+month+'-'+day+'T'+hour+':00');
        } else {
            var date = new Date(year+'-'+month+'-'+day+'T'+hour+':'+minute);
        }
        
        */
        var date = new Date(year, month, day, hour, minute, 0);
        var seconds = date.getTime();
        return seconds;
        }


    return (
        <div className='container'>
    <form >
        <pre>{JSON.stringify(formValues)}</pre>
        <h1 className="Header">
            Welcome to the Destination Automation Tool
        </h1>

        <div className="field">
            <label>
                Enter your starting location OR get current location: 
            </label>
            <br>
            </br>
            <input
            type="text"
            name="origin"
            placeholder="eg: 123 Apple St"
            
            value = {formValues.origin}
            onChange = {handleChange}
            
            />
            
            <button 
            type = "button" 
            onClick={getLocation}>Get Location</button>
            
        </div>

        <div className="field">
            <label>
                Enter your desired destination: 
            </label>
            <input
            type="text"
            name="destination"
            placeholder="eg: 123 Apple St"
            
            value = {formValues.destination}
            onChange = {handleChange}
            
            />
        </div>

        
        <div className="field">
            <label>
                Enter your desired arrival time:
            </label>
            <input
            type="number"
            min="1" 
            max="12"
            name="hour"
            
            value = {formValues.hour}
            onChange = {handleChange}
            
            />
            <label>:</label>
            <input
            type="number"
            min="1" 
            max="60"
            name="minute"
            
            value = {formValues.minute}
            onChange = {handleChange}
            />
            <select name = "TOD" value={formValues.TOD} onChange={handleChange}>           
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <div className="field">
        <label>
        Select your preferred mode of transportation:
        </label>
        <select name="mode" value={formValues.mode} onChange = {handleChange}>
        
            <option value="driving">Driving</option>
            <option value="walking">Walking</option>
            <option value="bicycling">Bicycling</option>
            <option value="transit">Transit</option>
        </select>
        </div>
        
        <button type = "submit" className="submit" onClick={handleSubmit}>Submit</button>
        <button type = "reset" className="reset" onClick={reset}>Reset</button>
    </form>
    </div>
    );
}

export default Form;