import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country, apikey}) => {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${apikey}&query=${country}`)
            .then(response => {
                setWeatherData(response.data)
            })
    }, [country, apikey])

    return (
        <>
            {weatherData === null
                ? null
                :<>
                    <h2>Weather in {weatherData.location.name}</h2>
                    <p>temperature: {weatherData.current.temperature}</p>
                    <img src={weatherData.current.weather_icons[0]} alt={'weather icon'}/>
                    <p>wind: {weatherData.current.wind_speed} direction {weatherData.current.wind_dir}</p>
                 </>
            }
        </>
    )
}

export default Weather