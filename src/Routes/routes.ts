import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "../Components/HomePage.vue";
import CityMeteo from "../Components/CityMeteo.vue";
import Favori from '../Components/Favori.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/cityMeteo',
        name: 'cityMeteo',
        component: CityMeteo,
        props: (route) => ({ input: route.query.input }),
    },
    {
        path: '/HomePage',
        component: HomePage,
        children: [
            {path: 'favori', component: Favori},
        ]
    },
    {
        path: '/:wild(.*)',
        component: HomePage,    /**Je crée une page qui fonctionne avec toute les demandes */
    }
    /**{
        path: '/cityMeteo/param*', je peux tranferer 0 ou plusieur parametre age/nom/pays
        component: CityMeteo,
    }, */
]

