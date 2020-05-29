import React from 'react'
import Weather from './Weather'

const CountryDetails = ({country, apikey}) => {
    return (
        <>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language) =>
                    <li key={language.name}>{language.name}</li>
                )}
            </ul>
            <img src={country.flag} alt={'flag'}/>
            <Weather country={country.name} apikey={apikey}/>
        </>
    )
}

export default CountryDetails