<script setup lang="ts">
import ColorInverter from './components/ColorInverter.vue'
</script>

<template>
  <div class="app-container">
    <ColorInverter />
  </div>
</template>

<style>
body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.app-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

#app {
  width: 100%;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>