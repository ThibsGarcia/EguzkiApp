<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import FavorisCity from '../Components/FavoriCity/FavorisCity.vue'
import type  { FavorityCityData } from '@/interfaces/FavorityCityData';

import sunIcone from '@/assets/images/Icone/sun-bg.png';
import hazeIcone from '@/assets/images/Icone/haze-bg.png';
import snowIcone from '@/assets/images/Icone/snow-bg.png';
import rainIcone from '@/assets/images/Icone/rain-bg.png';
import cloudsIcone from '@/assets/images/Icone/cloud-bg.png';

const props = defineProps<{
    input: string,
    name: string
}>()
const route = useRoute();
const inputValue = route.query.input as string;

const joursSemaine = ['Samedi','Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const moiAnnee = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre','Novembre', 'Décembre']



/**DAY 1 */
const cityName = inputValue;
const latitude = ref('');
const longitude = ref( '')
const temperature = ref<number | null >(null)
const temperatureMin = ref<number | null >(null)
const temperatureMax = ref<number | null >(null)
const temperatureFeels = ref<number | null>(null)
const description = ref('')
const time = ref('');
const timeValue = ref(null)
const timeDayJS = ref(null)
const timeHours = ref(null)
const timeMinute = ref(null)
const timeDayDate = ref(null)
const timeMouth = ref(null)

const sunset = ref<number | null>(null)
const sunsetTime = ref<number | null>(null)
const sunsetFinalHours = ref(null)
const sunsetFinalMinutes = ref(null)

const sunrise = ref<number | null>(null)
const sunriseTime = ref<number | null>(null)
const sunriseFinalHours = ref(null)
const sunriseFinalMinutes = ref(null)

const windSpeed = ref('')
const windDirection = ref('')
const precipitaion = ref('')
const humidity = ref('')

const mainIconeToday = ref('')
const imageIconToday = ref('')

const mainIcone24h = ref('')
const imageIcon24h = ref('')

const mainIcone48h = ref('')
const imageIcon48h = ref('')

const mainIcone72h = ref('')
const imageIcon72h = ref('')

const mainIcone96h = ref('')
const imageIcon96h = ref('')



/**DAY 2 */
const temperature24min = ref<number | null >(null)
const temperature24max = ref<number | null >(null)
const description24 = ref('')
const timeDay24 = ref(null)
/**DAY 3 */
const temperature48min = ref<number | null >(null)
const temperature48max = ref<number | null >(null)
const description48 = ref('')
const timeDay48 = ref(null)

/**DAY 4 */
const temperature72min = ref<number | null >(null)
const temperature72max = ref<number | null >(null)
const description72 = ref('')
const timeDay72 = ref(null)

/**DAY 5 */
const temperature96min = ref<number | null >(null)
const temperature96max = ref<number | null >(null)
const description96 = ref('')
const timeDay96 = ref(null)

const secondeTime = ref(null)

