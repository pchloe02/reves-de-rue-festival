import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../features/home/HomeView.vue'
import ProgramView from '../features/program/ProgramView.vue'
import EventView from '../features/event/EventView.vue'
import FavoritesView from '../features/favorites/FavoritesView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/programmation', name: 'program', component: ProgramView },
  { path: '/favoris', name: 'favorites', component: FavoritesView },
  {
    path: '/evenement/:id',
    name: 'event',
    component: EventView,
    props: true,
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
