<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import KButton from '@/components/KButton.vue'
import BackgroundCarousel from '@/components/BackgroundCarousel.vue'

import kennedysLogo from "@/assets/images/icons/kennedy's_logo.png"

const router = useRouter()
const orderStore = useOrderStore()

const startOrder = () => {
  orderStore.resetOrder()
  router.push('/tamanho')
}
</script>

<template>
  <div class="home-screen">
    <BackgroundCarousel />

    <div class="home-content">
      <div class="home-header">
        <img :src="kennedysLogo" alt="Kennedy's" class="home-logo" />
        <p class="home-tagline">Seu Momento Especial</p>
      </div>

      <div class="home-cta">
        <KButton
          size="xl"
          variant="primary"
          full-width
          class="home-button pulse"
          @click="startOrder"
        >
          Começar Pedido
        </KButton>
      </div>

      <div class="home-info">
        <p class="info-text">Toque na tela para começar seu pedido</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0e6f6 0%, #ffd9e8 50%, #e6f7ff 100%);
  position: relative;
  overflow: hidden;
}

.home-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xl);
  padding: var(--spacing-2xl);
  text-align: center;
  max-width: 600px;
}

.home-header {
  margin-bottom: var(--spacing-lg);
}

.home-logo {
  width: 100%;
  max-width: 1000px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  margin-top: var(--spacing-2xl);
  margin-bottom: var(--spacing-sm);
}

.home-tagline {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.home-cta {
  width: 100%;
  max-width: 500px;
}

.home-button {
  font-size: var(--font-size-2xl);
  min-height: 100px;
  border-radius: var(--radius-full);
}

.home-info {
  margin-top: var(--spacing-lg);
  animation: fadeIn 1.5s ease-in-out;
}

.info-text {
  font-size: var(--font-size-md);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .home-logo {
    max-width: 280px;
  }

  .home-tagline {
    font-size: var(--font-size-lg);
  }
}
</style>
