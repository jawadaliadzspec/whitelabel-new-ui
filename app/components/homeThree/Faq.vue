<template>
  <section class="bg-gray-50 py-12 px-4">
    <div class="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-10">
      <!-- ✅ Always show FAQ title -->
      <h2 class="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-10">
        {{ data.title }}{{ data.title ?? 'Frequently Asked Questions' }}
      </h2>

      <!-- ✅ If FAQs available -->
      <div v-if="data.items.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
            v-for="(faq, index) in data.items"
            :key="index"
            :ref="el => faqRefs[index] = el"
            :class="[
            'rounded-md overflow-hidden transition-all duration-300 border border-[#7A5AF8]',
            activeIndex === index ? 'bg-white text-gray-800' : 'bg-[#7A5AF8] text-white'
          ]"
        >
          <!-- Question -->
          <button
              class="w-full px-6 py-4 flex justify-between items-center font-semibold hover:opacity-90 transition"
              @click="toggle(index)"
          >
            <span>{{ faq.question }}</span>
            <span class="text-xl">
              {{ activeIndex === index ? '–' : '›' }}
            </span>
          </button>

          <!-- Answer -->
          <transition name="fade">
            <div
                v-if="activeIndex === index"
                class="px-6 pb-4 text-sm text-gray-700"
            >
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>

      <!-- ❌ If no FAQs available -->
      <div v-else class="text-center text-gray-400 italic text-lg">
        No FAQs available.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

type FAQItem = {
  question: string
  answer: string
}

const props = withDefaults(
    defineProps<{
      data?: {
        title?: string
        items?: FAQItem[]
      }
    }>(),
    {
      data: () => ({
        title: 'Frequently Asked Questions',
        items: []
      })
    }
)

const activeIndex = ref<number | null>(null)
const faqRefs = ref<Record<number, HTMLElement | null>>({})

const toggle = async (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index

  await nextTick()
  const el = faqRefs.value[index]
  if (el && activeIndex.value === index) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
