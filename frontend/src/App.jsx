import React, { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard.jsx'

export default function App() {
  const [city, setCity] = useState('')
  const [weatherList, setWeatherList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchWeather() {
    if (!city) return setError('Enter city name')
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Error fetching')
      }
      const data = await res.json()
      setWeatherList(list => [...list, data])
    } catch (e) {
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  // Fetch weather for current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async pos => {
        setLoading(true)
        setError('')
        const { latitude, longitude } = pos.coords
        try {
          const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
          if (!res.ok) {
            const t = await res.text()
            throw new Error(t || 'Error fetching')
          }
          const data = await res.json()
          setWeatherList(list => [...list, data])
        } catch (e) {
          setError('Could not fetch location weather: ' + (e.message || 'Error'))
        } finally {
          setLoading(false)
        }
      }, err => {
        setError('Location access denied')
      })
    }
  }, [])

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <div className="search">
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city name (e.g., Hyderabad)" />
        <button onClick={fetchWeather}>Get</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      <div style={{display:'flex',flexWrap:'wrap',gap:24,justifyContent:'center'}}>
        {weatherList.map((w, i) => <WeatherCard key={i} data={w} />)}
      </div>
    </div>
  )
}
