import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore('order', () => {
  // Estado
  const size = ref(null) // '300ml', '500ml', '700ml'
  const base = ref(null) // 'acai', 'sorvete'
  const flavor = ref(null) // ID do sabor selecionado
  const liquidAdditivesSelected = ref([]) // Array de adicionais líquidos selecionados
  const solidAdditivesSelected = ref([]) // Array de adicionais sólidos selecionados
  const customerName = ref('')
  const orderNumber = ref(null)

  // Dados estáticos dos produtos
  const sizes = [
    { id: '300ml', label: '300ml', price: 12.90, visual: 'small' },
    { id: '500ml', label: '500ml', price: 16.90, visual: 'medium' },
    { id: '700ml', label: '700ml', price: 22.90, visual: 'large' },
  ]

  const bases = [
    { id: 'acai', label: 'Açaí', color: 'var(--color-purple)' },
    { id: 'sorvete', label: 'Sorvete', color: 'var(--color-vanilla)' },
  ]

  const flavorsData = {
    acai: [
      { id: 'acai-morango', label: 'Açaí com Morango', price: 0 },
      { id: 'acai-banana', label: 'Açaí com Banana', price: 0 },
      { id: 'acai-leitininho', label: 'Açaí com Leite Ninho', price: 0 },
      { id: 'acai-zero', label: 'Açaí Zero (sem açúcar)', price: 0 },
    ],
    sorvete: [
      { id: 'sorvete-morango', label: 'Morango', price: 0 },
      { id: 'sorvete-baunilha', label: 'Baunilha', price: 0 },
      { id: 'sorvete-milhoverde', label: 'Milho Verde', price: 0 },
      {
        id: 'sorvete-chiclete',
        label: 'Chiclete',
        price: 0,
      },
      {
        id: 'sorvete-kennedys-candy',
        label: "Kennedy's Candy",
        price: 4.50,
        isPremium: true,
      },
    ],
  }

  const liquidAdditivesData = [
    { id: 'leite-condensado', label: 'Leite Condensado', price: 2.50 },
    { id: 'nutella', label: 'Nutella', price: 3.50 },
    { id: 'mousse-maracuja', label: 'Mousse de Maracujá', price: 2.50 },
    { id: 'creme-ovomaltine', label: 'Creme de Ovomaltine', price: 3.00 },
  ]

  const solidAdditivesData = [
    { id: 'morango', label: 'Morango', price: 1.50 },
    { id: 'kiwi', label: 'Kiwi', price: 2.00 },
    { id: 'banana', label: 'Banana', price: 1.50 },
    { id: 'ovomaltine', label: 'Ovomaltine', price: 2.50 },
    { id: 'confete', label: 'Confete', price: 1.00 },
    { id: 'brownie', label: 'Brownie', price: 3.50 },
  ]

  // Getters
  const currentFlavors = computed(() => flavorsData[base.value] || [])

  const currentSize = computed(() => sizes.find((s) => s.id === size.value))

  const currentBase = computed(() => bases.find((b) => b.id === base.value))

  const currentFlavor = computed(() => {
    const allFlavors = Object.values(flavorsData).flat()
    return allFlavors.find((f) => f.id === flavor.value)
  })

  const selectedLiquidAdditives = computed(() =>
    liquidAdditivesData.filter((a) => liquidAdditivesSelected.value.includes(a.id))
  )

  const selectedSolidAdditives = computed(() =>
    solidAdditivesData.filter((a) => solidAdditivesSelected.value.includes(a.id))
  )

  const totalPrice = computed(() => {
    let total = 0

    if (currentSize.value) total += currentSize.value.price
    if (currentFlavor.value) total += currentFlavor.value.price

    selectedLiquidAdditives.value.forEach((a) => {
      total += a.price
    })

    selectedSolidAdditives.value.forEach((a) => {
      total += a.price
    })

    return total.toFixed(2)
  })

  const orderSummary = computed(() => ({
    size: currentSize.value?.label || 'Não selecionado',
    base: currentBase.value?.label || 'Não selecionado',
    flavor: currentFlavor.value?.label || 'Não selecionado',
    liquidAdditives: selectedLiquidAdditives.value.map((a) => a.label),
    solidAdditives: selectedSolidAdditives.value.map((a) => a.label),
    customerName: customerName.value,
    totalPrice: totalPrice.value,
  }))

  // Métodos
  function toggleLiquidAdditive(id) {
    const index = liquidAdditivesSelected.value.indexOf(id)
    if (index > -1) {
      liquidAdditivesSelected.value.splice(index, 1)
    } else {
      liquidAdditivesSelected.value.push(id)
    }
  }

  function toggleSolidAdditive(id) {
    const index = solidAdditivesSelected.value.indexOf(id)
    if (index > -1) {
      solidAdditivesSelected.value.splice(index, 1)
    } else {
      solidAdditivesSelected.value.push(id)
    }
  }

  function confirmOrder() {
    orderNumber.value = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')
    return orderNumber.value
  }

  function resetOrder() {
    size.value = null
    base.value = null
    flavor.value = null
    liquidAdditivesSelected.value = []
    solidAdditivesSelected.value = []
    customerName.value = ''
    orderNumber.value = null
  }

  return {
    // State
    size,
    base,
    flavor,
    liquidAdditives: liquidAdditivesSelected,
    solidAdditives: solidAdditivesSelected,
    customerName,
    orderNumber,

    // Static Data
    sizes,
    bases,
    flavorsData,
    liquidAdditives: liquidAdditivesData,
    solidAdditives: solidAdditivesData,

    // Getters
    currentFlavors,
    currentSize,
    currentBase,
    currentFlavor,
    selectedLiquidAdditives,
    selectedSolidAdditives,
    totalPrice,
    orderSummary,

    // Methods
    toggleLiquidAdditive,
    toggleSolidAdditive,
    confirmOrder,
    resetOrder,
  }
})
