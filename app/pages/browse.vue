<template>
  <!-- Hero Section -->
  <HeroSection
      title="Browse"
      breadcrumb="Home / Browse"
  />

  <!-- Main Content -->
  <section class="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-2 sm:px-6 lg:px-12 py-8">
    <!-- Sidebar -->
    <aside class="md:w-1/4 flex-shrink-0 mb-8 md:mb-0">
      <div class="flex flex-col gap-6">
        <!-- Search -->
<!--        <form>-->
<!--          <input-->
<!--              type="text"-->
<!--              placeholder="Söka"-->
<!--              aria-label="Sök kuponger"-->
<!--              class="w-full py-3 px-4 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#d63384] mb-3"-->
<!--          />-->
<!--        </form>-->
        <!-- Kategorier Box -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-2 pb-2 border-b border-[#d63384]">Filter By Categories</h2>
          <div class="flex flex-col gap-3 pt-3 pb-2">
            <label
                v-for="cat in categories"
                :key="cat.id"
                class="flex items-center gap-2 cursor-pointer"
            >
              <input
                  type="checkbox"
                  class="accent-[#d63384] rounded border-gray-300"
                  :value="cat.id"
                  v-model="selectedCategories"
              />
              <span class="text-gray-800">{{ cat.name }}</span>
            </label>

          </div>
<!--          <button-->
<!--              type="button"-->
<!--              class="mt-3 px-5 py-2 bg-[#d63384] text-white font-semibold rounded-lg shadow-sm transition hover:bg-white hover:text-[#d63384] border border-[#d63384] duration-300"-->
<!--          >Visa Mer</button>-->
        </div>
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-2 pb-2 border-b border-[#d63384]">Filter By Stores</h2>
          <div class="flex flex-col gap-3 pt-3 pb-2">
            <label
                v-for="store in stores"
                :key="store.id"
                class="flex items-center gap-2 cursor-pointer"
            >
              <input
                  type="checkbox"
                  class="accent-[#d63384] rounded border-gray-300"
                  :value="store.id"
                  v-model="selectedStores"
              />
              <span class="text-gray-800">{{ store.name }}</span>
            </label>

          </div>
<!--          <button-->
<!--              type="button"-->
<!--              class="mt-3 px-5 py-2 bg-[#d63384] text-white font-semibold rounded-lg shadow-sm transition hover:bg-white hover:text-[#d63384] border border-[#d63384] duration-300"-->
<!--          >Visa Mer</button>-->
        </div>
      </div>
    </aside>

    <!-- Coupon Cards Grid -->
    <div class="w-full md:w-3/4">
      <div v-if="loading" class="text-center py-10">Loading Coupons...</div>
      <div v-else-if="offers.length === 0" class="text-center py-16 text-gray-400 text-lg font-medium">
        No coupons found for this category.<br>
        Try removing filters or select a different category.<br>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              Discover More
            </NuxtLink>
          </div>
        </div>
      </div>
      <Pagination
          :page="page"
          :totalPages="meta.totalPages"
          @update:page="page = $event"
      />
    </div>
  </section>
</template>

<script setup>
import {onMounted, ref, watch } from "vue";
import Pagination from "~/components/Pagination.vue"
import { usePageMeta } from '~/composables/usePageMeta'
import HeroSection from "~/components/common/HeroSection.vue";

const categories = ref([])
const stores = ref([])
const offers = ref([])
const route = useRoute()

usePageMeta('Browse', 'Browse all coupons on Veckans R.')
onMounted(async () => {
  categories.value = await $fetch('/api/categories');
  stores.value = await $fetch('/api/stores');
  if (route.query.categories) {
    selectedCategories.value = Array.isArray(route.query.categories)
        ? route.query.categories.map(Number)
        : [Number(route.query.categories)]
  }
  await loadOffers()
})

const meta = ref({ page: 1, perPage: 21, total: 0, totalPages: 1 })
const loading = ref(false)
const selectedCategories = ref([])
const selectedStores = ref([])
// Set your default values here
const page = ref(1)
const perPage = ref(21)

async function loadOffers() {
  loading.value = true
  try {
    // Build query string for selected categories
    let url = `/api/offers?page=${page.value}&limit=${perPage.value}`;
    if (selectedCategories.value.length > 0) {
      url += `&categories=${selectedCategories.value.join(',')}`;
    }
    if (selectedStores.value.length > 0) {
      url += `&stores=${selectedStores.value.join(',')}`;
    }
    const res = await $fetch(url)
    offers.value = res.data
    meta.value = res.meta
  } catch (e) {
    offers.value = []
    meta.value = { page: 1, perPage: 10, total: 0, totalPages: 1 }
  }
  loading.value = false
}

watch([page, perPage, selectedCategories,selectedStores], loadOffers)

</script>
