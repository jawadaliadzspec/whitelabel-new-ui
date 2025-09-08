<template>
<!--  <section class="bg-pink-100 pt-16 pb-22">-->
<!--    <h1 class="font-semibold text-3xl text-gray-900 p-4 md:ml-12">-->
<!--      Popular Categories-->
<!--    </h1>-->

<!--    <div class="flex flex-wrap justify-center gap-6 px-2 sm:px-6">-->
<!--      <div-->
<!--          v-for="cat in categories"-->
<!--          :key="cat.id"-->
<!--          class="w-full sm:w-[47%] lg:w-[22%] bg-white rounded-xl shadow p-4 flex flex-col gap-4 items-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"-->
<!--      >-->
<!--        <NuxtLink-->
<!--            :to="{-->
<!--      path: '/browse',-->
<!--      query: { categories: cat.id }-->
<!--    }"-->
<!--            class="w-full text-center block"-->
<!--        >-->
<!--          <p class="text-xl font-bold text-gray-900 hover:text-[#d63384]">-->
<!--            {{ cat.name }}-->
<!--          </p>-->
<!--          <p class="text-md text-[#d63384] pt-2">-->
<!--            {{ cat._count?.offers || 0 }} Discounts-->
<!--          </p>-->
<!--        </NuxtLink>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
  <section class="bg-blue-50 pt-16 pb-22">
    <h1 class="font-semibold text-3xl text-gray-900 p-4 md:ml-12">
      Popular Categories
    </h1>

    <!-- Show grid if categories exist -->
    <div
        v-if="categories.length"
        class="grid grid-cols-2 sm:grid-cols-4 gap-5 px-2 sm:px-6"
    >
      <div
          v-for="cat in categories"
          :key="cat.id"
          class="bg-blue-500 text-white rounded-2xl h-32 flex flex-col justify-between text-center overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      >
        <NuxtLink
            :to="{ path: '/browse', query: { categories: cat.id } }"
            class="flex-1 flex items-center justify-center px-2 py-3"
        >
          <p class="text-sm font-semibold leading-tight">
            {{ cat.name }}
          </p>
        </NuxtLink>

        <div class="pb-2">
          <div class="h-px w-full bg-white/60"></div>
          <p class="text-xs text-white/80 mt-2">
            ({{ cat._count?.offers || 0 }} offers)
          </p>
        </div>
      </div>
    </div>

    <!-- Show message if no categories -->
    <p v-else class="text-center text-gray-500 py-10 italic">
      No categories available at the moment.
    </p>
  </section>
</template>

<!--<script setup>-->
<!--import { ref, onMounted } from "vue"-->
<!--const categories = ref([])-->
<!--onMounted(async () => {-->
<!--  try {-->
<!--    categories.value = await $fetch('/api/categories/popular') // adjust to your API route!-->
<!--  } catch (e) {-->
<!--    categories.value = []-->
<!--  }-->
<!--})-->
<!--</script>-->
<script setup>
import { ref, onMounted } from "vue"
const categories = ref([])
onMounted(async () => {
  try {
    categories.value = await $fetch('/api/categories/popular') // adjust to your API route!
  } catch (e) {
    categories.value = []
  }
})
</script>