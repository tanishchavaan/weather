const apiKey = "7cbc5cf173c60cf015dbee39a9a892b5"; // <== Your OpenWeatherMap API key dawg

  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherInfo = document.getElementById("weatherInfo");
  const cityName = document.getElementById("cityName");
  const weatherIcon = document.getElementById("weatherIcon");
  const description = document.getElementById("description");
  const temp = document.getElementById("temp");
  const feelsLike = document.getElementById("feelsLike");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const errorMsg = document.getElementById("errorMsg");

  function getBackgroundImage(main) {
    main = main.toLowerCase();
    if (main.includes("cloud")) return "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=800&q=80";
    if (main.includes("rain")) return "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80";
    if (main.includes("clear")) return "https://images.unsplash.com/photo-1501975558162-8d84a424dc4e?auto=format&fit=crop&w=800&q=80";
    if (main.includes("snow")) return "https://images.unsplash.com/photo-1602524819329-cb5e3820c140?auto=format&fit=crop&w=800&q=80";
    if (main.includes("thunderstorm")) return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80";
    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
  }

  async function fetchWeather(city) {
    errorMsg.textContent = "";
    weatherInfo.style.display = "none";
    if (!city) {
      errorMsg.textContent = "Yo dawg, type a city name first!";
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();

      // Update UI
      cityName.textContent = `${data.name}, ${data.sys.country}`;
      description.textContent = data.weather[0].description;
      temp.textContent = Math.round(data.main.temp);
      feelsLike.textContent = Math.round(data.main.feels_like);
      humidity.textContent = data.main.humidity;
      wind.textContent = data.wind.speed;

      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      weatherIcon.alt = data.weather[0].description;

      weatherInfo.style.display = "block";

      // Background
      document.body.style.backgroundImage = `url(${getBackgroundImage(data.weather[0].main)})`;

    } catch (err) {
      errorMsg.textContent = "Oops! City not found, try again dawg.";
    }
  }

  searchBtn.addEventListener("click", () => {
    fetchWeather(cityInput.value.trim());
  });

  // Also fetch on Enter key press
  cityInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      fetchWeather(cityInput.value.trim());
    }
  });