const apiKey = 'pk.eyJ1IjoibGFicm91ZXR0ZTY0IiwiYSI6ImNsaDlpNjF1cjA3cXAzZG5zZzNkbjhhMHcifQ.4e4UolxOtJun4pL-kQz5KQ';
const fetchBase = async () => {
  const urlBase = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName.value}.json?access_token=${apiKey}`;

  try {
    const response = await fetch(urlBase);
    const data = await response.json();
    latitude.value  = data.features[0].center[1];
    longitude.value = data.features[0].center[0];
    await openWeather()
  } catch (error) {
    console.log('Errreur: '+ error);
  }
  return {
    fetchBase,
}
};

const apiKeyOpenWeather = 'f648b0ccc4c551642170d44ce110afa1'
  const openWeather = async () => {
    const ulrOpenWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude.value}&lon=${longitude.value}&appid=${apiKeyOpenWeather}&units=metric&lang=fr&`;
  
    try {
      const retourOpen = await fetch (ulrOpenWeather);
      const dataOpen = await retourOpen.json();
      temperature.value = Math.trunc(dataOpen.list[0].main.temp);
      description.value = dataOpen.list[0].weather[0].description;
      temperatureFeels.value = Math.trunc(dataOpen.list[0].main.feels_like);
      temperatureMin.value = Math.trunc(dataOpen.list[0].main.temp_min) ;
      temperatureMax.value = Math.trunc(dataOpen.list[0].main.temp_max) ;
      mainIconeToday.value = dataOpen.list[0].weather[0].main;
      
      
      time.value = dataOpen.list[0].dt_txt;
      timeValue.value = new Date(parseInt(time.value) * 1000);
      timeDayJS.value = joursSemaine[timeValue.value.getDay()];
      timeDay24.value = joursSemaine[(timeValue.value.getUTCDay() + 1) % 7 ];
      timeDay48.value = joursSemaine[(timeValue.value.getUTCDay() + 2) % 7 ];
      timeDay72.value = joursSemaine[(timeValue.value.getUTCDay() + 3) % 7 ];
      timeDay96.value = joursSemaine[(timeValue.value.getUTCDay() + 4) % 7 ];
    
      secondeTime.value = new Date(time.value)
      timeHours.value = secondeTime.value.getHours();
      timeMinute.value = timeValue.value.getMinutes();
      timeDayDate.value = secondeTime.value.getDate();
      timeMouth.value = moiAnnee[(secondeTime.value.getUTCMonth())];
      
      
      
      windSpeed.value = dataOpen.list[0].wind.speed;  
      windDirection.value = dataOpen.list[0].wind.deg;
      precipitaion.value = dataOpen.list[0].rain;
      humidity.value = dataOpen.list[0].main.humidity;
      sunrise.value = dataOpen.city.sunrise;
      sunset.value = dataOpen.city.sunset;
      
      sunsetTime.value = new Date(parseInt(sunrise.value) * 1000);
      sunsetFinalHours.value = sunsetTime.value.getUTCHours();
      sunsetFinalMinutes.value = sunsetTime.value.getUTCMinutes();
      
      sunriseTime.value = new Date(parseInt(sunset.value) * 1000);
      sunriseFinalHours.value = sunriseTime.value.getUTCHours();
      sunriseFinalMinutes.value = sunriseTime.value.getUTCMinutes();
      
      
      temperature24min.value = Math.trunc(dataOpen.list[1].main.temp_min);
      temperature24max.value = Math.trunc(dataOpen.list[1].main.temp_max);
      description24.value = dataOpen.list[1].weather[0].description;
      mainIcone24h.value = dataOpen.list[1].weather[0].main;
      
      temperature48min.value = Math.trunc(dataOpen.list[2].main.temp_min);
      temperature48max.value = Math.trunc(dataOpen.list[2].main.temp_max);
      description48.value = dataOpen.list[2].weather[0].description;
      mainIcone48h.value = dataOpen.list[2].weather[0].main;

      temperature72min.value = Math.trunc(dataOpen.list[3].main.temp_min);
      temperature72max.value = Math.trunc(dataOpen.list[3].main.temp_max);
      description72.value = dataOpen.list[3].weather[0].description;
      mainIcone72h.value = dataOpen.list[3].weather[0].main;

      temperature96min.value = Math.trunc(dataOpen.list[4].main.temp_min);
      temperature96max.value = Math.trunc(dataOpen.list[4].main.temp_max);
      description96.value = dataOpen.list[4].weather[0].description;
      mainIcone96h.value = dataOpen.list[4].weather[0].main;

        switch(mainIconeToday.value) {
             case "Clear":
             imageIconToday.value = sunIcone;
                break;

            case "Clouds":
            imageIconToday.value = cloudsIcone;
                break;

            case "Rain":
            imageIconToday.value = rainIcone;
                break;

            case "Snow":
            imageIconToday.value = snowIcone;
                break;
            
            case "Haze":
            imageIconToday.value = hazeIcone;
                break;
            
            default :
            imageIconToday.value = sunIcone;
        }
        switch(mainIcone24h.value) {
             case "Clear":
             imageIcon24h.value = sunIcone;
                break;

            case "Clouds":
            imageIcon24h.value = cloudsIcone;
                break;

            case "Rain":
            imageIcon24h.value = rainIcone;
                break;

            case "Snow":
            imageIcon24h.value = snowIcone;
                break;
            
            case "Haze":
            imageIcon24h.value = hazeIcone;
                break;
            
            default :
            imageIcon24h.value = sunIcone;
        }
        switch(mainIcone48h.value) {
             case "Clear":
             imageIcon48h.value = sunIcone;
                break;

            case "Clouds":
            imageIcon48h.value = cloudsIcone;
                break;

            case "Rain":
            imageIcon48h.value = rainIcone;
                break;

            case "Snow":
            imageIcon48h.value = snowIcone;
                break;
            
            case "Haze":
            imageIcon48h.value = hazeIcone;
                break;
            
            default :
            imageIcon48h.value = sunIcone;
        }
        switch(mainIcone72h.value) {
             case "Clear":
             imageIcon72h.value = sunIcone;
                break;

            case "Clouds":
            imageIcon72h.value = cloudsIcone;
                break;

            case "Rain":
            imageIcon72h.value = rainIcone;
                break;

            case "Snow":
            imageIcon72h.value = snowIcone;
                break;
            
            case "Haze":
            imageIcon72h.value = hazeIcone;
                break;
            
            default :
            imageIcon72h.value = sunIcone;
        }
        switch(mainIcone96h.value) {
             case "Clear":
             imageIcon96h.value = sunIcone;
                break;

            case "Clouds":
            imageIcon96h.value = cloudsIcone;
                break;

            case "Rain":
            imageIcon96h.value = rainIcone;
                break;

            case "Snow":
            imageIcon96h.value = snowIcone;
                break;
            
            case "Haze":
            imageIcon96h.value = hazeIcone;
                break;
            
            default :
            imageIcon96h.value = sunIcone;
        }
    } catch (errorOpen) {
      console.log(errorOpen)
    }
  }

