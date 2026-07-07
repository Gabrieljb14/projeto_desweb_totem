<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  disabled: Boolean,
  type: {
    type: String,
    default: 'text',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-group">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      class="input-field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.input-label {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.input-field {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
  border: 2px solid var(--color-gray);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  transition: all var(--transition-fast);
  background: white;
  text-align: center;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 90, 123, 0.1);
  transform: scale(1.02);
}

.input-field:disabled {
  background: var(--color-light-gray);
  opacity: 0.6;
  cursor: not-allowed;
}

.input-field::placeholder {
  color: var(--color-gray);
}
</style>
