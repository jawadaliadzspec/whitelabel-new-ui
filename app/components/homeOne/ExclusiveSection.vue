<template>
  <section class="bg-white py-10 px-4 sm:px-6 lg:px-24">
    <h1 class="font-bold text-3xl sm:text-4xl text-left mb-10">
      Exclusive Discounts
    </h1>
    <div v-if="offers.length === 0" class="text-center text-gray-500 text-lg italic">
      {{ data.mainHeading || 'No offers available at the moment.'}}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div
          v-for="offer in offers"
          :key="offer.id"
          class="relative bg-white rounded-2xl border border-gray-200 flex flex-col items-center pt-12 pb-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      >
        <button class="absolute top-4 left-4 bg-pink-50 border-pink-300 p-1 rounded-full text-pink-500 hover:bg-pink-100">
          <i class="fas fa-heart"></i>
        </button>
        <div class="absolute top-4 right-4 bg-yellow-100 text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-1">
          <img
              :src="offer.stores?.image || 'https://via.placeholder.com/90'"
              alt="Store Image"
              class="w-[70px] h-[30px] object-contain"
          />
        </div>
        <img
            :src="offer.thumbnail || 'https://via.placeholder.com/90'"
            alt="Store Image"
            class="w-[90px] h-[90px] object-contain"
        />
        <div class="w-[95%] bg-slate-50 rounded-[12px] mt-6 p-4 flex flex-col items-center">
          <h3 class="text-lg font-semibold text-gray-800 text-center break-words">
            {{ offer.title }}
          </h3>
          <NuxtLink
              :to="`/offers/${offer.path}`"
              class="bg-[#d63384] px-5 py-2 mt-6 text-white rounded-lg font-semibold hover:text-[#d63384] hover:bg-white hover:outline hover:outline-1 hover:outline-[#d63384] transition duration-700"
          >
            {{ data.buttonText || 'Discover More'}}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
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
  } catch (e) {
    offers.value = []
  }
})
</script>