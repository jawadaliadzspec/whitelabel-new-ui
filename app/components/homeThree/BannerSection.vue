<template>
  <section class="relative py-6 sm:py-8">
    <!-- Outer container with padding and rounded corners -->
    <div class="mx-auto max-w-[2000px] px-4 sm:px-6 md:px-8 rounded-2xl overflow-hidden relative">

      <!-- Background Image with slightly reduced height -->
      <div class="w-full aspect-[4/3] md:aspect-[5/2] overflow-hidden rounded-2xl">
        <img
            src="https://img.meccdn.com/media/991ce6c1-336e-42d9-b486-dc27a7675675.jpg?h=500"
            class="w-full h-full object-cover"
            alt="Liseberg amusement park"
        />
      </div>

      <!-- Content Overlay -->
      <div class="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12">
        <div class="max-w-6xl mx-auto text-center">
          <div class="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <h1
                class="text-white font-bold text-2xl xs:text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl drop-shadow-lg"
            >
              {{ data.mainHeading || 'Discounts, discounts, discounts, here you will find them.' }}
            </h1>

            <p
                class="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md leading-snug sm:leading-normal px-2 sm:px-4"
            >
              {{ data.secondHeading || 'With hundreds of discounts and stores, you will find what you are looking for here!' }}
            </p>

            <div class="pt-1 sm:pt-2">
              <NuxtLink
                  :to="`/browse`"
                  class="inline-block px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 md:py-3 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              >
                {{ data.buttonText || 'Till Kampanjen' }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    mainHeading: string;
    secondHeading: string;
    buttonText: string;
  };
}>();
</script>
