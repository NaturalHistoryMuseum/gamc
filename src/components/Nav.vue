<template>
  <div class="flex pl-2 gap-2 items-center bg-amber-100">
    <RouterLink
      class="no-link hover:border-b-2 border-b-amber-400 h-full py-5 px-4"
      :to="{ name: 'home' }"
    >
      Home
    </RouterLink>
    <RouterLink
      class="no-link hover:border-b-2 border-b-amber-400 h-full py-5 px-4"
      :to="{ name: 'about' }"
    >
      About
    </RouterLink>
    <a
      class="no-link hover:border-b-2 border-b-amber-400 h-full py-5 px-4"
      href="https://www.tdwg.org/community/cd/mids/"
      target="_blank"
    >
      MIDS
      <FontAwesomeIcon
        class="pl-1"
        size="sm"
        :icon="faArrowUpRightFromSquare"
      ></FontAwesomeIcon>
    </a>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
</script>

<style scoped></style>
