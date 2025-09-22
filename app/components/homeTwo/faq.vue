<template>
  <section class="relative bg-white py-20 px-6 sm:px-12 overflow-hidden">
    <div class="max-w-4xl mx-auto relative z-10">
      <h2 class="text-4xl font-bold text-gray-800 mb-12 text-center">
        {{ data.title }}{{ data.title ?? 'Frequently Asked Questions' }}
      </h2>

      <div v-if="(data.items?.length || 0) > 0" class="grid gap-6 sm:grid-cols-2">
        <div
            v-for="(faq, idx) in data.items"
            :key="faq.question"
            class="rounded-3xl p-6 shadow-md border border-gray-300"
        >
          <h3 class="font-semibold text-lg mb-2"> {{ faq.question }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ faq.answer }}
          </p>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 italic">
        No FAQs available.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const props = withDefaults(
    defineProps<{
      data?: {
        title?: string;
        items?: { question: string; answer: string }[];
      };
    }>(),
    {
      data: () => ({
        title: 'Need Help? We’ve Got Answers',
        items: [],
      }),
    }
);
</script>
