<template>
  <div class="flex gap-2 items-center w-screen justify-center">
    <div class="w-1/2 relative mb-40">
      <input
        class="border-2 rounded-md border-gray-100 p-2 bg-white w-full"
        type="search"
        placeholder="Choose a GBIF occurrence dataset..."
        v-model="search"
        ref="searchInput"
      />
      <ul
        v-if="datasets.length > 0"
        class="absolute h-48 overflow-y-auto w-full"
      >
        <li
          v-for="dataset in datasets"
          :key="dataset.key"
          class="cursor-pointer hover:bg-amber-100 px-2 py-0.5"
        >
          <RouterLink
            :to="{ name: 'dashboard', params: { datasetKey: dataset.key } }"
          >
            {{ dataset.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { searchDatasets } from '../lib/gbifApi.js';

const searchInput = ref(null);
const search = ref(null);
const datasets = ref([]);

// for debouncing
let timer;

watch(search, async () => {
  if (!search.value) {
    datasets.value = [];
    return;
  }

  // debounce the search so that we don't hammer GBIF
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const results = await searchDatasets(search.value);
    datasets.value = results.map((result) => ({
      label: result.title,
      key: result.key,
    }));
  }, 100);
});

onMounted(() => {
  searchInput.value.focus();
});
</script>

<style scoped></style>
