window.onload = function() {
  let loadingParagraph = document.getElementById('loading');
  let locationParagraph = document.getElementById('location');
  let temperatureParagraph = document.getElementById('temperature');
  let descriptionParagraph = document.getElementById('description');
  let toggleButton = document.getElementById('toggle');

  let temperatureInCelsius;

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`)
          .then(response => response.json())
          .then(data => {
              loadingParagraph.style.display = 'none';

              let location = data.name;
              temperatureInCelsius = data.main.temp;
              let description = data.weather[0].main;

              locationParagraph.textContent = location;
              temperatureParagraph.textContent = temperatureInCelsius + ' °C';
              descriptionParagraph.textContent = description;
          });
      });
  } else {
      loadingParagraph.textContent = "La geolocalización no es compatible con este navegador.";
  }

  toggleButton.addEventListener('click', function() {
      if (temperatureParagraph.textContent.indexOf('C') !== -1) {
          let temperatureInFahrenheit = temperatureInCelsius * 9 / 5 + 32;
          temperatureParagraph.textContent = temperatureInFahrenheit + ' °F';
      } else {
          temperatureParagraph.textContent = temperatureInCelsius + ' °C';
      }
  });
}
