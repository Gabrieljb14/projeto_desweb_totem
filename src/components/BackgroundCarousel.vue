<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import sorvetesFundo1 from '@/assets/images/icons/sorvetes_fundo_1.jpg'
import sorvetesFundo2 from '@/assets/images/icons/sorvetes_fundo_2.jpg'
import sorvetesFundo3 from '@/assets/images/icons/sorvetes_fundo_3.jpg'
import sorveteKennedys from "@/assets/images/icons/sorvete_kennedy's.png"

defineProps({
  overlay: {
    type: String,
    default:
      'linear-gradient(135deg, rgba(240, 230, 246, 0.75) 0%, rgba(255, 217, 232, 0.7) 50%, rgba(230, 247, 255, 0.75) 100%)',
  },
})

const carouselImages = [sorvetesFundo1, sorvetesFundo2, sorvetesFundo3, sorveteKennedys]
const activeSlide = ref(0)
let carouselInterval = null

onMounted(() => {
  carouselInterval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % carouselImages.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(carouselInterval)
})
</script>

<template>
  <div class="background-carousel">
    <img
      v-for="(image, index) in carouselImages"
      :key="image"
      :src="image"
      class="carousel-image"
      :class="{ 'carousel-image-active': index === activeSlide }"
      alt=""
    />
    <div class="background-carousel-overlay" :style="{ background: overlay }"></div>
  </div>
</template>

<style scoped>
.background-carousel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.carousel-image-active {
  opacity: 0.35;
}

.background-carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
