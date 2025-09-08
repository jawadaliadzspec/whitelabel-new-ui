<template>
  <!-- Hero Section -->
  <HeroSection
      title="Categories"
      breadcrumb="Home / Categories"
  />
  <section class="bg-blue-100 pt-16 pb-22">
    <h1 class="font-semibold text-3xl text-gray-900 p-4 md:ml-12">
      All Categories
    </h1>

    <div class="flex flex-wrap justify-center gap-6 px-2 sm:px-6">
      <div
          v-for="cat in categories"
          :key="cat.id"
          class="w-full sm:w-[47%] lg:w-[22%] bg-white rounded-xl shadow p-4 flex flex-col gap-4 items-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        <NuxtLink
            :to="{
      path: '/browse',
      query: { categories: cat.id }
    }"
            class="w-full text-center block"
        >
          <p class="text-xl font-bold text-gray-900 hover:text-[#d63384]">
            {{ cat.name }}
          </p>
          <p class="text-md text-[#d63384] pt-2">
            {{ cat._count?.offers || 0 }} Discounts
          </p>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { usePageMeta } from '~/composables/usePageMeta'
import HeroSection from "~/components/common/HeroSection.vue";

usePageMeta('All Categories', 'Browse all discount categories on Veckans R.')
const categories = ref([])
onMounted(async () => {
  try {
    categories.value = await $fetch('/api/categories/all') // adjust to your API route!
  } catch (e) {
    categories.value = []
  }
})
</script>
