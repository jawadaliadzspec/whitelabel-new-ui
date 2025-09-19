<template>
  <section class="py-20 px-6 sm:px-10 lg:px-16 bg-gray-50">
    <h1 class="font-semibold text-5xl text-gray-800 text-center mb-16">
      Popular Coupons
    </h1>

    <!-- Show message if no offers -->
    <div v-if="offers.length === 0" class="text-center text-gray-500 text-lg italic">
      {{ data.mainHeading || 'No offers available at the moment.'}}
    </div>

    <!-- Show grid if offers exist -->
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 max-w-7xl mx-auto"
    >
      <div
          v-for="(offer, idx) in offers"
          :key="offer.id"
          class="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-300"
      >
        <!-- Image Section -->
        <div class="w-full md:w-1/2">
          <div class="aspect-[4/3] md:aspect-auto h-full">
            <img
                :src="offer.thumbnail || 'https://via.placeholder.com/300x200'"
                :alt="offer.title || 'Offer Image'"
                class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Content Section -->
        <div
            class="w-full md:w-1/2 bg-gray-200 px-4 py-6 sm:px-6 md:px-6 lg:px-8 flex flex-col justify-center space-y-4 md:space-y-6"
        >
          <!-- Store Badge -->
          <div
              class="inline-flex items-center justify-center bg-yellow-100 px-4 py-2 rounded-full w-max"
          >
            <img
                :src="offer.stores?.image || 'https://via.placeholder.com/80x32'"
                alt="Store Logo"
                class="w-[80px] h-[32px] object-contain"
            />
          </div>

          <!-- Offer Title -->
          <div class="text-gray-800 font-semibold text-base sm:text-lg md:text-lg">
            {{ offer.title }}
          </div>

          <!-- CTA Button -->
          <NuxtLink
              :to="`/offers/${offer.path}`"
              class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition text-center w-full sm:w-auto md:w-auto mx-auto md:mx-0"
          >
            Discover More
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const offers = ref([])
defineProps<{
  data: {
    mainHeading: string;
    buttonText: string;
  }
}>()

onMounted(async () => {
  try {
    offers.value = await $fetch('/api/offers/exclusive')
  } catch (error) {
    offers.value = []
  }
})
</script>
