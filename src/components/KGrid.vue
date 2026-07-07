<script setup>
defineProps({
  columns: {
    type: Number,
    default: 3,
  },
  gap: {
    type: String,
    default: 'lg',
  },
})
</script>

<template>
  <div :class="['grid', `grid-cols-${columns}`, `gap-${gap}`]">
    <slot></slot>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  width: 100%;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.gap-sm {
  gap: var(--spacing-md);
}

.gap-md {
  gap: var(--spacing-lg);
}

.gap-lg {
  gap: var(--spacing-xl);
}
</style>