onMounted(() => {
  fetchBase();
});

const stateLove = reactive<{
    open: boolean
}>({
    open: false
})

const weatherData = ref<FavorityCityData | null>(null);
const favorites = ref<FavorityCityData[]>([]);

function addToFavorites() {
    const temperatureValue = parseFloat(temperature.value);
    const timeHoursValue = timeHours.value !== null ? timeHours.value : 0;
    const timeMinutesValue = timeMinute.value !== null ? timeMinute.value : 0;


    const weatherDataToAdd = {
    cityName: inputValue,
    temperature: temperatureValue,
    temperature24max: temperature24max.value,
    temperature48max: temperature48max.value,
    temperature72max: temperature72max.value,
    temperature96max: temperature96max.value,
    description: description.value,

    timeDayJS: timeDayJS.value,
    timeMouth: timeMouth.value,
    timeDayDate: timeDayDate,
    timeHours: timeHoursValue,
    timeMinute: timeMinutesValue,
    timeDay24: timeDay24.value,
    timeDay48: timeDay48.value,
    timeDay72: timeDay72.value,
    timeDay96: timeDay96.value,

    imageIconToday: imageIconToday.value,
    imageIcon24h: imageIcon24h.value,
    imageIcon48h: imageIcon48h.value,
    imageIcon72h: imageIcon72h.value,
    imageIcon96h: imageIcon96h.value,
    }
    favorites.value.push(weatherDataToAdd);

    //Ajout au stockage local
    localStorage.setItem("favorites", JSON.stringify(favorites.value))
}
function deleteFromFavorites(index) {
  // Vérifie si l'index est valide
  if (index >= 0 && index < favorites.value.length) {
    // Supprime l'élément à l'index spécifié
    favorites.value.splice(index, 1);

    // Met à jour le stockage local
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }
}


    /**SAVEUGARDE DES VILLES DANS LE FAVORIE */
    const savedFavorites = localStorage.getItem("favorites")
    if(savedFavorites) {
        favorites.value = JSON.parse(savedFavorites)
    }

</script>

