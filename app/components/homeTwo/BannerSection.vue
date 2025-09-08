<template>
  <div class="relative w-full mx-auto rounded-xl overflow-hidden p-4 sm:p-6 md:p-8">
    <!-- Background Image -->
    <img
        :src="'https://www.studentkortet.se/wp-content/uploads/2024/09/bokus-stuk-host-24-web.jpg'"
        :alt="'Bokus student offer'"
        class="w-full h-auto min-h-[260px] sm:min-h-[320px] object-cover rounded-xl"
    />

    <!-- Overlay Content -->
    <div class="absolute inset-0 flex items-center justify-start px-4 sm:px-6 md:px-10">
      <div class="text-left space-y-4 sm:space-y-5 max-w-full">
        <!-- Orange Heading -->
        <h2
            class="text-orange-600 font-bold leading-snug
          text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
          max-w-full sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[660px]"
        >
          {{
            data.secondHeading?.trim() ||
            "With hundreds of discounts and stores, you will find what you are looking for here!"
          }}
        </h2>

        <!-- Main Paragraph -->
        <p
            class="text-gray-900 font-extrabold leading-snug
          text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
          max-w-full sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[660px]"
        >
          {{
            data.mainHeading?.trim() ||
            "Discounts, discounts, discounts, here you will find them."
          }}
        </p>

        <!-- CTA Button -->
        <a
            :href="data.buttonLink || '#'"
            class="inline-block bg-black text-white font-semibold
          text-sm sm:text-base md:text-lg
          px-6 py-2 sm:px-8 sm:py-3 rounded-full transition hover:bg-gray-800"
        >
          {{ data.buttonText?.trim() || "TILL ERBJUDANDET" }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    mainHeading?: string;
    secondHeading?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}>();
</script>
