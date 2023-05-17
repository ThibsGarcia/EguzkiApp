<script setup lang="ts">

defineProps<{
    favorites: []
}>()
</script>

<template>
    <div class="container">
        <div class="content-favori flex justify-around">
            
            <div class="box-favori">
                <div class="title-box flex flex-col items-center justify-center">
                    <h3 class="text-3xl">Paris</h3>
                    <h3 class="text-lg">28, Sep 2018</h3>
                </div>
                    <div class="data-box">
                        <div class="principal-data flex flex-col justify-around items-center ">
                            <h2 class="text-6xl">36°</h2>
                            <img src="../assets/images/Icone/sun-bg.png" alt="">
                            <h4 class="text-2xl">Runnig</h4>
                        </div>
                    </div>
                <div class="week-box flex justify-around items-center">
                    <div class="sunset flex flex-col items-center ">
                        <h5 class="text-base">Monday</h5>
                        <img src="../assets/images/Icone/sun-bg.png" alt="">
                        <h5>36°</h5>
                    </div>
                    <div class="sunset flex flex-col items-center ">
                        <h5 class="text-base">Tuesday</h5>
                        <img src="../assets/images/Icone/sun-bg.png" alt="">
                        <h5>28°</h5>
                    </div>
                    <div class="sunset flex flex-col items-center ">
                        <h5 class="text-base">Wednesday</h5>
                        <img src="../assets/images/Icone/sun-bg.png" alt="">
                        <h5>12°</h5>
                    </div>
                    <div class="sunset flex flex-col items-center ">
                        <h5 class="text-base">Thurday</h5>
                        <img src="../assets/images/Icone/sun-bg.png" alt="">
                        <h5>-10°</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.container {
    height: 75vh;
    width: 100%;
    display: flex;
    .content-favori {
        height: 90%;
        width: 80%;
        margin: auto;
        .box-favori {
            width: 27%;
            border-radius: 5%;
            height: 90%;
            .title-box{
                height: 20%;
                border-radius: 5%;
            }
            .data-box{
                height: 50%;
                .principal-data {
                    height: 100%;
                    img{
                        height: 100px;
                        margin: 0px;
                        padding: 0px;
                        border-radius: 50%;
                    }
                }
            }
            .week-box{
                height: 30%;
            }
        }
    }
    .content-favori .box-favori:nth-child(1) {
            background-color: #0093E9;
            background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        }
    .content-favori .box-favori:nth-child(2) {
            background-color: #FBAB7E;
            background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
        }
    .content-favori .box-favori:nth-child(3) {
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        
    }

    img {
        height: 50px;
    }
}
</style>