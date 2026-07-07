<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import ScreenLayout from '@/components/ScreenLayout.vue'
import KGrid from '@/components/KGrid.vue'
import KCard from '@/components/KCard.vue'
import KButton from '@/components/KButton.vue'

const router = useRouter()
const orderStore = useOrderStore()

const selectFlavor = (flavorId) => {
  orderStore.flavor = flavorId
  router.push('/adicionais-liquidos')
}

const goBack = () => {
  router.push('/base')
}

const isPremium = (flavor) => flavor.isPremium || false
</script>

<template>
  <ScreenLayout
    :title="`Escolha o sabor`"
    :subtitle="`${orderStore.currentBase?.label} - ${orderStore.currentSize?.label}`"
  >
    <div class="sabores-content">
      <KGrid :columns="2" gap="lg">
        <div
          v-for="flavor in orderStore.currentFlavors"
          :key="flavor.id"
          :class="{ 'premium-flavor': isPremium(flavor) }"
        >
          <KCard
            :selected="orderStore.flavor === flavor.id"
            :size="isPremium(flavor) ? 'lg' : 'md'"
            @click="selectFlavor(flavor.id)"
            :style="isPremium(flavor) ? { border: '3px solid #e8c547' } : {}"
          >
            <div class="flavor-content">
              <img
                v-if="flavor.image"
                :src="flavor.image"
                :alt="flavor.label"
                class="flavor-image"
              />
              <p class="flavor-name">{{ flavor.label }}</p>
              <p v-if="flavor.price > 0" class="flavor-price">
                +R$ {{ flavor.price.toFixed(2) }}
              </p>
              <p v-else class="flavor-included">Incluído</p>
            </div>
          </KCard>
        </div>
      </KGrid>

      <div class="selection-info" v-if="orderStore.flavor">
        <p class="info-text">
          ✨ {{ orderStore.currentFlavor?.label }} selecionado! ✨
        </p>
      </div>
    </div>

    <template #footer>
      <KButton size="md" variant="secondary" @click="goBack">← Voltar</KButton>
      <KButton
        size="md"
        variant="primary"
        :disabled="!orderStore.flavor"
        @click="() => selectFlavor(orderStore.flavor)"
      >
        Próximo →
      </KButton>
    </template>
  </ScreenLayout>
</template>

<style scoped>
.sabores-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xl);
  width: 100%;
  max-width: 900px;
}

.premium-flavor {
  transform: scale(1.1);
}

.flavor-content {
  text-align: center;
}

.flavor-image {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-sm);
}

.flavor-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.flavor-price {
  font-size: var(--font-size-md);
  color: var(--color-accent-copper);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.flavor-included {
  font-size: var(--font-size-sm);
  color: var(--color-success);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.selection-info {
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(139, 95, 191, 0.1) 100%);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 2px solid rgba(255, 107, 157, 0.3);
  margin-top: var(--spacing-lg);
}

.info-text {
  font-size: var(--font-size-md);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  text-align: center;
}
</style>
