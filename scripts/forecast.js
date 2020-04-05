const key = 'nJdr3ATxAMKDd4ANsKADKhnpQ9BVjn8h'; //API key

//get Weather information
const getWeather = async (id) => {

  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch( base + query);
  const data = await response.json();

  return data[0];
};

 //get City Information
const getCity = async (city) => {

  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';//base URL used by API
  const query = `?apikey=${key}&q=${city}`;// ? Mens adding query parameter to the end of the URL

  const response = await fetch( base + query );
  const data = await response.json();

  return data[0];
};


getCity('londrina')
.then(data => {
  return getWeather(data.Key);
})
.then( data => {
  console.log(data);
})
.catch(err => console.log(err));


