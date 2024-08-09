import { useEffect, useState } from 'react'
import Proptypes from "prop-types"

import './App.css'

import CouldyIcon from "./assets/cloudy.png";
import Clouds from "./assets/clouds.png";
import SearchIcon from "./assets/search.png";
import Humidity from "./assets/humidity.png";
import Rainy from "./assets/rainy.png";
import Snow from "./assets/snow.png";
import Storm from "./assets/storm.png";
import Sunny from "./assets/sun.png";
import Wind from "./assets/wind.png";
import Drizzle from "./assets/drizzle.png";

const Weatherdetails=( {icon, temp, city, country, longitude, latitude, humidity, 
  wind})=>{

   

  return(
    <>
    <div className="image">
      <img src={icon} alt="Image" />
    </div>
    <div className="temp">{temp}°c</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
      <span className='longitude'>longitude</span>
      <span>{longitude}</span>
      </div>
      <div>
      <span className='latitude'>latitude</span>
      <span>{latitude}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
         <img src={Humidity} alt="humidity"/>
         <div className="data">
          <div className="humidity-percentage">{humidity} %</div>
          <div className="text">Humidity</div>
         </div>
      </div>
      <div className="element">
         <img src={Wind} alt="wind"/>
         <div className="data">
          <div className="wind-speed">{wind} km/h</div>
          <div className="text">Wind-Speed</div>
         </div>
      </div>
        </div>
        
    </>
  )
}

Weatherdetails.Proptypes={
  icon: Proptypes.string.isRequired,
  temp: Proptypes.number.isRequired,
  city: Proptypes.string.isRequired,
  country: Proptypes.string.isRequired,
  humidity: Proptypes.number.isRequired,
  wind: Proptypes.number.isRequired,
  longitude: Proptypes.number.isRequired,
  latitude: Proptypes.number.isRequired,

}


function App() {
  let api_key=`6027606b899650cbacd754d0d81a310b`;
  const [text, setText]=useState("Kanchipuram")

  const [count, setCount] = useState(0)
  const [icon, setIcon]= useState(Rainy)
  const [temp, setTemp]= useState(0)
  const [city, setCity]= useState("Kanchipuram")
  const [country, setCountry]= useState("IN")
  const [longitude, setLongitude]=useState(0)
  const [latitude, setLatitude]=useState(0)
  const [humidity, setHumidity] =useState(0)
  const [wind, setWind]= useState(0)
  const [cityNotFound,setCityNotFound]=useState(false)
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState(null)

  // const weatherIconMap={
    // "01d": Sunny,
    // "01n": Sunny,
    
  // }

    const weatherIconMap={
    "01n": Sunny,
    "01d": Sunny,
    "02d": Clouds,
    "02n": CouldyIcon,
    "03d": CouldyIcon,
    "03n": Drizzle,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Storm,
    "09n": Storm,
    "10d": Rainy,
    "10n": Rainy,
    "13d": Snow,
    "13n": Snow
  }


  const search= async()=>{
    setLoading(true)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

    try{
      let res= await fetch(url);
      let data= await res.json();
      // console.log(data)
      if(data.cod === "404"){
        console.log("city not found");
        setCityNotFound(true)
        setLoading(false)
      }

      setCity(data.name)
      setHumidity(data.main.humidity)
      setTemp(Math.floor(data.main.temp))
      setWind(data.wind.speed)
      setCountry(data.sys.country)
      setLatitude(data.coord.lat)
      setLongitude(data.coord.lon)
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || CouldyIcon)
      setCityNotFound(false)
      
    }catch(error){
      console.log("An error Occured", error.message)
      
    }
    finally{
      setLoading(false)
    }
  }

  const cityhandle =(e)=> 
    {
    setText(e.target.value);
  }

  const handlekeydown = (e)=>{
    if(e.key==="Enter"){
      search();
    }
  }

  useEffect(function (){
    search()
  },[])


  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input type="text" className='cityinput' placeholder='Search City' onChange={cityhandle}
          value={text} onKeyDown={handlekeydown}/>
          <div className="search-icon">
         <img src={SearchIcon} alt="icon" onClick={search} />
         </div>
        </div>

        {!loading && !cityNotFound && <Weatherdetails icon={icon} temp={temp} city={city} country={country} 
        latitude={latitude} longitude={longitude} humidity={humidity} wind={wind}/>}

        {loading && <div className="loading-message">...Loading</div>}

        {error && <div className="error-message">{error}</div>}

        {cityNotFound && <div className="city-not-found">City Not Found</div>}
      </div>
    </>
  )
}

export default App
