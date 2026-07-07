import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SizeView from '../views/SizeView.vue'
import BaseView from '../views/BaseView.vue'
import FlavorsView from '../views/FlavorsView.vue'
import LiquidAdditivesView from '../views/LiquidAdditivesView.vue'
import SolidAdditivesView from '../views/SolidAdditivesView.vue'
import SummaryView from '../views/SummaryView.vue'
import SuccessView from '../views/SuccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tamanho',
      name: 'size',
      component: SizeView,
    },
    {
      path: '/base',
      name: 'base',
      component: BaseView,
    },
    {
      path: '/sabores',
      name: 'flavors',
      component: FlavorsView,
    },
    {
      path: '/adicionais-liquidos',
      name: 'liquid-additives',
      component: LiquidAdditivesView,
    },
    {
      path: '/adicionais-solidos',
      name: 'solid-additives',
      component: SolidAdditivesView,
    },
    {
      path: '/resumo',
      name: 'summary',
      component: SummaryView,
    },
    {
      path: '/sucesso',
      name: 'success',
      component: SuccessView,
    },
  ],
})

export default router
