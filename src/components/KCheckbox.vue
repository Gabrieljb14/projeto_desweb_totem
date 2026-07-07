<script setup>
defineProps({
  modelValue: Boolean,
  label: String,
  disabled: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="checkbox-label">
    <input
      :checked="modelValue"
      :disabled="disabled"
      type="checkbox"
      class="checkbox-input"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkbox-custom"></span>
    <span class="checkbox-text">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
  user-select: none;
  transition: all var(--transition-fast);
}

.checkbox-label:hover:not(:has(input:disabled)) {
  transform: translateX(4px);
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 0;
  height: 0;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  background: white;
  flex-shrink: 0;
}

.checkbox-input:checked ~ .checkbox-custom {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  border-color: var(--color-primary-light);
}

.checkbox-input:checked ~ .checkbox-custom::after {
  content: '✓';
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.checkbox-input:disabled ~ .checkbox-custom {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-text {
  font-size: var(--font-size-md);
  color: var(--color-text);
  font-weight: var(--font-weight-normal);
}

.checkbox-input:disabled ~ .checkbox-text {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
