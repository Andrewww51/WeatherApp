


function _load() {

    let rootE = document.getElementById("root");

    rootE.insertAdjacentHTML("beforeend", `
        <div id="container">
            <div id="left-side">
                <label for="searcher">Melyik város érdekel:</label>
                <input type="text" id="searcher">
                <ul></ul>
            </div>

            <div class="right-side">
                <span id="temperature"></span>
                <span id="feelslike"></span>
                <span id="humidity"></span>
                <span id="uv"></span>
                <span id="kph"></span>
            </div>
        </div>

    `)

    const cities = ["Brisbane", "Sydney", "Melbourne"];

    async function fetching(myCity) {
        const url = `http://api.weatherapi.com/v1/search.json?key=9281cb154626404782685014212106&q=${myCity}`;
        const response = await fetch(url);
        const responseJson = response.json();
        return responseJson;
    }

    async function dataDisplayer(event) {
        console.log(event.target.innerHTML);
        const fetshResult = await fetch(`http://api.weatherapi.com/v1/current.json?key=9281cb154626404782685014212106&q=${event.target.innerHTML}`);
        const responseJson = fetshResult.json();
        console.log(responseJson);
        return responseJson;


    }

    async function realDataDisplayer(event) {
        let weatherResult = await dataDisplayer(event);
        console.log(event.target.value);
        let pexel = await pexelFetch(event.target.innerHTML);
        

        document.getElementById("left-side").style.backgroundImage = `url(${pexel.photos[0].src.original})`
        document.querySelector("ul").innerHTML = "";

        document.getElementById("temperature").innerHTML = `Hőmérséklet: ${weatherResult.current.temp_c} C`;
        document.getElementById("feelslike").innerHTML = `Feels like: ${weatherResult.current.feelslike_c} C`;
        document.getElementById("humidity").innerHTML = `Páratartalom: ${weatherResult.current.humidity}%`;
        document.getElementById("uv").innerHTML = `UV szint: ${weatherResult.current.uv}/10`;
        document.getElementById("kph").innerHTML = `Szél: ${weatherResult.current.wind_kph} kph`;

        document.querySelector(".right-side").classList.add("visible");
        
    }

    async function pexelFetch(city) {

        const pexelBaseUrl = `https://api.pexels.com/v1/search?query=${city}`;
        const responseJson = await fetch(pexelBaseUrl, {
            headers: {
                Authorization: "563492ad6f917000010000012b71da8e1a3c42a18663456f44f69a20"
            }
        }).then(response => response.json());

        return responseJson;

    }

    async function ulMaker(event) {
        document.querySelector("ul").innerHTML = "";
        document.querySelector(".right-side").classList.remove("visible");

       if(event.target.value.length >= 4){
           myArray = await fetching(event.target.value);
           

            for(let city of myArray){
                document.querySelector("ul").insertAdjacentHTML("beforeend", `
                <li>${city.name}</li>`)
                
            }

            const liArray = document.querySelectorAll("li");

            for(let lis of liArray){
                lis.addEventListener("click", realDataDisplayer)
            }
            
       }
    
    }

    
    
    document.getElementById("searcher").addEventListener("input", ulMaker);


}


window.addEventListener("load", _load);