<template>
  <Nav class="h-16"></Nav>
  <main class="flex justify-center">
    <RouterView></RouterView>
  </main>
</template>

<script setup>
import Nav from './components/Nav.vue';
</script>

<style scoped>
main {
  min-height: calc(100vh - 64px);
}
</style>
