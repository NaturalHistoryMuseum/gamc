import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard.vue';
import NotFound from './pages/NotFound.vue';
import About from './pages/About.vue';
import { Zoa } from '@nhm-data/zoa';
import '@nhm-data/zoa/theme';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  {
    path: '/dashboard/:datasetKey?',
    name: 'dashboard',
    component: Dashboard,
    props: true,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory('/gamc/'),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(Zoa);
app.mount('#app');
