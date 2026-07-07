<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import ScreenLayout from '@/components/ScreenLayout.vue'
import KGrid from '@/components/KGrid.vue'
import KCard from '@/components/KCard.vue'
import KButton from '@/components/KButton.vue'

const router = useRouter()
const orderStore = useOrderStore()

const selectSize = (sizeId) => {
  orderStore.size = sizeId
  router.push('/base')
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <ScreenLayout title="Qual o tamanho?" subtitle="Escolha o tamanho da sua taça">
    <div class="tamanho-content">
      <KGrid :columns="3" gap="lg">
        <div v-for="s in orderStore.sizes" :key="s.id" class="size-card-wrapper">
          <KCard
            :selected="orderStore.size === s.id"
            size="lg"
            @click="selectSize(s.id)"
          >
            <div class="size-visualization">
              <div :class="`cup-${s.visual}`"></div>
            </div>
            <div class="size-info">
              <p class="size-label">{{ s.label }}</p>
              <p class="size-price">R$ {{ s.price.toFixed(2) }}</p>
            </div>
          </KCard>
        </div>
      </KGrid>

      <div class="info-box">
        <p class="info-text">Quanto maior, mais guloseimas cabem!</p>
      </div>
    </div>

    <template #footer>
      <KButton size="md" variant="secondary" @click="goBack">← Voltar</KButton>
      <KButton
        size="md"
        variant="primary"
        :disabled="!orderStore.size"
        @click="() => selectSize(orderStore.size)"
      >
        Próximo →
      </KButton>
    </template>
  </ScreenLayout>
</template>

<style scoped>
.tamanho-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xl);
  width: 100%;
  max-width: 1000px;
}

.size-card-wrapper {
  display: flex;
  flex-direction: column;
}

.size-visualization {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 150px;
  margin-bottom: var(--spacing-lg);
}

.cup-small {
  width: 50px;
  height: 60px;
  background: linear-gradient(135deg, #a8d973 0%, #88bd53 100%);
  border-radius: 0 0 8px 8px;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cup-small::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 40px;
  background: linear-gradient(135deg, #8b5fbf 0%, #ff6b9d 50%, #f5d5b8 100%);
  border-radius: 50% 50% 20% 20%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cup-small::after {
  content: '';
  position: absolute;
  right: -15px;
  top: 20px;
  width: 8px;
  height: 20px;
  border: 2px solid #a8d973;
  border-left: none;
  border-radius: 0 8px 8px 0;
}

.cup-medium {
  width: 65px;
  height: 85px;
  background: linear-gradient(135deg, #a8d973 0%, #88bd53 100%);
  border-radius: 0 0 10px 10px;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cup-medium::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 55px;
  background: linear-gradient(135deg, #8b5fbf 0%, #ff6b9d 50%, #f5d5b8 100%);
  border-radius: 50% 50% 25% 25%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cup-medium::after {
  content: '';
  position: absolute;
  right: -18px;
  top: 25px;
  width: 10px;
  height: 30px;
  border: 2px solid #a8d973;
  border-left: none;
  border-radius: 0 10px 10px 0;
}

.cup-large {
  width: 80px;
  height: 110px;
  background: linear-gradient(135deg, #a8d973 0%, #88bd53 100%);
  border-radius: 0 0 12px 12px;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cup-large::before {
  content: '';
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 70px;
  background: linear-gradient(135deg, #8b5fbf 0%, #ff6b9d 50%, #f5d5b8 100%);
  border-radius: 50% 50% 30% 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cup-large::after {
  content: '';
  position: absolute;
  right: -20px;
  top: 35px;
  width: 12px;
  height: 40px;
  border: 2px solid #a8d973;
  border-left: none;
  border-radius: 0 12px 12px 0;
}

.size-info {
  text-align: center;
}

.size-label {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.size-price {
  font-size: var(--font-size-md);
  color: var(--color-accent-copper);
  font-weight: var(--font-weight-semibold);
}

.info-box {
  background: rgba(139, 95, 191, 0.1);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-purple);
  margin-top: var(--spacing-lg);
}

.info-text {
  font-size: var(--font-size-md);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}
</style>
