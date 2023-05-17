<script setup lang="ts">
import type { FavorityCityData } from '@/interfaces/FavorityCityData';
import { computed, defineProps, defineEmits, ref } from 'vue';



const props = defineProps<{
    favorites: FavorityCityData
}>()

const emit = defineEmits<{
    (e: 'deleteFromFavorites', index: string) : void 
}>()

const deleteFromFavorites = (index : string) => {
    emit('deleteFromFavorites', index)
}
</script>

<template>                 
    <!--<img class="thibs" :src="imageIconToday">-->
    <ul class="w-10/12">
        <li v-for="(favorite, index) in props.favorites" :key="favorite.cityName">
            <div class="h-20 flex justify-around items-center rounded-xl mb-5 contentBox">
                <div class="temperature-love w-1/5">
                    <h4 class="text-4xl">{{ favorite.temperature }}°</h4>
                </div>
                <div class="description-love w-2/5">
                    <h4 class="text-2xl capitalize">{{ favorite.cityName }}</h4>
                     <div class="description-time flex justify-between">
                        <h4 class="text-base capitalize">{{ favorite.description }}</h4>
                        <h4 class="text-base">{{ favorite.timeHours }}h{{ favorite.timeMinute }}</h4>
                    </div>
                </div>
                <div class="icone-love w-1/5 h-full">
                    <div class="flex justify-end">
                        <button @click="deleteFromFavorites(index)"><i class="fa-solid fa-xmark" style="color: #ffffff;"></i></button>
                    </div>
                    <div class="icone-meteo h-10 bg-cover bg-center" :style="{ backgroundImage: `url(${favorite.imageIconToday})` }">
                    </div>
                </div>
            </div>          
        </li>                  
    </ul>
</template>                                


<style scoped lang="scss">
.contentBox {
    background-color: #e4a69a;
}
</style>