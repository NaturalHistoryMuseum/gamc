<template>
  <FontAwesomeIcon
    class="spinner"
    size="2xl"
    :icon="faSpinner"
  ></FontAwesomeIcon>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
</script>

<style scoped>
.spinner {
  animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
