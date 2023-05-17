<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { onMounted, ref } from 'vue';
import Favori from './Favori.vue';
import type { FavorityCityData } from "@/interfaces/FavorityCityData";
 

const input = ref<string>('')
const favorites = ref<FavorityCityData[]>([]);

const addToFavorites = () => {
    const inputValue = input.value.trim();
    if (inputValue) {
        const newFavorite: FavorityCityData = {
            cityName: inputValue,
            temperature: 0,
            temperature24max: 0,
            temperature48max: 0,
            temperature72max: 0,
            temperature96max: 0,
            description: '',
            timeHours: 0,
            timeMinute: 0,
            imageIconToday: '',
            imageIcon24h: '',
            imageIcon48h: '',
            imageIcon72h: '',
            imageIcon96h: '',
            timeDayDate: 0,
            timeDayJS: 0,
            timeMouth: 0,
            timeDay24:'',
            timeDay48:'',
            timeDay72:'',
            timeDay96:'',
        };
        favorites.value.push(newFavorite);
        input.value = '';
        localStorage.setItem("favorites", JSON.stringify(favorites.value))
    }
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

const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites.value = JSON.parse(savedFavorites);
    }
}

onMounted(() => {
    loadFavorites();
});


</script>

<template>
    <div class="container-home">
        <div class="content-input flex flex-col items-center">
            <div class="logo h-full w-full">
                <div class="title-logo h-4/6 flex items-end">
                    <h2 class="text-4xl font-semibold">EguzkiApp</h2>
                </div>
            </div>
            <form >
                <input v-model="input" class="input-home" type="text" placeholder="Recherche du lieu">
                <router-link :to="{ name: 'cityMeteo', query: { input: input } }">
                    <button class="btn-home">
                        <span><img class="loupe" src="../assets/images/HomePage/loupe.png" alt=""></span>
                    </button>
                </router-link>
            </form>
        </div>
        <div class="container h-4/6">
            <div class="content-favori flex justify-center h-full">
                <div v-for="(favorite, index) in favorites" :key="index" class="favorite-item flex items-center">
                    <div class="box-favori m-5 rounded-xl h-5/6 flex flex-col justify-around">
                        <div class="title-box flex flex-col items-center justify-center">
                            <div class="flex justify-end w-3/4">
                                <button @click="deleteFromFavorites(index)"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                            <h3 class="text-3xl capitalize">{{favorite.cityName}}</h3>
                            <h3 class="text-lg">{{ favorite.timeDayJS }} {{ favorite.timeDayDate }} {{ favorite.timeMouth }}</h3>
                        </div>
                            <div class="data-box">
                                <div class="principal-data flex flex-col justify-around items-center ">
                                    <h2 class="text-6xl">{{ favorite.temperature }}°</h2>
                                    <div class="icone-meteo h-16 w-16 bg-cover bg-center" :style="{ backgroundImage: `url(${favorite.imageIconToday})` }"></div>
                                    <h4 class="text-2xl capitalize">{{ favorite.description }}</h4>
                                </div>
                            </div>
                        <div class="week-box flex justify-around items-center">
                            <div class="sunset flex flex-col items-center ">
                                <h5 class="text-base">{{favorite.timeDay24}}</h5>
                                <div class="icone-meteo h-16 w-16 bg-cover bg-center" :style="{ backgroundImage: `url(${favorite.imageIcon24h})` }"></div>
                                <h5>{{favorite.temperature24max}}°</h5>
                            </div>
                            <div class="sunset flex flex-col items-center ">
                                <h5 class="text-base">{{favorite.timeDay48}}</h5>
                                <div class="icone-meteo h-16 w-16 bg-cover bg-center" :style="{ backgroundImage: `url(${favorite.imageIcon48h})` }"></div>
                                <h5>{{favorite.temperature48max}}°</h5>
                            </div>
                            <div class="sunset flex flex-col items-center ">
                                <h5 class="text-base">{{favorite.timeDay72}}</h5>
                                <div class="icone-meteo h-16 w-16 bg-cover bg-center" :style="{ backgroundImage: `url(${favorite.imageIcon72h})` }"></div>
                                <h5>{{favorite.temperature72max}}°</h5>
                            </div>
                            <div class="sunset flex flex-col items-center ">
                                <h5 class="text-base">{{favorite.timeDay96}}</h5>
                                <div class="icone-meteo h-16 w-16 bg-cover bg-center" :style="{ backgroundImage: `url(${favorite.imageIcon96h})` }"></div>
                                <h5>{{favorite.temperature96max}}°</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container-home{
    background-image: url(../assets/images/HomePage/Template3-site-web.jpg);
    background-size: cover;
    background-position: center;
    height: 100vh;
    .content-input {
        width: 90%;
        height: 25% ;
        margin: auto;
        form {
            display: flex;
            justify-content: space-around;      
          .input-home, .btn-home {
            background-image: linear-gradient(to right, #70e1f5 0%, #ffd194  51%, #70e1f5  100%);
            margin: 10px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
            height: 55px;
        }
        
        .input-home:hover, .btn-home:hover {
            background-position: right center; /* change the direction of the change here */
            color: #fff;
            text-decoration: none;
        }
        .input-home {
            padding: 15px 45px;
        }
        .btn-home{
            padding: 15px 25px;
        }
        ::-webkit-input-placeholder {
            color: #fff;
        }
        .loupe {
            width: 100%;
            height: 100%;
        }
        
        }
    }
}
    .box-favori {
        background-color: #ff6225;
background-image: linear-gradient(225deg, #ff6225 0%, #6ddecd 51%, #e38b63 87%);

    }
    img {
        height: 50px;
    }

</style>