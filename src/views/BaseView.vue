<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import ScreenLayout from '@/components/ScreenLayout.vue'
import KGrid from '@/components/KGrid.vue'
import KCard from '@/components/KCard.vue'
import KButton from '@/components/KButton.vue'

const router = useRouter()
const orderStore = useOrderStore()

const selectBase = (baseId) => {
  orderStore.base = baseId
  router.push('/sabores')
}

const goBack = () => {
  router.push('/tamanho')
}
</script>

<template>
  <ScreenLayout title="Qual a base?" subtitle="Escolha entre Açaí ou Sorvete">
    <div class="base-content">
      <KGrid :columns="2" gap="lg">
        <div v-for="b in orderStore.bases" :key="b.id">
          <KCard
            :selected="orderStore.base === b.id"
            size="lg"
            @click="selectBase(b.id)"
          >
            <div class="base-icon">
              <img :src="b.image" :alt="b.label" class="base-image" />
            </div>
            <p class="base-label">{{ b.label }}</p>
          </KCard>
        </div>
      </KGrid>

      <div class="flavor-preview" v-if="orderStore.base">
        <p class="preview-label">Sabores disponíveis:</p>
        <div class="flavor-list">
          <span
            v-for="flavor in orderStore.currentFlavors"
            :key="flavor.id"
            class="flavor-badge"
          >
            {{ flavor.label }}
          </span>
        </div>
      </div>
    </div>

    <template #footer>
      <KButton size="md" variant="secondary" @click="goBack">← Voltar</KButton>
      <KButton
        size="md"
        variant="primary"
        :disabled="!orderStore.base"
        @click="() => selectBase(orderStore.base)"
      >
        Próximo →
      </KButton>
    </template>
  </ScreenLayout>
</template>

<style scoped>
.base-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xl);
  width: 100%;
  max-width: 800px;
}

.base-icon {
  margin-bottom: var(--spacing-lg);
  animation: pulse 2s ease-in-out infinite;
}

.base-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
}

.base-label {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: 0;
}

.flavor-preview {
  width: 100%;
  background: rgba(139, 95, 191, 0.08);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 2px solid rgba(139, 95, 191, 0.2);
}

.preview-label {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.flavor-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
}

.flavor-badge {
  display: inline-block;
  background: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(139, 95, 191, 0.2);
}
</style>
