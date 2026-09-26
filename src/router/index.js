import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../features/accueil/AccueilView.vue'
import ProgrammationView from '../features/programmation/ProgrammationView.vue'
import EvenementView from '../features/evenement/EvenementView.vue'
import { useEvenementsStore } from '../stores/evenements.js'

const routes = [
  { path: '/', name: 'accueil', component: AccueilView },
  { path: '/programmation', name: 'programmation', component: ProgrammationView },
  {
    path: '/evenement/:id',
    name: 'evenement',
    component: EvenementView,
    props: true,
    beforeEnter: (to) => {
      const store = useEvenementsStore()
      if (!store.trouverEvenement(to.params.id)) {
        return { name: 'programmation' }
      }
    },
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
