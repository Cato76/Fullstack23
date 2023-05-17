import { useState } from 'react'
import axios from 'axios'

const App = (props) => {

  const [searchedCountries, setSearchedCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState([])

  const api = process.env.REACT_APP_API_KEY
  const countries = props.countries

  const handleFilterChange = (event) => {
    setSearchedCountries(countries.filter(country => (country.name.common.toLowerCase()).includes(event.target.value.toLowerCase())))
    setFilter(event.target.value)
  }
  const showMore = (countryName) => {
    setSearchedCountries(countries.filter(country => (country.name.common.toLowerCase()).includes(countryName.toLowerCase())))
    setFilter(countryName)
  }

  const Country = ({ country }) => {

    return (
      <li className="country"> {country.name.common} <button onClick={() => showMore(country.name.common)}>show</button></li>
    )
  }

  const CountryDetails = ({ country }) => {

    const Languages = (country) => {
      let languages = []
      for (const property in country.languages) {
        languages.push(country.languages[property])
      }

      return (
        <div>
          {languages.map(
            language => <ul key={language}>{language}</ul>
          )}</div>
      )
    }

    return (
      <div>
        <h1>{country.name.official}</h1>
        <h2>Languages</h2>
        <div>{Languages(country)}</div>
        <h3>Capital: {country.capital[0]}</h3>
        <h3>area: {country.area}</h3>
        <img src={country.flags.png} alt="Logo" />


      </div>
    )
  }

  const getWeather = (city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`).then(response => setWeather(response.data)).catch(() => {
      console.log("weather query failed")
      setWeather([])
    })
  }

  const SearchCountries = ({ country }) => {
    return (
      country.map(coun => <Country key={coun.name.common} country={coun} />)
    )
  }

  if (searchedCountries.length === 1) {
    getWeather(searchedCountries[0].capital[0])
    
    return (
      <div>
        <FilterForm handleFilterChange={handleFilterChange} filter={filter} />
        <ul>
          <CountryDetails key={searchedCountries[0].name.official} country={searchedCountries[0]} />
          <WeatherInfo weather={weather} />
        </ul>
      </div>
    )
  }
  else if (searchedCountries.length <= 10 && filter.length !== 0) {

    return (

      <div>

        <FilterForm handleFilterChange={handleFilterChange} filter={filter} />

        <SearchCountries country={searchedCountries} />

      </div>

    )
  } else {
    return (
      <div>
        <FilterForm handleFilterChange={handleFilterChange} filter={filter} />
        <ul>
          <>Too many many matches, specify another filter</>
        </ul>
      </div>
    )
  }
}

const FilterForm = (props) => {

  const addFilter = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={addFilter}>
      <div className="filter">Find countries: <input value={props.filter} onChange={props.handleFilterChange} /></div>
    </form>
  )
}

const WeatherInfo = (props) => {


  if (props.weather.length !== 0) {
    return (
      <div>
        <h2>Weather information</h2>
        <h3>wind: {props.weather?.wind?.speed} m/s</h3>
        <h3>temparature: {props.weather?.main?.temp} celsius</h3>
        <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0]?.icon}@2x.png`} alt="weather icon" />
      </div>
    )

  } else {
    return (
      <div>
        <h2>Weather information not available</h2>
      </div>
    )
  }
}



export default App