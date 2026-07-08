<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import ScreenLayout from '@/components/ScreenLayout.vue'
import KCheckbox from '@/components/KCheckbox.vue'
import KButton from '@/components/KButton.vue'

const router = useRouter()
const orderStore = useOrderStore()

const toggleAdditive = (id) => {
  orderStore.toggleLiquidAdditive(id)
}

const isSelected = (id) => orderStore.liquidAdditives.includes(id)

const goBack = () => {
  router.push('/sabores')
}

const continueToNext = () => {
  router.push('/adicionais-solidos')
}
</script>

<template>
  <ScreenLayout
    title="Adicionais Líquidos"
    subtitle="Escolha os adicionais (pode escolher vários!)"
  >
    <div class="adicionais-content">
      <div class="adicionais-list">
        <div v-for="additive in orderStore.liquidAdditivesList" :key="additive.id" class="additive-item">
          <img
            v-if="additive.image"
            :src="additive.image"
            :alt="additive.label"
            class="additive-image"
          />
          <KCheckbox
            :model-value="isSelected(additive.id)"
            :label="`${additive.label} - R$ ${additive.price.toFixed(2)}`"
            @update:model-value="toggleAdditive(additive.id)"
          />
        </div>
      </div>

      <div class="selection-summary" v-if="orderStore.selectedLiquidAdditives.length > 0">
        <p class="summary-label">Selecionados:</p>
        <div class="selected-items">
          <span
            v-for="item in orderStore.selectedLiquidAdditives"
            :key="item.id"
            class="selected-badge"
          >
            {{ item.label }}
          </span>
        </div>
      </div>

      <div class="info-box">
        <p class="info-text">Adicionais líquidos deixam tudo ainda mais delicioso!</p>
      </div>
    </div>

    <template #footer>
      <KButton size="md" variant="secondary" @click="goBack">← Voltar</KButton>
      <KButton size="md" variant="primary" @click="continueToNext">
        Próximo →
      </KButton>
    </template>
  </ScreenLayout>
</template>

<style scoped>
.adicionais-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xl);
  width: 100%;
  max-width: 600px;
}

.adicionais-list {
  width: 100%;
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.additive-item {
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  background: var(--color-light-gray);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.additive-item:hover {
  background: rgba(255, 107, 157, 0.05);
  transform: translateX(4px);
}

.additive-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.selection-summary {
  width: 100%;
  background: rgba(74, 139, 179, 0.08);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-primary);
}

.summary-label {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.selected-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.selected-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.info-box {
  width: 100%;
  background: rgba(168, 217, 115, 0.1);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-green-lime);
}

.info-text {
  font-size: var(--font-size-md);
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  text-align: center;
}
</style>
