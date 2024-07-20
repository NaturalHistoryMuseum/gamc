<template>
  <template v-if="loading">
    <div class="flex flex-col gap-2 w-screen items-center justify-center">
      <Spinner></Spinner>
      <div>Calculating...</div>
    </div>
  </template>
  <template v-else>
    <div class="w-screen flex flex-col p-2 bg-slate-50">
      <div class="flex-none flex justify-between px-2">
        <div class="flex items-center gap-2">
          <div class="text-3xl font-bold hover:underline">
            <a
              class="no-link"
              :href="`https://www.gbif.org/dataset/${datasetKey}`"
              target="_blank"
            >
              {{ dataset.title }}
            </a>
          </div>
        </div>
        <div class="flex gap-2">
          <ZoaModal class="z-10" :buttonArgs="{ kind: 'primary' }">
            <template v-slot:button>
              <FontAwesomeIcon :icon="faQuestion"></FontAwesomeIcon>
              Help
            </template>
            <template v-slot:header>Help</template>
            <div class="flex flex-col gap-4">
              <div>
                The chart on the left shows the number of records in this
                dataset that achieve each MIDS level. For a record to achieve a
                level it must also achieve all previous levels. The highest MIDS
                level met by all records in the dataset sets the MIDS level for
                the entire dataset.
              </div>
              <div>
                The chart on the right shows the number of records in this
                dataset which meet the requirements of each MIDS element. This
                is purely for investigative purposes and shows where each the
                dataset is lacking the required data to make a MIDS level.
              </div>
              <div>
                For more information about how these charts are created, check
                out the
                <RouterLink :to="{ name: 'about' }">about</RouterLink>
                page.
              </div>
            </div>
          </ZoaModal>
          <ZoaButton kind="primary" @click="load">
            <FontAwesomeIcon :icon="faRefresh"></FontAwesomeIcon>
            Refresh
          </ZoaButton>
        </div>
      </div>
      <div class="flex-none text-xl px-2">
        <span class="pr-2 border-r-2 border-black italic"
          >{{ total.toLocaleString() }} records</span
        >
        <span class="pl-2">{{ midsLevel }}</span>
      </div>
      <div class="grow flex flex-col xl:flex-row gap-2">
        <div class="w-full xl:w-5/12 relative p-12">
          <Bar :options="chartOptions" :data="chartData" />
        </div>
        <div class="w-full xl:w-7/12 relative p-12">
          <Bar :options="chartOptions" :data="perElementData" />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCount, getDataset } from '../lib/gbifApi.js';
import { calculateCounts, getPerElementCounts } from '../lib/mids.js';
import Spinner from '../components/Spinner.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRefresh, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ZoaButton, ZoaModal } from '@nhm-data/zoa';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const route = useRoute();
const datasetKey = ref(route.params.datasetKey);
const dataset = ref({});
const total = ref(0);
const levelCounts = ref([]);
const elementCounts = ref([]);
const loading = ref(true);
const chartOptions = ref({
  indexAxis: 'y',
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
});

const bgColours = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
];
const borderColours = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
];

onMounted(async () => {
  await load();
});

async function load() {
  loading.value = true;
  // load the dataset info first
  dataset.value = await getDataset(datasetKey.value);
  // load the number of records in the dataset
  total.value = await getCount(datasetKey.value);
  // calculate the level counts
  levelCounts.value = await calculateCounts(datasetKey.value);
  // calculate per level counts
  elementCounts.value = await getPerElementCounts(datasetKey.value);
  // indicate that loading is complete
  loading.value = false;
}

const midsLevel = computed(() => {
  const threshold = 1;
  let level = -1;
  for (const levelCount of levelCounts.value) {
    if (levelCount / total.value >= threshold) {
      level += 1;
    }
  }
  if (level === -1) {
    return 'No level';
  } else {
    return `MIDS level ${level}`;
  }
});

const chartData = computed(() => {
  return {
    labels: ['MIDS 0', 'MIDS 1', 'MIDS 2', 'MIDS 3'],
    datasets: [
      {
        label: 'Record count',
        data: levelCounts.value,
        backgroundColor: bgColours,
        borderColor: borderColours,
        borderWidth: 1,
      },
    ],
  };
});

const perElementData = computed(() => {
  const labels = [];
  const values = [];
  const bgs = [];
  const borders = [];

  elementCounts.value.forEach((elements, index) => {
    Object.entries(elements).forEach(([element, count]) => {
      labels.push(`MIDS ${index} ${element}`);
      values.push(count);
      bgs.push(bgColours[index]);
      borders.push(borderColours[index]);
    });
  });

  return {
    labels: labels,
    datasets: [
      {
        label: 'Record count',
        data: values,
        backgroundColor: bgs,
        borderColor: borders,
        borderWidth: 1,
      },
    ],
  };
});

function showHelp() {}
</script>

<style scoped></style>