<template>
    <div class="container-city">
        <div class="content-city">
            <div class="content-header flex justify-between items-center z-10">
                <div v-if="stateLove.open" class="love-container flex flex-col justify-between absolute w-1/5  top-5 right-5 rounded-xl z-20">
                    <button class="absolute right-3 top-2" @click="stateLove.open = false"><span><i class="fa-solid fa-xmark fa-xl" style="color: #ffffff;"></i></span></button>
                    <FavorisCity
                    :stateLove="stateLove"
                    :favorites="favorites"
                    @add-to-favorites="addToFavorites"
                    @delete-from-favorites="deleteFromFavorites" />
                </div>
                <div class="header-left flex items-center justify-between">
                        <h2 class="text-4xl">Eguzki</h2>
                        <img class="h-full" src="@/assets/images/Icone/location.gif" alt="">
                        <H4 class="text-3xl capitalize">{{cityName}}</H4>
                        <div class="time">
                            <span class="text-xl">{{ timeHours }} : {{ timeMinute }}</span>
                        </div>
                </div>
                <div class="header-right flex items-center justify-between">
                    <div class="header-traduction flex justify-between w-1/4">
                        <h4 class="text-xl">FR</h4>
                        <span>|</span>
                        <h4 class="text-xl">EN</h4>
                    </div>
                    <div class="addLove h-full flex items-center">
                        <button class="btn-add" @click="addToFavorites">Favori</button>     
                    </div>
                    <div class="header-search w-1/5">
                        <img @click="stateLove.open = !stateLove.open" src="../assets/images/Icone/heart.gif" alt="">
                    </div>
                </div>
            </div> 
            <div class="big-content flex flex-col justify-end items-center">
                <div class="content-today flex justify-between">
                    <div class="today-left flex justify-around items-center">
                        <div class="data-left w-2/5 h-4/6  flex flex-col justify-around items-center">
                            <div class="icone flex items-center justify-center">
                                <img class="thibs" :src="imageIconToday">
                            </div>
                            <div class="principale-date flex flex-col items-center w-full text-cyan-700 font-semibold">
                                <div class="flex justify-between w-3/6">
                                    <h5 class="capitalize">sunset:</h5>
                                    <span>{{ sunsetFinalHours }}: {{ sunsetFinalMinutes }}</span>
                                </div>
                                <div class="flex justify-between w-3/6">
                                    <h5 class="capitalize">Sunrise:</h5>
                                    <span>{{ sunriseFinalHours }} : {{ sunriseFinalMinutes }}</span>
                                </div>
                            </div>                         
                        </div>
                        <div class="data-principal w-2/5 h-3/4 flex flex-col justify-around items-center">
                            <div class="principale-date flex items-center">
                                <div>
                                <p class="text-xl font-bold capitalize text-cyan-700">{{ timeDayJS }} {{ timeDayDate }} {{ timeMouth }}</p>
                                </div>
                            </div>
                            <div class="principale-temp flex">
                                <h2 class="text-6xl big-temp"> {{ temperature }}°C</h2>
                            </div>
                            <div class="flex">
                                <h4 class="text-2xl text-cyan-700">Ressenti: <span>{{ temperatureFeels }} °</span></h4>
                            </div>
                        </div>
                    </div>
                    <div class="today-right text-white">
                        <div class="content-right flex justify-around items-center">
                            <div class="wind w-1/5 h-5/6 flex flex-col justify-around">
                                <div class="wind-title h-1/4 flex justify-center items-center">
                                    <h5 class="text-xl font-semibold">Vent</h5>
                                </div>
                                <div class="wind-speed h-2/6 flex items-center justify-center">
                                    <i class="fa-solid fa-wind fa-2xl"></i>
                                </div>
                                <div class="wind-direction h-2/6 flex flex-col items-center ">
                                    <h5 class="text-base">Rafales : <span>{{ windSpeed }} m/s</span></h5>
                                </div>
                            </div>
                            <div class="wind w-1/5 h-5/6 flex flex-col justify-around">
                                <div class="wind-title h-1/4 flex justify-center items-center">
                                    <h5 class="text-xl font-semibold">Humidité</h5>
                                </div>
                                <div class="wind-speed h-2/6 flex items-center justify-center">
                                    <i class="fa-solid fa-droplet fa-2xl"></i>
                                </div>
                                <div class="wind-direction h-2/6 flex flex-col items-center ">
                                    <h5 class="text-base"> <span>{{ humidity }} %</span></h5>
                                </div>
                            </div>
                            <div class="wind w-1/5 h-5/6 flex flex-col justify-around">
                                <div class="wind-title h-1/4 flex justify-center items-center ">
                                    <h5 class="text-xl font-semibold">Temperature</h5>
                                </div>
                                <div class="wind-speed h-2/6 flex items-center justify-center ">
                                    <i class="fa-solid fa-temperature-three-quarters fa-2xl"></i>
                                </div>
                                <div class="wind-direction h-2/6 flex flex-col items-center justify-around">
                                    <div class="flex justify-around w-3/4">
                                        <h5 class="text-base">Max</h5>
                                        <h5 class="text-base">{{ temperatureMax }}°</h5>
                                    </div>
                                    <div class="flex justify-around w-3/4">
                                        <h5 class="text-base">Min</h5>
                                        <h5 class="text-base">{{ temperatureMin }}°</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="side-bar flex items-end">
                    <div class="bar4 w-full h-px bg-slate-300"></div>
                </div>
                <div class="content-week">
                    <div class="week-data h-full w-11/12 m-auto flex items-center justify-around">
                        <div class="data-box w-1/12 h-4/5 flex flex-col justify-between items-center">
                            <div class="title-box">
                                <p class="font-bold text-xl text-white">{{timeDay24}}</p>
                            </div>
                            <div class="middle-box">
                                <p class="text-base text-slate-400">min <span class="font-bold text-white">{{ temperature24min }}°</span></p>
                                <p class="text-base text-slate-400">max <span class="font-bold text-white">{{ temperature24max}}°</span></p>
                            </div>
                            <div class="down-box">
                                <img class="thibs" :src="imageIcon24h">
                                <p class="text-base text-slate-400 capitalize text-center">{{ description24 }}</p>
                            </div>
                        </div>
                        <div class="data-box w-1/12 h-4/5 flex flex-col justify-between items-center">
                            <div class="title-box">
                                <p class="font-bold text-xl text-white">{{ timeDay48 }}</p>
                            </div>
                            <div class="middle-box">
                                <p class="text-base text-slate-400">min <span class="font-bold text-white">{{ temperature48min }}°</span></p>
                                <p class="text-base text-slate-400">max <span class="font-bold text-white">{{ temperature48max }}°</span></p>
                            </div>
                            <div class="down-box">
                                <img class="thibs" :src="imageIcon48h">
                                <p class="text-base text-slate-400 capitalize text-center">{{ description48 }}</p>
                            </div>
                        </div>
                        <div class="data-box w-1/12 h-4/5 flex flex-col justify-between items-center">
                            <div class="title-box">
                                <p class="font-bold text-xl text-white">{{ timeDay72 }}</p>
                            </div>
                            <div class="middle-box">
                                <p class="text-base text-slate-400">min <span class="font-bold text-white">{{ temperature72min }}°</span></p>
                                <p class="text-base text-slate-400">max <span class="font-bold text-white">{{ temperature72max }}°</span></p>
                            </div>
                            <div class="down-box">
                                <img class="thibs" :src="imageIcon72h">
                                <p class="text-base text-slate-400 capitalize text-center">{{ description72 }}</p>
                            </div>
                        </div>
                        <div class="data-box w-1/12 h-4/5 flex flex-col justify-between items-center">
                            <div class="title-box">
                                <p class="font-bold text-xl text-white">{{ timeDay96 }}</p>
                            </div>
                            <div class="middle-box">
                                <p class="text-base text-slate-400">min <span class="font-bold text-white">{{ temperature96min }}°</span></p>
                                <p class="text-base text-slate-400">max <span class="font-bold text-white">{{ temperature96max }}°</span></p>
                            </div>
                            <div class="down-box">
                                <img class="thibs" :src="imageIcon96h">
                                <p class="text-base text-slate-400 capitalize text-center">{{ description96 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">

.container-city{
    position: relative;
    background-image: url(../assets/images/HomePage/Template4-site-web.jpg);
    background-position: center;
    background-size: cover;
    height: 100vh;
    .content-city {
        width: 95%;
        margin: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        .love-container{
            background-color: #9ab7bf;

        }
        .content-header{
            height: 10vh;
            color: white;
            .header-left, .header-right{
                height: 80%;
            }
            .header-left{
                width: 30%;
                }
            }
            .addLove{
                .btn-add{
                    background-image: linear-gradient(to right, #70e1f5 0%, #ffd194  51%, #70e1f5  100%);
                    padding: 8px;
                    text-align: center;
                    text-transform: uppercase;
                    transition: 0.5s;
                    background-size: 200% auto;
                    color: white;            
                    box-shadow: 0 0 5px #eee;
                    border-radius: 10px;
                    display: block;
                    width: 100px;
                    background-color: #4a828a;
                    background-image: linear-gradient(to right, #5ec3d4 0%, #e59b96 100%);
                }
                .btn-add:hover {
                    background-position: right center; /* change the direction of the change here */
                    color: #fff;
                    text-decoration: none;
                }
            }
            .header-right {
                width: 20%;
            }
        }
        .big-content{
            height: 85%;
        }
        .content-today {
            width: 90%;
            height: 35%;
        }
        .content-week {
            width: 95%;
            height: 35%;
        }
        .side-bar{
            height: 5%;
            width: 85%;
        }
        .content-today{

            .today-left {
                width: 45%;
            }
            .today-right {
                width: 50%;
            }
            .today-left{
                height: 100%;
               
            }
            .today-right{   
                .content-right{
                    height:100%;
                    border-radius: 2%;
                    background-color: rgba(0, 0, 0, 0.2); /* noir semi-transparent */
                    backdrop-filter: blur(2px); /* ajoute du flou */
                    -webkit-backdrop-filter: blur(2px); /* pour une compatibilité avec les navigateurs WebKit */
                }

            }
        }
    }
.time{
                    padding: 8px;
                    text-align: center;
                    text-transform: uppercase;
                    transition: 0.5s;
                    background-size: 200% auto;
                    color: white;            
                    box-shadow: 0 0 5px #eee;
                    border-radius: 10px;
                    display: block;
                    width: 100px;
}
   .container-city::before {
  content: ""; /* nécessaire pour que le pseudo-élément s'affiche */
position: absolute; /* nécessaire pour positionner le pseudo-élément */
top: 0;
right: 0;
bottom: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.1); /* noir semi-transparent */
z-index: 1;
}
.big-temp{
    color: #e5443c;
}
</style>