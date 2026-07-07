<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import ScreenLayout from '@/components/ScreenLayout.vue'
import KInput from '@/components/KInput.vue'
import KButton from '@/components/KButton.vue'

const router = useRouter()
const orderStore = useOrderStore()

const goBack = () => {
  router.push('/adicionais-solidos')
}

const confirmOrder = () => {
  if (orderStore.customerName.trim()) {
    const orderNumber = orderStore.confirmOrder()
    router.push('/sucesso')
  }
}

const removeSize = () => {
  orderStore.size = null
  router.push('/tamanho')
}

const removeBase = () => {
  orderStore.base = null
  orderStore.flavor = null
  router.push('/base')
}

const removeFlavor = () => {
  orderStore.flavor = null
  router.push('/sabores')
}

const removeAdditive = (type, id) => {
  if (type === 'liquid') {
    orderStore.toggleLiquidAdditive(id)
  } else {
    orderStore.toggleSolidAdditive(id)
  }
}
</script>

<template>
  <ScreenLayout
    title="Revisar Pedido"
    subtitle="Confira tudo antes de confirmar"
  >
    <div class="resumo-content">
      <!-- Carrinho de itens -->
      <div class="cart-section">
        <h2 class="section-title">Seu Pedido:</h2>

        <div class="order-item">
          <div class="item-header">
            <span class="item-label">Tamanho:</span>
            <span class="item-value">{{ orderStore.currentSize?.label }}</span>
          </div>
          <p class="item-price">R$ {{ orderStore.currentSize?.price.toFixed(2) }}</p>
          <button class="remove-btn" @click="removeSize" title="Remover tamanho">
            Alterar
          </button>
        </div>

        <div class="order-item">
          <div class="item-header">
            <span class="item-label">Base:</span>
            <span class="item-value">{{ orderStore.currentBase?.label }}</span>
          </div>
          <button class="remove-btn" @click="removeBase" title="Remover base">
            Alterar
          </button>
        </div>

        <div class="order-item">
          <div class="item-header">
            <span class="item-label">Sabor:</span>
            <span class="item-value">{{ orderStore.currentFlavor?.label }}</span>
          </div>
          <p v-if="orderStore.currentFlavor?.price > 0" class="item-price">
            +R$ {{ orderStore.currentFlavor?.price.toFixed(2) }}
          </p>
          <button class="remove-btn" @click="removeFlavor" title="Remover sabor">
            Alterar
          </button>
        </div>

        <div v-if="orderStore.selectedLiquidAdditives.length > 0" class="order-item">
          <div class="item-header">
            <span class="item-label">Adicionais Líquidos:</span>
          </div>
          <div class="additives-list">
            <div
              v-for="additive in orderStore.selectedLiquidAdditives"
              :key="additive.id"
              class="additive-row"
            >
              <span class="additive-name">{{ additive.label }}</span>
              <span class="additive-price">+R$ {{ additive.price.toFixed(2) }}</span>
              <button
                class="remove-item-btn"
                @click="removeAdditive('liquid', additive.id)"
                title="Remover"
              >
                X
              </button>
            </div>
          </div>
        </div>

        <div v-if="orderStore.selectedSolidAdditives.length > 0" class="order-item">
          <div class="item-header">
            <span class="item-label">Toppings:</span>
          </div>
          <div class="additives-list">
            <div
              v-for="additive in orderStore.selectedSolidAdditives"
              :key="additive.id"
              class="additive-row"
            >
              <span class="additive-name">{{ additive.label }}</span>
              <span class="additive-price">+R$ {{ additive.price.toFixed(2) }}</span>
              <button
                class="remove-item-btn"
                @click="removeAdditive('solid', additive.id)"
                title="Remover"
              >
                X
              </button>
            </div>
          </div>
        </div>

        <div class="total-section">
          <p class="total-label">Valor Total:</p>
          <p class="total-price">R$ {{ orderStore.totalPrice }}</p>
        </div>
      </div>

      <!-- Identificação -->
      <div class="identification-section">
        <h2 class="section-title">Como devemos te chamar?</h2>
        <KInput
          v-model="orderStore.customerName"
          placeholder="Digite seu nome"
          label="Nome do Cliente"
          type="text"
        />
      </div>
    </div>

    <template #footer>
      <KButton size="md" variant="secondary" @click="goBack">Voltar</KButton>
      <KButton
        size="md"
        variant="primary"
        :disabled="!orderStore.customerName.trim()"
        @click="confirmOrder"
      >
        Confirmar Pedido
      </KButton>
    </template>
  </ScreenLayout>
</template>

<style scoped>
.resumo-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  width: 100%;
  max-width: 700px;
}

.cart-section {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.order-item {
  background: var(--color-light-gray);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  border-left: 4px solid var(--color-primary);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.item-label {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.item-value {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.item-price {
  font-size: var(--font-size-sm);
  color: var(--color-accent-copper);
  font-weight: var(--font-weight-semibold);
  margin: var(--spacing-sm) 0;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.remove-btn:hover {
  background: rgba(45, 90, 123, 0.1);
  transform: scale(1.05);
}

.additives-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.additive-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.additive-name {
  flex: 1;
  color: var(--color-text);
}

.additive-price {
  color: var(--color-accent-copper);
  font-weight: var(--font-weight-semibold);
  margin-right: var(--spacing-md);
}

.remove-item-btn {
  background: var(--color-strawberry);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.remove-item-btn:hover {
  background: #e8486b;
  transform: scale(1.1);
}

.total-section {
  border-top: 2px solid var(--color-gray);
  padding-top: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  text-align: center;
}

.total-label {
  font-size: var(--font-size-md);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.total-price {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: 0;
}

.identification-section {
  background: linear-gradient(135deg, rgba(74, 139, 179, 0.08) 0%, rgba(255, 107, 157, 0.08) 100%);
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  border: 2px solid rgba(74, 139, 179, 0.2);
}
</style>
