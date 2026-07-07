<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import KButton from '@/components/KButton.vue'

const router = useRouter()
const orderStore = useOrderStore()

const startOrder = () => {
  orderStore.resetOrder()
  router.push('/tamanho')
}
</script>

<template>
  <div class="home-screen">
    <div class="home-background">
      <svg viewBox="0 0 200 200" class="ice-cream-illustration">
        <!-- Taça -->
        <path d="M 60 100 L 80 180 L 120 180 L 140 100 Z" fill="#2d5a7b" stroke="#1b3a52" stroke-width="2" />
        <ellipse cx="100" cy="100" rx="40" ry="15" fill="#2d5a7b" stroke="#1b3a52" stroke-width="2" />

        <!-- Decoração taça -->
        <circle cx="75" cy="140" r="3" fill="#e8c547" opacity="0.8" />
        <circle cx="125" cy="150" r="3" fill="#e8c547" opacity="0.8" />
        <circle cx="100" cy="160" r="3" fill="#e8c547" opacity="0.8" />

        <!-- Sorvete 1 - Roxo (Açaí) -->
        <ellipse cx="85" cy="85" rx="20" ry="25" fill="#8b5fbf" />
        <circle cx="80" cy="70" r="12" fill="#8b5fbf" />
        <circle cx="90" cy="65" r="14" fill="#8b5fbf" />

        <!-- Sorvete 2 - Rosa -->
        <ellipse cx="100" cy="75" rx="22" ry="28" fill="#ff6b9d" />
        <circle cx="95" cy="55" r="13" fill="#ff6b9d" />
        <circle cx="108" cy="50" r="15" fill="#ff6b9d" />

        <!-- Sorvete 3 - Baunilha -->
        <ellipse cx="115" cy="85" rx="20" ry="25" fill="#f5d5b8" />
        <circle cx="110" cy="68" r="12" fill="#f5d5b8" />
        <circle cx="120" cy="63" r="14" fill="#f5d5b8" />

        <!-- Topo com cereja -->
        <circle cx="100" cy="48" r="8" fill="#e8486b" />
        <path d="M 100 48 Q 98 40 95 35" stroke="#8b7355" stroke-width="1" fill="none" />
      </svg>
    </div>

    <div class="home-content">
      <div class="home-header">
        <h1 class="home-title">Kennedy's</h1>
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

.home-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.15;
  z-index: 1;
}

.ice-cream-illustration {
  width: 300px;
  height: 300px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
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

.home-title {
  font-size: 80px;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  text-shadow: 3px 3px 0 rgba(255, 107, 157, 0.3), 6px 6px 0 rgba(139, 95, 191, 0.2);
  margin-bottom: var(--spacing-sm);
  letter-spacing: 2px;
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
  .home-title {
    font-size: 48px;
  }

  .home-tagline {
    font-size: var(--font-size-lg);
  }
}
</style>
