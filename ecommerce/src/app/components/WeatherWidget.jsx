import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from "./ui-elements/Input";
import Button from "./ui-elements/Button";

// Константы
const DEFAULT_CITY = "Tyumen";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Вспомогательная функция для преобразования кода погоды WMO
const getWeatherInfo = (weatherCode, isDay = 1) => {
    const weatherMap = {
        0: { description: "Clear sky", icon: "fa-sun" },
        1: { description: "Mainly clear", icon: "fa-cloud-sun" },
        2: { description: "Partly cloudy", icon: "fa-cloud" },
        3: { description: "Overcast", icon: "fa-cloud" },
        45: { description: "Fog", icon: "fa-smog" },
        48: { description: "Fog", icon: "fa-smog" },
        51: { description: "Drizzle", icon: "fa-cloud-rain" },
        53: { description: "Drizzle", icon: "fa-cloud-rain" },
        55: { description: "Drizzle", icon: "fa-cloud-rain" },
        56: { description: "Freezing drizzle", icon: "fa-snowflake" },
        57: { description: "Freezing drizzle", icon: "fa-snowflake" },
        61: { description: "Rain", icon: "fa-cloud-showers-heavy" },
        63: { description: "Rain", icon: "fa-cloud-showers-heavy" },
        65: { description: "Rain", icon: "fa-cloud-showers-heavy" },
        66: { description: "Freezing rain", icon: "fa-snowflake" },
        67: { description: "Freezing rain", icon: "fa-snowflake" },
        71: { description: "Snow", icon: "fa-snowflake" },
        73: { description: "Snow", icon: "fa-snowflake" },
        75: { description: "Snow", icon: "fa-snowflake" },
        77: { description: "Snow grains", icon: "fa-snowflake" },
        80: { description: "Rain showers", icon: "fa-cloud-showers-heavy" },
        81: { description: "Rain showers", icon: "fa-cloud-showers-heavy" },
        82: { description: "Violent rain showers", icon: "fa-cloud-showers-heavy" },
        85: { description: "Snow showers", icon: "fa-snowflake" },
        86: { description: "Snow showers", icon: "fa-snowflake" },
        95: { description: "Thunderstorm", icon: "fa-bolt" },
        96: { description: "Thunderstorm with hail", icon: "fa-bolt" },
        99: { description: "Thunderstorm with hail", icon: "fa-bolt" },
    };
    return weatherMap[weatherCode] || { description: "Unknown", icon: "fa-question" };
};

// Компонент скелетона (лоадера)
const SkeletonLoader = ({ isBackground=true }) => {
    if (isBackground) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-400 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
                <p className="text-white text-center">Loading...</p>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent mb-4"></div>
                <p className="text-white text-center">Loading...</p>
            </div>
        );
    }
};

