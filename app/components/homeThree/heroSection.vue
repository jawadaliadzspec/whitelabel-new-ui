<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const props = defineProps({
  autoplay: { type: Boolean, default: true },
  intervalMs: { type: Number, default: 5000 },
  slides: { type: Array as () => string[], default: () => [] }
})

const currentSlide = ref(0)
let timer: number | null = null

function nextSlide() {
  if (!props.slides.length) return
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
}

function prevSlide() {
  if (!props.slides.length) return
  currentSlide.value =
      (currentSlide.value - 1 + props.slides.length) % props.slides.length
}

function start() {
  if (!props.autoplay || timer) return
  timer = window.setInterval(nextSlide, props.intervalMs)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// start autoplay when mounted
onMounted(() => {
  start()
})

// stop autoplay when unmounted
onUnmounted(() => {
  stop()
})

// handle tab visibility
useEventListener(document, 'visibilitychange', () => {
  document.hidden ? stop() : start()
})
</script>

<template>
  <section class="relative w-full overflow-hidden">
    <!-- Slides -->
    <div class="relative h-64 w-full">
      <div
          v-for="(slide, index) in props.slides"
          :key="index"
          class="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
          :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
      >
        <img :src="slide" class="h-full w-full object-cover" />
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute inset-x-0 bottom-4 flex justify-center gap-2">
      <button
          v-for="(slide, index) in props.slides"
          :key="'dot-' + index"
          class="h-3 w-3 rounded-full"
          :class="currentSlide === index ? 'bg-white' : 'bg-gray-400'"
          @click="currentSlide = index"
      ></button>
    </div>

    <button
        class="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-black/50 p-2 text-white"
        @click="prevSlide"
    >
      ‹
    </button>
    <button
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-black/50 p-2 text-white"
        @click="nextSlide"
    >
      ›
    </button>
  </section>
</template>

<style scoped>
/* optional: smoother fade between slides */
.opacity-0 {
  opacity: 0;
  pointer-events: none;
}
.opacity-100 {
  opacity: 1;
}
</style>
