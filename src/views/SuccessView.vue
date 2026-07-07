<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import KButton from '@/components/KButton.vue'
import KAccordion from '@/components/KAccordion.vue'
import BackgroundCarousel from '@/components/BackgroundCarousel.vue'

import kennedysLogo from "@/assets/images/icons/kennedy's_logo.png"

const router = useRouter()
const orderStore = useOrderStore()

const startNewOrder = () => {
  orderStore.resetOrder()
  router.push('/')
}
</script>

<template>
  <div class="success-screen">
    <BackgroundCarousel
      overlay="linear-gradient(135deg, rgba(230, 247, 255, 0.75) 0%, rgba(255, 240, 245, 0.7) 50%, rgba(240, 230, 246, 0.75) 100%)"
    />

    <div class="success-content">
      <!-- Celebração -->
      <div class="celebration">
        <div class="confetti">*</div>
        <div class="confetti">*</div>
        <div class="confetti">*</div>
        <div class="confetti">*</div>
        <div class="confetti">*</div>
      </div>

      <img :src="kennedysLogo" alt="Kennedy's" class="success-logo" />

      <!-- Mensagem Principal -->
      <div class="success-message">
        <h1 class="success-title">Pedido Confirmado!</h1>
        <p class="success-subtitle">
          Seu momento Kennedy's está sendo preparado, <span class="customer-name">{{ orderStore.customerName }}</span
          >!
        </p>
      </div>

      <!-- Número do Pedido -->
      <div class="order-number-box">
        <p class="order-number-label">Número do Pedido:</p>
        <p class="order-number">#{{ orderStore.orderNumber }}</p>
        <p class="order-number-info">Guarde este número para acompanhar seu pedido!</p>
      </div>

      <!-- Resumo do Pedido - Acordeão -->
      <div class="order-summary-section">
        <KAccordion title="Revisar Pedido">
          <div class="accordion-content">
            <div class="summary-item">
              <span class="summary-label">Tamanho:</span>
              <span class="summary-value">{{ orderStore.currentSize?.label }}</span>
            </div>

            <div class="summary-item">
              <span class="summary-label">Base:</span>
              <span class="summary-value">{{ orderStore.currentBase?.label }}</span>
            </div>

            <div class="summary-item">
              <span class="summary-label">Sabor:</span>
              <span class="summary-value">{{ orderStore.currentFlavor?.label }}</span>
            </div>

            <div v-if="orderStore.selectedLiquidAdditives.length > 0" class="summary-item">
              <span class="summary-label">Adicionais Líquidos:</span>
              <div class="summary-list">
                <span
                  v-for="item in orderStore.selectedLiquidAdditives"
                  :key="item.id"
                  class="summary-list-item"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>

            <div v-if="orderStore.selectedSolidAdditives.length > 0" class="summary-item">
              <span class="summary-label">Toppings:</span>
              <div class="summary-list">
                <span
                  v-for="item in orderStore.selectedSolidAdditives"
                  :key="item.id"
                  class="summary-list-item"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>

            <div class="summary-total">
              <span class="summary-label">Valor Total:</span>
              <span class="summary-total-value">R$ {{ orderStore.totalPrice }}</span>
            </div>
          </div>
        </KAccordion>
      </div>

      <!-- Mensagem de Tempo -->
      <div class="time-message">
        <p class="time-text">Tempo estimado: 10 minutos</p>
      </div>
    </div>

    <!-- Botão para novo pedido -->
    <div class="success-footer">
      <KButton
        size="lg"
        variant="primary"
        full-width
        @click="startNewOrder"
      >
        Fazer Novo Pedido
      </KButton>
    </div>
  </div>
</template>

<style scoped>
.success-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e6f7ff 0%, #fff0f5 50%, #f0e6f6 100%);
  padding: var(--spacing-xl);
  overflow-y: auto;
  position: relative;
}

.success-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xl);
  max-width: 600px;
  margin-bottom: var(--spacing-xl);
}

.success-logo {
  width: 100%;
  max-width: 200px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.celebration {
  position: relative;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confetti {
  position: absolute;
  font-size: 40px;
  animation: confettiFall 2s ease-in infinite;
  opacity: 0.8;
}

.confetti:nth-child(1) {
  left: 20%;
  animation-delay: 0s;
}

.confetti:nth-child(2) {
  left: 40%;
  animation-delay: 0.2s;
}

.confetti:nth-child(3) {
  left: 60%;
  animation-delay: 0.4s;
}

.confetti:nth-child(4) {
  right: 20%;
  animation-delay: 0.6s;
}

.confetti:nth-child(5) {
  right: 40%;
  animation-delay: 0.8s;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-30px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(50px) rotate(360deg);
    opacity: 0;
  }
}

.success-message {
  text-align: center;
  animation: slideUp 0.6s ease-out;
}

.success-title {
  font-size: 48px;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-md);
  text-shadow: 2px 2px 4px rgba(139, 95, 191, 0.2);
}

.success-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.customer-name {
  color: var(--color-pink);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
}

.order-number-box {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
  border: 3px solid var(--color-accent-gold);
  animation: slideUp 0.8s ease-out;
}

.order-number-label {
  font-size: var(--font-size-md);
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
}

.order-number {
  font-size: 56px;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: var(--spacing-md) 0;
  font-family: 'Courier New', monospace;
  letter-spacing: 8px;
  animation: pulse 2s ease-in-out infinite;
}

.order-number-info {
  font-size: var(--font-size-sm);
  color: var(--color-gray);
  margin: 0;
}

.order-summary-section {
  width: 100%;
  animation: slideUp 1s ease-out;
}

.accordion-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  min-width: 150px;
}

.summary-value {
  color: var(--color-text);
  font-weight: var(--font-weight-normal);
}

.summary-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}

.summary-list-item {
  background: rgba(45, 90, 123, 0.1);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
}

.summary-total {
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-weight-bold);
}

.summary-total-value {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
}

.time-message {
  background: linear-gradient(135deg, rgba(168, 217, 115, 0.15) 0%, rgba(232, 200, 71, 0.15) 100%);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-green-lime);
  text-align: center;
}

.time-text {
  font-size: var(--font-size-md);
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.success-footer {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 600px;
  padding: 0 var(--spacing-xl);
}

@media (max-width: 768px) {
  .success-title {
    font-size: 32px;
  }

  .order-number {
    font-size: 40px;
  }
}
</style>
