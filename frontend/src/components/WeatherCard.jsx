
import React from 'react'
import './WeatherCard.css'

export default function WeatherCard({ data }) {
  const iconUrl = data.icon ? `https://openweathermap.org/img/wn/${data.icon}@2x.png` : ''
  function formatTime(ts) {
    if (!ts) return '-';
    const d = new Date(ts * 1000)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return (
    <div className="card" style={{marginTop:16}}>
      <div className="row">
        <div>
          <div style={{fontSize:20, fontWeight:600}}>{data.city}, {data.country}</div>
          <div className="muted">{data.description}</div>
        </div>
        {iconUrl && <img src={iconUrl} alt="icon" title={data.weather} />}
      </div>
      <div style={{display:'flex', alignItems:'center', gap:20, marginTop:12}}>
        <div className="temp">{Math.round(data.temp)}°C</div>
        <div>
          <div className="muted">Feels: {Math.round(data.feels_like)}°C</div>
          <div className="muted">Humidity: {data.humidity}%</div>
          {data.wind && <div className="muted">Wind: {data.wind} m/s</div>}
          {data.pressure && <div className="muted">Pressure: {data.pressure} hPa</div>}
        </div>
      </div>
      <div style={{marginTop:10, fontSize:13, color:'#1976d2'}}>
        {data.sunrise && <span>Sunrise: {formatTime(data.sunrise)} </span>}
        {data.sunset && <span>Sunset: {formatTime(data.sunset)}</span>}
      </div>
    </div>
  )
}
