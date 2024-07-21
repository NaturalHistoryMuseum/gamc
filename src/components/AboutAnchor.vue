<template>
  <h2 :id="anchorId" class="text-xl font-bold">
    {{ heading }}
    <a :href="`#${anchorId}`" class="opacity-0 hover:opacity-100">
      <FontAwesomeIcon :icon="faLink" size="sm"></FontAwesomeIcon>
    </a>
  </h2>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const { anchorId, heading } = defineProps(['anchorId', 'heading']);
</script>

<style scoped></style>
