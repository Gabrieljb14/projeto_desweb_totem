<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  open: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="accordion">
    <button class="accordion-header" @click="toggle">
      <span class="accordion-title">{{ title }}</span>
      <span :class="['accordion-icon', { 'accordion-icon-open': isOpen }]">▼</span>
    </button>
    <div v-if="isOpen" class="accordion-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
}

.accordion-header {
  width: 100%;
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all var(--transition-fast);
}

.accordion-header:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.accordion-header:active {
  transform: translateY(0);
}

.accordion-title {
  text-align: left;
}

.accordion-icon {
  transition: transform var(--transition-normal);
  font-size: 12px;
}

.accordion-icon-open {
  transform: rotate(180deg);
}

.accordion-content {
  padding: var(--spacing-lg);
  background: var(--color-light-gray);
  animation: slideDown var(--transition-normal) ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}
</style>