function WeatherWidget({ onClose }) {
    // Состояния
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cityInput, setCityInput] = useState("");
    const [weather, setWeather] = useState(null);
    const [geoError, setGeoError] = useState("");
    const [weatherError, setWeatherError] = useState("");
    const [failedCities, setFailedCities] = useState(new Set());
    
    // Refs для AbortController
    const abortControllerRef = useRef(null);
    const isMountedRef = useRef(true);

    // Отмена текущего запроса
    const cancelRequest = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    // Получение координат по названию города
    const fetchCoordinates = useCallback(async (cityName, signal) => {
        const url = `${GEOCODING_API_URL}?name=${encodeURIComponent(cityName)}&count=1&language=ru`;
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        if (!data.results || data.results.length === 0) throw new Error("City not found");
        const result = data.results[0];
        return {
            lat: result.latitude,
            lon: result.longitude,
            name: result.name,
        };
    }, []);

    // Получение погоды по координатам
    const fetchWeather = useCallback(async (lat, lon, signal) => {
        // * Здесь мы добавляем API-ключ в запрос (но сервис его игнорирует)
        // * Тяжело найти API сервисы погоды с ключом, которые работают в РФ без ***
        const url = `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&key=${API_KEY}`;
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        if (!data.current_weather) throw new Error("No weather data");
        const current = data.current_weather;
        const daily = data.daily;
        const weatherInfo = getWeatherInfo(daily.weather_code[0]);
        
        return {
            temperature: Math.round(current.temperature),
            description: weatherInfo.description,
            icon: weatherInfo.icon,
            tempMax: Math.round(daily.temperature_2m_max[0]),
            tempMin: Math.round(daily.temperature_2m_min[0]),
            windSpeed: current.windspeed,
        };
    }, []);

    // Основная логика получения погоды для города
    const fetchWeatherForCity = useCallback(async (city, isInitialLoad = false) => {
        // Отменяем предыдущий запрос
        cancelRequest();
        
        // Создаем новый AbortController
        const controller = new AbortController();
        abortControllerRef.current = controller;
        
        // Устанавливаем состояние загрузки
        setIsLoading(true);
        
        // Очищаем предыдущие ошибки (кроме geoError при изменении инпута)
        if (!isInitialLoad) setGeoError("");
        setWeatherError("");
        
        try {
            // 1. Получаем координаты
            const coords = await fetchCoordinates(city, controller.signal);
            setCityInput(coords.name);
            setGeoError("");
            
            // 2. Получаем погоду по координатам
            const weatherData = await fetchWeather(coords.lat, coords.lon, controller.signal);
            setWeather(weatherData);
            
            // Если город был в списке неудачных - удаляем его
            if (failedCities.has(city)) {
                setFailedCities(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(city);
                    return newSet;
                });
            }
        } catch (err) {
            // Пропускаем ошибки отмены
            if (err.name === 'AbortError' || err.name === 'CanceledError') return;            
            console.error("Error fetching weather:", err);
            
            // Определяем тип ошибки
            if (err.message === "City not found") {
                setGeoError(`Unable to retrieve data for the city ${city}`);
                setFailedCities(prev => new Set(prev).add(city));
                setCityInput("");
                // Если это не первая загрузка, оставляем старые данные погоды
                if (isInitialLoad) setWeather(null);
            } else {
                setWeatherError("Failed to retrieve data");
                setWeather(null);
            }
        } finally {
            if (isMountedRef.current) {
                setIsLoading(false);
                if (isInitialLoading) setIsInitialLoading(false);
                if (abortControllerRef.current === controller) {
                    abortControllerRef.current = null;
                }
            }
        }
    }, [cancelRequest, fetchCoordinates, fetchWeather, failedCities]);

    // Обработчик изменения инпута
    const handleCityInputChange = (e) => {
        const newValue = e.target.value;
        setCityInput(newValue);
        
        // Добавляем предупреждение, если пользователь уже вводил этот неудачный город
        if (failedCities.has(newValue)) {
            const warningMsg = `Warning! You have already tried to get the weather for ${newValue}`;
            if (geoError !== warningMsg) setGeoError(warningMsg);
        } else if (geoError) {
            // Очищаем ошибку геокодинга при изменении текста
            setGeoError("");
        }
    };

    // Обработчик кнопки отправки запроса на погоду
    const handleSubmit = () => {
        const trimmedCity = cityInput.trim();
        if (!trimmedCity) return;

        fetchWeatherForCity(trimmedCity, false);
    };

    // Определение геолокации пользователя
    const getUserLocation = useCallback(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation не поддерживается");
            fetchWeatherForCity(DEFAULT_CITY, true);
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const weatherData = await fetchWeather(latitude, longitude, new AbortController().signal);
                    setWeather(weatherData);
                    setCityInput("Текущее местоположение");
                    if (isInitialLoading) setIsInitialLoading(false);
                    setIsLoading(false);
                } catch (err) {
                    console.error("Error getting location weather:", err);
                    fetchWeatherForCity(DEFAULT_CITY, true);
                }
            },
            (error) => {
                console.log("Геолокация отклонена или ошибка:", error.message);
                fetchWeatherForCity(DEFAULT_CITY, true);
            }
        );
    }, []);

    // Инициализация при монтировании
    useEffect(() => {
        isMountedRef.current = true;

        // Пробуем получить геолокацию, если отказ - fallback на Тюмень
        getUserLocation();
        
        // Очистка при размонтировании
        return () => {
            isMountedRef.current = false;
            cancelRequest();
        };
    }, []);

    // Рендер
    if (isInitialLoading) {
        return <SkeletonLoader isBackground={true} />
    }
    return (
        <div className="relative bg-gray-400 rounded-lg p-4 text-white">
            {/* Кнопка закрытия */}
            <Button
                isIconOnly={true}
                className="absolute top-2 right-2"
                variant="light"
                onClick={onClose}
            >
                <FontAwesomeIcon icon="fa-solid fa-xmark" className='text-white hover:text-gray-200 text-md' />
            </Button>

            {/* Заголовок блока */}
            <div className="flex flex-row gap-2 items-center pb-2">
                <FontAwesomeIcon icon="fa-solid fa-city" className='text-md' />
                <h3 className="text-xl font-medium">Weather</h3>
            </div>
            
            {/* Инпут и кнопка */}
            <div className="mb-4">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Enter the city name"
                        value={cityInput}
                        onChange={handleCityInputChange}
                        isDisable={isLoading}
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || !cityInput.trim()}
                        isIconOnly={true}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-search" className="text-gray-700 hover:text-gray-900 text-lg" />
                    </Button>
                </div>

                {/* Сообщение об ошибке геокодинга */}
                {geoError && (
                    <p className="text-red-700 text-sm mt-1">{geoError}</p>
                )}
            </div>
            
            {/* Область погоды */}
            <div className="mt-4">
                {/* {isLoading && !weather && !weatherError ? ( */}
                {isLoading ? (
                    <SkeletonLoader isBackground={false} />
                ) : weatherError ? (
                     <div className="text-center py-8 bg-gray-300 rounded-lg">
                        <p className="text-gray-500">{weatherError}</p>
                    </div>
                ) : weather ? (
                    <div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <FontAwesomeIcon icon={`fa-solid ${weather.icon}`} className="text-white text-5xl" />
                                <div className="flex flex-col text-sm">
                                    <p className="text-4xl font-bold">{weather.temperature}°C</p>
                                    <p>{weather.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-evenly text-sm gap-4 border-t border-white pt-2">
                                <span>
                                    <FontAwesomeIcon icon="fa-solid fa-temperature-arrow-up" className="text-white mr-1" />
                                    Max: {weather.tempMax}°C
                                </span>
                                <span>
                                    <FontAwesomeIcon icon="fa-solid fa-temperature-arrow-down" className="text-white mr-1" />
                                    Min: {weather.tempMin}°C
                                </span>
                                <span>
                                    <FontAwesomeIcon icon="fa-solid fa-wind" className="text-white mr-1" />
                                    Wind: {weather.windSpeed} km/h
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-300 rounded-lg">
                        <p className="text-gray-500">Enter a city and click the button to get weather information</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherWidget;
