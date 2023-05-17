<script setup lang="ts">
import { reactive, ref } from 'vue';
import FavoriBox from './FavoriBox.vue';
import type { FavorityCityData } from '@/interfaces/FavorityCityData';

const stateLove = reactive<{
    open: boolean,
}>({
    open: false
})
const props = defineProps<{
    favorites: FavorityCityData[]
}>()



const emit = defineEmits<{
    (e: 'addToFavorites') : void
    (e: 'deleteFromFavorites', index: string): void
}>()
</script>

<template>
                    <div class=" title-love flex justify-around items-center h-24">
                        <div>
                            <h2 class="text-4xl text-white">Favori</h2>
                        </div>
                    </div>
                    <div class="city-love-content flex flex-col items-center">
                            <FavoriBox 
                            @add-to-favorites="emit('addToFavorites')"
                            @delete-from-favorites="emit('deleteFromFavorites', $event)"
                            :favorites="props.favorites"/>
                    </div>
</template>

<style scoped lang="scss">
</style>