<script setup>
defineProps({
  selected: Boolean,
  disabled: Boolean,
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
  badge: String,
})

defineEmits(['click'])
</script>

<template>
  <div
    :class="[
      'card',
      `card-${size}`,
      { 'card-selected': selected },
      { 'card-disabled': disabled },
    ]"
    @click="$emit('click')"
  >
    <div v-if="badge" class="card-badge">
      {{ badge }}
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  border: 3px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Tamanhos */
.card-sm {
  padding: var(--spacing-md);
  min-height: 100px;
}

.card-md {
  padding: var(--spacing-lg);
  min-height: 140px;
}

.card-lg {
  padding: var(--spacing-xl);
  min-height: 180px;
}

/* Interatividade */
.card:not(.card-disabled) {
  cursor: pointer;
}

.card:not(.card-disabled):hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card:not(.card-disabled):active {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Estado Selecionado */
.card-selected {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, rgba(45, 90, 123, 0.05) 0%, rgba(74, 139, 179, 0.05) 100%);
  box-shadow: var(--shadow-lg), 0 0 0 0 rgba(45, 90, 123, 0.2);
  animation: selectPulse 0.3s ease-out;
}

.card-selected::after {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-primary);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

/* Estado Desabilitado */
.card-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Badge */
.card-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, var(--color-accent-gold) 0%, var(--color-accent-copper) 100%);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--shadow-lg);
  transform: rotate(15deg);
}

@keyframes selectPulse {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
</style>
