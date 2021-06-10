// const apiKey = '008f0b380d6bcab84fd9ea26f848f87b'
// const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
// const urlIcon = 'http://openweathermap.org/img/wn/10d@2x.png'


const containerInfo = document.querySelector('.container-info')
const container = document.querySelector('.container')

const search = ()=>{
    const ciudad = city.value
    city.value = ""
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=008f0b380d6bcab84fd9ea26f848f87b`)
        .then(resp => resp.json())
        .then(data =>{
            if(data.cod === '404'){
                alert(data.message)
            }else if(data.cod === '400'){
                alert(data.message)
            }else{
                const article = document.createElement('article')
                article.className = 'card';
                const city = document.createElement('p')
                city.className = 'card-city'
                city.textContent = data.name
                
                
                const cardTemp = document.createElement('div')
                cardTemp.className = 'card-temp'
                const cardTempp = document.createElement('p')
                cardTempp.textContent = farToCe(data.main.temp) +'°c'
                const cardTempimg = document.createElement('img')
                cardTempimg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
                cardTemp.append(cardTempp, cardTempimg)
                const cardWeather = document.createElement('div')
                cardWeather.className = 'card-weather'
                const cardWeatherW = document.createElement('p')
                cardWeatherW.textContent = 'Weather: '
                const span1 = document.createElement('span')
                span1.textContent = data.weather[0].main
                cardWeatherW.append(span1)
                const cardWeatherMin = document.createElement('p')
                cardWeatherMin.textContent = 'Temp Min: '
                const span2 = document.createElement('span')
                span2.textContent = farToCe(data.main.temp_min) +'°c'
                cardWeatherMin.append(span2)
                const cardWeatherMax = document.createElement('p')
                cardWeatherMax.textContent = 'Temp Max: '
                const span3 = document.createElement('span')
                span3.textContent =farToCe(data.main.temp_max) +'°c'
                cardWeatherMax.append(span3)
                cardWeather.append(cardWeatherW, cardWeatherMax, cardWeatherMin)
                article.append(city, cardTemp, cardWeather)
                
                container.appendChild(article)

                if(container.children[0].className == 'container-info'){
                    container.removeChild(containerInfo)
                }
            }
            
        })
        .catch((error) => {
            console.error('Erro:', error);
        })
}
const farToCe = (far)=>{
    
    return (far - 273.15).toFixed(1);
}

const city = document.querySelector('.nav-city');

const buttonSubmit = document.querySelector('.nav-button');
buttonSubmit.addEventListener('click', search)
const buttonClear = document.querySelector('.nav-button-clear')
buttonClear.addEventListener('click', ()=>{
    const container = document.querySelector('.container')
    
    container.appendChild(containerInfo)
    
    while (container.children[0].className == 'card') {
        container.removeChild(container.children[0]);
    }

})

