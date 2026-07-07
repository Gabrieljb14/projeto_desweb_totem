<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg, xl
  },
  disabled: Boolean,
  loading: Boolean,
  icon: String,
  fullWidth: Boolean,
})

defineEmits(['click'])

const sizeClasses = {
  sm: 'button-sm',
  md: 'button-md',
  lg: 'button-lg',
  xl: 'button-xl',
}

const variantClasses = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  danger: 'button-danger',
}
</script>

<template>
  <button
    :class="[
      'button',
      sizeClasses[size],
      variantClasses[variant],
      { 'button-disabled': disabled },
      { 'button-full-width': fullWidth },
      { 'button-loading': loading },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span v-if="loading" class="button-spinner"></span>
    <span v-if="icon" class="button-icon">{{ icon }}</span>
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  font-family: var(--font-family);
  font-weight: var(--font-weight-semibold);
  border: none;
  cursor: pointer;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  white-space: nowrap;
  user-select: none;
  position: relative;
  outline: none;
  box-shadow: var(--shadow-md);
}

/* Tamanhos */
.button-sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.button-md {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
}

.button-lg {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-lg);
  min-height: 60px;
}

.button-xl {
  padding: var(--spacing-xl) var(--spacing-2xl);
  font-size: var(--font-size-xl);
  min-height: 80px;
  border-radius: var(--radius-full);
}

/* Variantes */
.button-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: var(--color-white);
}

.button-primary:hover:not(.button-disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
}

.button-primary:active:not(.button-disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

.button-secondary {
  background: linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-pink) 100%);
  color: var(--color-white);
}

.button-secondary:hover:not(.button-disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, var(--color-pink) 0%, var(--color-pink-light) 100%);
}

.button-secondary:active:not(.button-disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

.button-danger {
  background: linear-gradient(135deg, var(--color-strawberry) 0%, #ff5a7d 100%);
  color: var(--color-white);
}

.button-danger:hover:not(.button-disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, #ff5a7d 0%, var(--color-strawberry) 100%);
}

.button-danger:active:not(.button-disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

/* Estados */
.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.button-full-width {
  width: 100%;
}

.button-loading {
  color: transparent;
}

.button-spinner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.button-icon {
  font-size: 1.2em;
}
</style>
