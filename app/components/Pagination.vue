<template>
  <nav v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8 flex-wrap select-none" aria-label="pagination">
    <!-- Previous Button -->
    <button
        @click="goTo(page - 1)"
        :disabled="page === 1"
        :class="[
        'px-3 py-1 rounded-lg border font-semibold transition',
        page === 1
          ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
          : 'border-gray-300 text-[#d63384] bg-white hover:bg-[#fbeff7] cursor-pointer'
      ]"
        aria-label="Föregående"
    >&lt; Previous</button>

    <!-- Page Numbers -->
    <template v-for="p in visiblePages" :key="p">
      <button
          v-if="p !== '...'"
          @click="goTo(p)"
          :class="[
          'mx-0.5 px-3 py-1 rounded-lg border font-semibold transition cursor-pointer',
          p === page
            ? 'bg-[#d63384] border-[#d63384] text-white shadow'
            : 'bg-white border-gray-200 text-[#d63384] hover:bg-[#fbeff7]'
        ]"
          :aria-current="p === page ? 'page' : undefined"
      >{{ p }}</button>
      <span v-else class="mx-1 px-2 text-gray-400">…</span>
    </template>

    <!-- Next Button -->
    <button
        @click="goTo(page + 1)"
        :disabled="page === totalPages"
        :class="[
        'px-3 py-1 rounded-lg border font-semibold transition',
        page === totalPages
          ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
          : 'border-gray-300 text-[#d63384] bg-white hover:bg-[#fbeff7] cursor-pointer'
      ]"
        aria-label="Nästa"
    >Next &gt;</button>
  </nav>
</template>


<script setup>
import { computed } from "vue"
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})
const emit = defineEmits(['update:page'])

// Compact page numbers logic
const visiblePages = computed(() => {
  const total = props.totalPages
  const cur = props.page
  const pages = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (cur <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total)
    } else if (cur >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', cur - 1, cur, cur + 1, '...', total)
    }
  }
  return pages
})
function goTo(p) {
  if (typeof p === "number" && p !== props.page && p >= 1 && p <= props.totalPages) {
    emit('update:page', p)
  }
}
</script>
