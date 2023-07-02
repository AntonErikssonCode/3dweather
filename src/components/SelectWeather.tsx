import React, { useState } from 'react';
import "./SelectedWeather.css";
import icon from "../assets/weather.png"
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
   
      {expanded && (<>
         <div  onClick={()=>handleSelectWeather(27)}>
         <p  className={`weather-menu-item-p-with-margin ${selectedWeather==27 ? 'active' : ''}`} >Current Weather</p>
         <div className="divider"></div>
       </div>
        <div className='weather-menu'>
            
          {weatherConfig.map((item, index)=>{
            return(
              <div  onClick={()=>handleSelectWeather(index)} key={item.name+index}>
                <p className={`weather-menu-item-p ${selectedWeather==index ? 'active' : ''}`}>{index+1 + " " + item.name}</p>
              </div>
            )
          })}
         
        </div>
        </>
      )}
    </div>
  );
}

export default SelectWeather;