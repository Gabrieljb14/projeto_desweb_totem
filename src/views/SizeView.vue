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
              <img :src="s.image" :alt="s.label" class="size-image" />
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

.size-image {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
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
