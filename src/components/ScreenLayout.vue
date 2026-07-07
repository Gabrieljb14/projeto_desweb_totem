<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  title: String,
  subtitle: String,
  showHeader: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()

const routeProgress = computed(() => {
  const routes = {
    '/': 0,
    '/tamanho': 12.5,
    '/base': 25,
    '/sabores': 37.5,
    '/adicionais-liquidos': 50,
    '/adicionais-solidos': 62.5,
    '/resumo': 75,
    '/sucesso': 87.5,
  }
  return routes[route.path] || 0
})
</script>

<template>
  <div class="screen-container">
    <!-- Barra de Progresso -->
    <div v-if="routeProgress > 0" class="progress-bar-container">
      <div class="progress-bar" :style="{ width: routeProgress + '%' }"></div>
    </div>

    <main class="screen-content">
      <slot></slot>
    </main>

    <footer v-if="$slots.footer" class="screen-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.screen-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-light-gray) 0%, #f0e6f6 100%);
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background: var(--color-gray);
  position: relative;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-pink));
  transition: width 0.3s ease-in-out;
  box-shadow: 0 0 10px var(--color-primary);
}

.screen-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-2xl) var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.screen-footer {
  padding: var(--spacing-lg) var(--spacing-xl);
  background: white;
  border-top: 2px solid var(--color-gray);
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
}

/* Scroll personalizado */
.screen-content::-webkit-scrollbar {
  width: 10px;
}

.screen-content::-webkit-scrollbar-track {
  background: var(--color-light-gray);
}

.screen-content::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: var(--radius-full);
}

.screen-content::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary-dark);
}
</style>
