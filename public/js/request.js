let API_CITIES = "https://api.openaq.org/v1/cities?country=FR";
let API_CITY = "https://api.openaq.org/v1/locations/?city[]=";


async function getInitialData(){
  let response = await fetch(API_CITIES, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

async function getCityData(city){
  let url = API_CITY + city;

  let response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}
