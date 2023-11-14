



const APIToken = '3a2e00bc69084173884141902232204'
const upsplashaccessKey = 'D1dP_r4ksoL1wNqv401fzU7w3iPDsVGS9taVR6u01Vw';


LoadNodes();

function LoadNodes() {
  let btn = document.querySelector('button');
  let search = document.querySelector('input');

  btn.addEventListener('click', LoadSearch)
  search.addEventListener('keyup', LoadSearch)
}



function LoadSearch(e) {
  if (e.type === "click" || (e.code && e.type === "keyup" && e.code === "Enter")) {
    console.log(e)
    let search = document.querySelector('input');
    let wrapper = document.querySelector('.wrapper');
    if (!search.value) return;

    let promise = WeatherApi(search.value);
    promise.then(res => {
      if (res.error) {
        wrapper.textContent = res.error?.message;
      }
      else {
        console.log(res)
        wrapper.textContent = JSON.stringify(res);
        let uplashApiPromise = UplashApi(res.current.condition.text);
        uplashApiPromise.then(result => {
          if (result.error) {
            wrapper.textContent = result.error?.message;
          }
          else {
            // document.body.style.background ="url(https://images.unsplash.com/photo-1628018257710-753a94fc106a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Mjc3ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk5NzMzOTZ8&ixlib=rb-4.0.3&q=80&w=1080)"
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