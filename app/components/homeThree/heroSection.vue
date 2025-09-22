<template>
  <div class="flex flex-col lg:flex-row justify-center py-4 lg:py-10 gap-4 lg:gap-6 px-4">
    <!-- Sidebar -->
    <aside
        class="w-full lg:w-[20%] text-gray-700 font-medium border border-gray-200 shadow-lg rounded-md bg-white"
    >
      <div class="p-4 lg:p-6 flex flex-col gap-3">
        <NuxtLink
            v-for="(category, idx) in categories"
            :key="category.id ?? idx"
            :to="{ path: '/browse', query: { categories: category.id } }"
            class="flex items-center justify-between hover:text-[#d63384] transition-colors"
        >
          <span>{{ category.name }}</span>
          <span class="text-sm text-gray-400">
            ({{ category._count?.offers || 0 }} offers)
          </span>
        </NuxtLink>
      </div>
    </aside>

    <!-- Image Slider -->
    <section
        v-if="imageUrls.length"
        class="w-full lg:w-[55%] bg-white rounded-xl shadow relative"
    >
      <div
          class="relative w-full overflow-hidden rounded-xl bg-white"
          @mouseenter="pause()"
          @mouseleave="resume()"
          tabindex="0"
          @keydown.left.prevent="prevSlide"
          @keydown.right.prevent="nextSlide"
          aria-label="Promotional image slider"
      >
        <img
            :src="imageUrls[currentSlide]"
            :alt="`Slide ${currentSlide + 1} of ${imageUrls.length}`"
            class="w-full block object-cover aspect-[25/10] transition-all duration-500"
            loading="lazy"
        />

        <!-- Controls -->
        <button
            @click="prevSlide"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-100"
            aria-label="Previous slide"
        >
          ◀
        </button>
        <button
            @click="nextSlide"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-100"
            aria-label="Next slide"
        >
          ▶
        </button>

        <!-- Dots -->
        <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          <button
              v-for="(u, i) in imageUrls"
              :key="`dot-${i}`"
              @click="goTo(i)"
              class="h-2 w-2 rounded-full"
              :class="i === currentSlide ? 'bg-gray-800' : 'bg-gray-300'"
              aria-label="Go to slide"
          />
        </div>
      </div>
    </section>

    <!-- Optional: empty state if no images -->
    <section
        v-else
        class="w-full lg:w-[55%] bg-white rounded-xl shadow p-6 text-center text-gray-500"
    >
      No slides to show.
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const categories = ref<any[]>([])

const props = withDefaults(
    defineProps<{
      slider?: Array<{ url: string } | string>
      autoplay?: boolean
      intervalMs?: number
    }>(),
    {
      slider: () => [],
      autoplay: true,
      intervalMs: 5000,
    }
)

// Fallback images if prop is empty
const fallback = [
  'https://demos.wicombit.com/couponza/images/slider_1635351790.jpg',
  'https://demos.wicombit.com/couponza/images/slider_1635353238.jpg',
  'https://demos.wicombit.com/couponza/images/slider_1635352051.jpg'
]

// Normalize to string URLs
const imageUrls = computed<string[]>(() => {
  const src = props.slider?.length ? props.slider : fallback
  return src
      .map((s: any) => (typeof s === 'string' ? s : s?.url))
      .filter(Boolean)
})

const currentSlide = ref(0)
let timer: number | null = null

function nextSlide() {
  if (!imageUrls.value.length) return
  currentSlide.value = (currentSlide.value + 1) % imageUrls.value.length
}
function prevSlide() {
  if (!imageUrls.value.length) return
  currentSlide.value =
      (currentSlide.value - 1 + imageUrls.value.length) % imageUrls.value.length
}
function goTo(i: number) {
  if (!imageUrls.value.length) return
  currentSlide.value = (i + imageUrls.value.length) % imageUrls.value.length
}

function start() {
  if (!props.autoplay || timer || imageUrls.value.length <= 1) return
  timer = window.setInterval(nextSlide, props.intervalMs)
}
function stop() {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
}
function pause() {
  stop()
}
function resume() {
  start()
}

onMounted(async () => {
  // Load categories on client; swap to useFetch if you need SSR
  try {
    // @ts-ignore - $fetch is available in Nuxt runtime
    categories.value = await $fetch('/api/categories/popular')
  } catch (e) {
    categories.value = []
    console.error('Failed to load categories:', e)
  }

  // Autoplay handling + page visibility
  start()
  const onVis = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVis)

  // Clean up
  onUnmounted(() => {
    stop()
    document.removeEventListener('visibilitychange', onVis)
  })
})

// Restart autoplay if the slider prop changes
watch(
    () => props.slider,
    () => {
      stop()
      currentSlide.value = 0
      start()
    },
    { deep: true }
)
</script>
