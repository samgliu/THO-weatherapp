const weatherObj = (name, temp, feeltemp, sky, humidity, wind) => {
    let mname = name;
    let mctemp = Math.round(temp - 273);
    let mftemp = Math.round((mctemp * 9) / 5) + 32;
    let mcfeeltemp = Math.round(feeltemp - 273);
    let mffeeltemp = Math.round((mcfeeltemp * 9) / 5) + 32;
    let msky = sky;
    let mhumidity = humidity;
    let mwind = wind;
    let tempunit = "F"; // C or F

    const getName = () => mname;
    const getTemp = () => {
        if (tempunit === "F") {
            return mftemp + " °F";
        } else {
            return mctemp + " °C";
        }
    };
    const getFeeltemp = () => {
        if (tempunit === "F") {
            return mffeeltemp + " °F";
        } else {
            return mcfeeltemp + " °C";
        }
    };
    const getSky = () => msky;
    const getHumidity = () => mhumidity;
    const getWind = () => mwind;
    const setTempUnit = (theUnit) => {
        tempunit = theUnit;
    };
    const getTempUnit = () => tempunit;

    return {
        getName,
        getTemp,
        getFeeltemp,
        getSky,
        getHumidity,
        getWind,
        setTempUnit,
        getTempUnit,
    };
};

function jsonToObj(resultData) {
    let name = resultData.name;
    let temp = resultData.main.temp;
    let feeltemp = resultData.main.feels_like;
    let sky = resultData.weather[0]["description"];
    sky = sky[0].toUpperCase() + sky.substring(1);
    let humidity = resultData.main.humidity;
    let wind = resultData.wind.speed;
    return weatherObj(name, temp, feeltemp, sky, humidity, wind);
}

async function getWeather(loc) {
    let locat = loc;
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
            locat +
            "&APPID=504903876b494379f756e53fa8b8d2d2",
        { mode: "cors" }
    );
    const getData = await response.json();
    return getData;
}

async function weather(city) {
    try {
        let weathObject;
        let loc = city;

        let theData = await getWeather(loc).then(function (result) {
            weathObject = jsonToObj(result);
            if (document.getElementById("tempunit").checked === true) {
                weathObject.setTempUnit("C");
            }
            document.getElementById("msg").innerHTML = "";
            pushToDom(weathObject);
        });
    } catch (err) {
        document.getElementById("msg").innerHTML =
            "Something went wrong, please try again.";
    }
}

function clickweather() {
    let loc = document.getElementById("searchKeyword").value;
    weather(loc);
}

async function pushToDom(wobj) {
    document.getElementById("name").innerHTML = wobj.getName();
    document.getElementById("temp").innerHTML = wobj.getTemp();
    document.getElementById("feeltemp").innerHTML = wobj.getFeeltemp();
    document.getElementById("sky").innerHTML = wobj.getSky();
    document.getElementById("humidity").innerHTML = wobj.getHumidity();
    document.getElementById("wind").innerHTML = wobj.getWind();
}

document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        clickweather();
    }
});

function defaultLoader() {
    weather("new york");
}
defaultLoader();
