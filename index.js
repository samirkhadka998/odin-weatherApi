



const APIToken = '3a2e00bc69084173884141902232204'
const upsplashaccessKey = 'D1dP_r4ksoL1wNqv401fzU7w3iPDsVGS9taVR6u01Vw';

let wrapper = document.querySelector('.wrapper');


LoadNodes();

function LoadNodes() {
  let btn = document.querySelector('button');
  let search = document.querySelector('input');
  wrapper.hidden = true;
  btn.addEventListener('click', LoadSearch)
  search.addEventListener('keyup', LoadSearch)
}



function LoadSearch(e) {
  if (e.type === "click" || (e.code && e.type === "keyup" && e.code === "Enter")) {
    let search = document.querySelector('input');
    if (!search.value) return;
    wrapper.hidden = false;
    let promise = WeatherApi(search.value);
    promise.then(res => {
      if (res.error) {
        wrapper.firstElementChild.textContent = '';
        wrapper.lastElementChild.textContent = res.error?.message;
      }
      else {
        wrapper.firstElementChild.textContent = res.location.tz_id + " - " + res.location.country;
        wrapper.children[1].textContent = res.current.temp_c + "°C / " + res.current.temp_f + "°F "
        wrapper.lastElementChild.textContent =  res.current.condition.text;
        let img = document.createElement('img');
        img.alt = "weather current icon";
        img.src = 'https:' + '//cdn.weatherapi.com/weather/64x64/night/116.png'
        wrapper.lastElementChild.appendChild(img);
        let uplashApiPromise = UplashApi(res.current.condition.text);
        uplashApiPromise.then(result => {
          if (result.error) {
            wrapper.firstElementChild.textContent = '';
            wrapper.lastElementChild.textContent = result.error?.message;
          }
          else {
            let url = `url(${result.urls.regular})`;
            document.body.style.background = url;
          }
        })


      }

    })
  }

  async function WeatherApi(value) {

    const fullResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIToken}&q=${value}&aqi=no`);
    const body = await fullResponse.json();
    return body;

  }


  async function UplashApi(query) {
    // Build the URL for the Unsplash API
    const apiUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${upsplashaccessKey}`;
    const fullResponse = await fetch(apiUrl);
    const body = await fullResponse.json();
    return body;

  }


}