// components/WeatherPanel.js
import { useEffect, useState } from 'react';

const WeatherPanel = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'a7bb4ff922b4b83f7007702c5d30ddc5'; // ← Trocar pela sua chave da OpenWeather

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError('Erro ao buscar clima');
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return <p>Carregando clima...</p>;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white/10 rounded-xl p-4 shadow-md text-white w-full max-w-sm mx-auto mt-4">
      <div className="flex items-center gap-3">
        <img src={iconUrl} alt="Clima" />
        <div>
          <p className="text-xl font-bold">{weather.name}</p>
          <p>{weather.weather[0].description}</p>
          <p>🌡 {weather.main.temp}°C</p>
          <p>💧 {weather.main.humidity}% umidade</p>
          <p>🌬 {weather.wind.speed} m/s vento</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherPanel;
