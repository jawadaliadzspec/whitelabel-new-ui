<template>
  <section v-if="loading">
    Loading...
  </section>
  <section v-else-if="error">
    <p>Could not find offer.</p>
  </section>
  <section v-else>
    <!-- Hero Section -->
    <div class="bg-purple-100 min-h-[16rem] flex items-center justify-center text-center px-2">
      <div>
        <h1 class="text-3xl sm:text-4xl font-semibold">Browse</h1>
        <p class="mt-3 sm:mt-4 text-base sm:text-lg flex items-center justify-center gap-2 text-gray-700">
          <i class="fa-solid fa-house small"></i> Home / Coupon Details
        </p>
      </div>
    </div>
  <section class="my-12 px-4 sm:px-6 lg:px-8">
    <div
        class="relative max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
    >
      <!-- Main Image, centered and responsive -->
      <div class="flex justify-center items-center py-8 sm:py-10 md:py-12">
        <img
            :src="offer.thumbnail"
            :alt="offer.title"
            class="w-40 sm:w-48 md:w-64 h-auto object-contain mx-auto"
        />
      </div>

      <!-- Centered Logo Image overlapping image and content -->
      <div
          class="absolute left-1/2 top-[16rem] sm:top-[18rem] md:top-[24rem] transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <img
            :src="offer.stores?.image"
            :alt="offer.title"
            class="w-16 sm:w-20 md:w-24 h-auto bg-white rounded shadow-md px-2 py-1"
        />
      </div>

      <!-- Content Below -->
      <div class="mt-16 px-4 sm:px-6 lg:px-8 pb-8">
        <h2 class="font-bold text-center text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-2">
          {{ offer.title }}
        </h2>
        <p class="text-gray-900 text-center mt-4 text-base sm:text-lg md:text-xl">
          {{ offer.description }}
        </p>

        <!-- Centered Button -->
        <div class="flex justify-center pb-6">
          <a
              v-if="offer.link"
              :href="offer.link"
              target="_blank"
              rel="noopener"
              class="bg-[#d63384] px-5 py-2 mt-6 text-white text-base sm:text-lg rounded-lg font-semibold hover:text-[#d63384] hover:bg-white hover:outline hover:outline-1 hover:outline-[#d63384] transition duration-700"
          >
            To The Offer
          </a>
        </div>
      </div>
    </div>

  </section>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const offer = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    // fetch by path from your API
    offer.value = await $fetch(`/api/offers/by-path/${route.params.path}`)
    loading.value = false
  } catch (e) {
    error.value = e
    loading.value = false
  }
})
</script>