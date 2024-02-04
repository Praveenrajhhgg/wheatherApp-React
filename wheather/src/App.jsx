
import './App.css'

import searchIcon from "./assets/search.png";
import clearIcon from "./assets/sun.png";

import cloudIcon from "./assets/cloud.png";
import ab from "./assets/drizzle.png"
import cd from "./assets/humidity.png"
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png"
import { useEffect, useState } from 'react';
const Sam = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
  return (
    <>
      <div className='t'>
        <img className="y" src={icon} alt='image' />
      </div>
      <div className='u'>{temp}°C
      </div>
      <div className='i'>{city}
      </div>
      <div className='o'>{country}
      </div>
      <div className='p'><div>
        <span className='a'>Latitude</span>
        <span>{lat}</span>
      </div>

        <div >
          <span className='s'>Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className='d'>
        <div className='f'>
          <img src={cd} alt='humidity' className='g' />
          <div className='g'>
            <div className='gone'>{humidity}%</div>
            <div className='gtwo'>Humidity</div>
          </div>
        </div>
        <div className='f'>
          <img src={windIcon} alt='windspeed' className='g' />
          <div className='j'>
            <div className='jone'>{wind}km/h</div>
            <div className='jtwo'>Wind Speed</div>
          </div>
        </div>
      </div>

    </>
  )
}

function App() {
  let apikey = "628b5bbd53f36d68e993002faa53df75"
  const [text, settext] = useState("chennai")
  const [icon, seticon] = useState(snowIcon)
  const [temp, settemp] = useState(0)
  const [city, setcity] = useState("Chennai")
  const [country, setcountry] = useState("India")
  const [lat, setlat] = useState(0)
  const [lon, setlon] = useState(0)
  const [humidity, sethumidity] = useState(0)
  const [wind, setwind] = useState(0)
  const [citynotfound, setcitynotfound] = useState(false)
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(null)

  const weatherIconMap = {

    "01d": clearIcon,

    "01n": clearIcon,

    "02d": cloudIcon,

    "02n": cloudIcon,

    "03d": ab,

    "03n": ab,

    "04d": ab,

    "04n": ab,

    "09d": rainIcon,

    "09n": rainIcon,

    "10d": rainIcon,

    "10n": rainIcon,

    "13d": snowIcon,

    "13n": snowIcon,

  };

  const search = async () => {
    setloading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`
    try {
      let res = await fetch(url)
      let data = await res.json()
      if (data.cod === "404") {
        console.error("city not found")
        setcitynotfound(true)
        setloading(false)
        return
      }
      sethumidity(data.main.humidity)
      setwind(data.wind.speed)
      settemp(Math.floor(data.main.temp))
      setcity(data.name)
      setcountry(data.sys.country)
      setlat(data.coord.lat)
      setlon(data.coord.lon)
      const weatherIconcode = data.weather[0].icon
      seticon(weatherIconMap[weatherIconcode] || clearIcon)
      setcitynotfound(false)

    } catch (error) {
      console.error("An error occurred:", error.message)
      seterror("An error occurred while fetching weather data")

    } finally {
      setloading(false)

    }
  }
  const handlecity = (e) => {
    settext(e.target.value)
  }
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }
  useEffect(function () {
    search();
  }, []
  )

  return (
    <>
      <div className='q'>
        <div className='w'>
          <input type='text' className='e' placeholder='Search city' onChange={handlecity} value={text} onKeyDown={handlekeydown}></input>
          <div className='r' onClick={() => search()}>
            <img src={searchIcon} alt='search'></img>

          </div>
        </div>
        {loading&&<div className='z'>Loading...</div>}
        {error&&<div className='x'>{error}</div>}
        {citynotfound&&<div className='c'>City Not Found</div>}

        { !citynotfound && !loading && <Sam icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind} />}
       
        <p className='h'>
          Designed by <span>Prawin Parker</span>
        </p>
      </div>
    </>
  )
}

export default App
