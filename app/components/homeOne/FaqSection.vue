<template>
  <section
      class="flex flex-col md:flex-col lg:flex-row justify-evenly items-center h-auto mt-10 pb-16 px-4 sm:px-6"
  >
    <!-- FAQ Section -->
    <div class="w-full max-w-2xl bg-white p-6 space-y-4">
      <h2 class="font-bold text-3xl p-2">{{ data.title ?? 'Frequently Asked Questions' }}</h2>

      <div v-if="data.items?.length || 0 > 0">
        <div v-for="(faq, idx) in data.items" :key="faq.question">
          <button
              @click="toggleFAQ(idx)"
              class="w-full border-transparent pl-3 mt-4 border bg-pink-100 rounded-t-md flex justify-between items-center py-2 text-left text-lg font-medium text-gray-600 focus:outline-none"
          >
            {{ faq.question }}
            <span
                class="transform transition-transform duration-300 text-pink-500 pr-2 text-2xl"
            >
              {{ openIndex === idx ? '–' : '+' }}
            </span>
          </button>

          <transition name="fade">
            <div
                v-if="openIndex === idx"
                class="faq-content border-transparent shadow-lg border rounded-b-md pl-2 pb-4 text-gray-600"
            >
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
      <div v-else class="text-gray-400 italic">No FAQs available.</div>
    </div>

    <!-- Image Section -->
    <div class="w-full lg:w-1/3 pt-10 lg:pt-30 px-4 sm:px-6">
      <img
          src="https://www.veckansr.se/assets/images/frontend/faq/6547e5bb04a101699210683.jpg"
          alt="FAQ Illustration"
          class="rounded-lg shadow-lg w-full h-auto max-h-[400px] object-cover"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
    defineProps<{
      data?: {
        title?: string;
        items?: { question: string; answer: string }[];
      };
    }>(),
    {
      data: () => ({
        title: "Frequently Asked Questions",
        items: [],
      }),
    }
);

const openIndex = ref<number | null>(null);

const toggleFAQ = (idx: number) => {
  openIndex.value = openIndex.value === idx ? null : idx;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
