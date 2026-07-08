import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import copo300ml from '@/assets/images/icons/copo_300ml.png'
import copo500ml from '@/assets/images/icons/copo_500ml.png'
import copo700ml from '@/assets/images/icons/copo_700ml.png'

import massaAcai from '@/assets/images/icons/massa_acai.png'
import massaSorvete from '@/assets/images/icons/massa_sorvete.png'

import acaiMorango from '@/assets/images/icons/acai_morango.webp'
import acaiBanana from '@/assets/images/icons/acai_banana.webp'
import acaiNinho from '@/assets/images/icons/acai_ninho.png'
import acaiFit from '@/assets/images/icons/acai_fit.webp'
import sorveteMorango from '@/assets/images/icons/morango.webp'
import baunilha from '@/assets/images/icons/baunilha.png'
import milhoVerde from '@/assets/images/icons/milho_verde.webp'
import chiclete from '@/assets/images/icons/chiclete.png'
import kennedysCandy from "@/assets/images/icons/kennedy's_kandy.png"

import leiteCondensado from '@/assets/images/icons/leite_condensado.jpg'
import nutella from '@/assets/images/icons/nutella.png'
import mousseMaracuja from '@/assets/images/icons/mousse_maracuja.png'
import cremeOvomaltine from '@/assets/images/icons/creme_ovomaltine.webp'

import pedacoMorango from '@/assets/images/icons/pedaco_morango.webp'
import kiwi from '@/assets/images/icons/kiwi.png'
import rodelaBanana from '@/assets/images/icons/rodela_banana.png'
import confete from '@/assets/images/icons/confete.jfif'
import brownie from '@/assets/images/icons/brownie.jfif'

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
    { id: '300ml', label: '300ml', price: 12.90, image: copo300ml },
    { id: '500ml', label: '500ml', price: 16.90, image: copo500ml },
    { id: '700ml', label: '700ml', price: 22.90, image: copo700ml },
  ]

  const bases = [
    { id: 'acai', label: 'Açaí', color: 'var(--color-purple)', image: massaAcai },
    { id: 'sorvete', label: 'Sorvete', color: 'var(--color-vanilla)', image: massaSorvete },
  ]

  const flavorsData = {
    acai: [
      { id: 'acai-morango', label: 'Açaí com Morango', price: 0, image: acaiMorango },
      { id: 'acai-banana', label: 'Açaí com Banana', price: 0, image: acaiBanana },
      { id: 'acai-leitininho', label: 'Açaí com Leite Ninho', price: 0, image: acaiNinho },
      { id: 'acai-zero', label: 'Açaí Zero (sem açúcar)', price: 0, image: acaiFit },
    ],
    sorvete: [
      { id: 'sorvete-morango', label: 'Morango', price: 0, image: sorveteMorango },
      { id: 'sorvete-baunilha', label: 'Baunilha', price: 0, image: baunilha },
      { id: 'sorvete-milhoverde', label: 'Milho Verde', price: 0, image: milhoVerde },
      {
        id: 'sorvete-chiclete',
        label: 'Chiclete',
        price: 0,
        image: chiclete,
      },
      {
        id: 'sorvete-kennedys-candy',
        label: "Kennedy's Candy",
        price: 4.50,
        isPremium: true,
        image: kennedysCandy,
      },
    ],
  }

  const liquidAdditivesData = [
    { id: 'leite-condensado', label: 'Leite Condensado', price: 2.50, image: leiteCondensado },
    { id: 'nutella', label: 'Nutella', price: 3.50, image: nutella },
    { id: 'mousse-maracuja', label: 'Mousse de Maracujá', price: 2.50, image: mousseMaracuja },
    { id: 'creme-ovomaltine', label: 'Creme de Ovomaltine', price: 3.00, image: cremeOvomaltine },
  ]

  const solidAdditivesData = [
    { id: 'morango', label: 'Morango', price: 1.50, image: pedacoMorango },
    { id: 'kiwi', label: 'Kiwi', price: 2.00, image: kiwi },
    { id: 'banana', label: 'Banana', price: 1.50, image: rodelaBanana },
    { id: 'ovomaltine', label: 'Ovomaltine', price: 2.50, image: cremeOvomaltine },
    { id: 'confete', label: 'Confete', price: 1.00, image: confete },
    { id: 'brownie', label: 'Brownie', price: 3.50, image: brownie },
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
    liquidAdditivesList: liquidAdditivesData,
    solidAdditivesList: solidAdditivesData,

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
