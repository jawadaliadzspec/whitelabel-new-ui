<template>
  <section class="bg-gray-50 py-10 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Exclusive offers 🔥
      </h2>
      <div v-if="offers.length === 0" class="text-center text-gray-500 text-lg italic">
        No offers available at the moment.
      </div>
      <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <!-- Card 1 -->
        <div v-for="offer in offers"
             :key="offer.id" class="bg-pink-100 rounded-xl shadow-md overflow-hidden relative min-h-[21rem] flex flex-col justify-between">
          <div >
            <div class="relative">
              <img
                  :src="offer.thumbnail"
                  :alt="offer.title"
                  class="w-full h-44 object-cover"
              />
            </div>
            <div class="absolute left-1/2 top-[176px] transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div class="bg-white px-3 py-2 rounded-md shadow">
                <img
                    :src="offer.stores?.image"
                    alt="JD logo"
                    class="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
          <div class="p-4 text-center pt-10">
            <p class="text-lg font-bold text-gray-800">{{ offer.title}}</p>
          </div>
          <div class="bg-pink-600 text-white text-xs font-bold text-center py-2 uppercase">
            Campaign
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
const offers = ref([])
onMounted(async () => {
  try {
    offers.value = await $fetch('/api/offers/exclusive')
  } catch (e) {
    offers.value = []
  }
})
</script>