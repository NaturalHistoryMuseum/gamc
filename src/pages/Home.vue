<template>
  <div class="flex gap-2 items-center w-screen justify-center">
    <div class="w-1/2 relative mb-40">
      <input
        class="border-2 rounded-md border-gray-100 p-2 bg-white w-full"
        type="search"
        placeholder="Choose a GBIF occurrence dataset..."
        v-model="search"
        ref="searchInput"
        @keydown.down.prevent="highlightNext"
        @keydown.up.prevent="highlightPrev"
        @keydown.enter="select(datasets[highlightedIndex])"
        @keydown.esc="search = ''"
      />
      <ul v-if="datasets.length > 0" class="absolute w-full">
        <li
          v-for="(dataset, index) in datasets"
          :key="dataset.key"
          class="cursor-pointer px-2 py-0.5"
          :class="{ 'bg-amber-100': highlightedIndex === index }"
          @click="select(dataset)"
          @mouseover="highlightedIndex = index"
        >
          {{ dataset.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { searchDatasets } from '../lib/gbifApi.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchInput = ref(null);
const search = ref(null);
const datasets = ref([]);
const highlightedIndex = ref(0);

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
    const results = await searchDatasets(search.value, 10);
    datasets.value = results.map((result) => ({
      label: result.title,
      key: result.key,
    }));
    highlightedIndex.value = 0;
  }, 100);
});

async function select(dataset) {
  await router.push({ name: 'dashboard', params: { datasetKey: dataset.key } });
}

function highlightNext() {
  highlightedIndex.value = (highlightedIndex.value + 1) % datasets.value.length;
}

function highlightPrev() {
  if (highlightedIndex.value === 0) {
    highlightedIndex.value = datasets.value.length;
  }
  highlightedIndex.value = (highlightedIndex.value - 1) % datasets.value.length;
}

onMounted(() => {
  searchInput.value.focus();
});
</script>

<style scoped></style>
