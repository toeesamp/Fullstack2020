import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import CountryDetails from './CountryDetails'
import CountryList from './CountryList'

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    const handleFilterInputChange = (event) => {
        setFilter(event.target.value)
    }

    const selectCountryHandler = (event) => {
        setFilter(event.target.value)
    }

    // case insensitive filter for country names using the text in the 'filter' input field
    const filteredCountries = countries.filter(country => country['name'].toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    return (
        <div>
            <Filter text={'find countries'} value={filter} handler={handleFilterInputChange} />
            {/**
             * show nothing with empty input,
             * show text about too many matches if more than 10 results
             * show a list of country names if 10 or less results but more than one
             * show country details if and only if one match
             */}
            {filter.length === 0 || filteredCountries.length === 1
                ? null
                : filteredCountries.length > 10
                    ? <p>Too many matches, specify another filter</p>
                    : <CountryList countries={filteredCountries} selectCountryHandler={selectCountryHandler}/>
            }
            {filteredCountries.length === 1 
                ? <CountryDetails country={filteredCountries[0]} apikey={api_key} /> 
                : null
            }
        </div>
    )
}

export default App