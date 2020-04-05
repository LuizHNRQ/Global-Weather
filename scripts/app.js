//DOM manipulation
const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  const cityDetail = data.cityDets;
  const weather = data.weather;
  
  //update detail update

  details.innerHTML = `
  <h5 class = "my-3"> ${cityDetail.EnglishName} </h5> 
  <div class = "my-3" > ${weather.WeatherText} </div> 
  <div class = "display-4 my-4" ><span > ${weather.Temperature.Metric.Value} </span> <span> &deg;C </span>
  </div>
  `;
  //remove d-none class
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }

  //Change Image display
    let timeSrc = weather.IsDayTime ? 'img/day.svg' :'img/night.svg';

    //if(weather.IsDayTime){
    //  timeSrc = 'img/day.svg'
    // }else{
    //  timeSrc = 'img/night.svg'
    // }
    time.setAttribute('src', timeSrc);

    //Change Icon

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);
  
};

const updateCity = async (city) => {

  const cityDetail = await getCity(city);
  const weather = await getWeather(cityDetail.Key);

  return {
    cityDets: cityDetail, //JSON propiety : constant of the function
    weather: weather
  };
};

cityForm.addEventListener('submit', e =>{
  //prevent default action
  e.preventDefault();

  //get the city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the UI with the new city
  updateCity(city)
  .then(data => {console.log(data),updateUI(data)})
  .catch(err => console.log(err));
});