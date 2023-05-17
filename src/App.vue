<script setup lang="ts">import { ref } from 'vue';


const input = ref<string>('')

</script>

<template>
      <RouterView :input="input">
      </RouterView>
</template>

<style lang="scss" scoped>
@import '@/assets/base.scss';

.btn{
      margin-left: 10px;
      padding: 5px;
      border: 1px solid red;
      background-color: gainsboro;
}
</style>
