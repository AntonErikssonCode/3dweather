import React, { useState } from 'react';
import "./SelectedWeather.css";
import icon from "../assets/clear-sky.png"
import weatherConfig from '../weatherConfig';
interface SelectWeatherProps {
  handleSelectWeather: (weatherIndex: number) => void;
  handleClick: () => void;
  selectedWeather: any;
  expanded: any;
}

function SelectWeather({ handleSelectWeather, handleClick,  selectedWeather, expanded}: SelectWeatherProps) {
  /* const [expanded, setExpanded] = useState(false); */

 

  return (
    <div onClick={handleClick} className={`weather ${expanded ? 'selected-weather-expanded' : 'selected-weather'}`}>
      <div  className={`icon-container ${expanded ? 'icon-container-expanded' : ''}`}>
       <img src={icon} className='icon'/>
       </div>
   
      {expanded && (
        <div className='weather-menu'>
             <div className='weather-menu-item' onClick={()=>handleSelectWeather(27)}>
                <p>Select Current</p>
              </div>
          {weatherConfig.map((item, index)=>{
            return(
              <div className='weather-menu-item' onClick={()=>handleSelectWeather(index)} key={item.name+index}>
                <p>{item.name}</p>
              </div>
            )
          })}
         
        </div>
      )}
    </div>
  );
}

export default SelectWeather;