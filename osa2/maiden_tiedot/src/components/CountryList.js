import React from 'react'

const CountryList = ({countries, selectCountryHandler}) => {
    return (
        <ul>
            {countries.map((country) =>
                <li key={country.name}>{country.name}
                    <button onClick={selectCountryHandler} value={country.name}>show</button>
                </li>
            )}
        </ul>
    )
}

export default CountryList