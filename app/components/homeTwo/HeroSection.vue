<template>
  <!-- Hero Section -->
  <section>
    <!-- Gradient background with header - adjusted padding for mobile -->
    <div
        class="relative bg-gradient-to-br from-purple-700 to-blue-900 text-white pt-12 md:pt-16 pb-32 md:pb-48 lg:pb-2 h-auto md:h-[32rem] text-center px-4"
    >
      <div  class="max-w-6xl mx-auto">
        <h1 :style="{ color: primaryColor }" class="text-3xl md:text-4xl lg:text-5xl text-yellow-400 font-extrabold leading-tight mb-4"
        > {{ data.mainHeading || 'Save money' }}

        </h1>
        <p :style="{ color: secondaryColor }" class="text-base md:text-lg text-purple-200 px-2 md:px-4">
          {{ data.secondHeading || 'Over 3000 discounts available now!' }}
          .
        </p>
        <br class="hidden md:block" />

        <!-- Cards on medium and larger screens: absolutely positioned - EXACTLY as you had -->
        <div
            class="hidden md:block absolute inset-x-0 bottom-0 translate-y-32 px-6"
        >
          <div
              class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 h-80"
          >
            <!-- Cards (same content) -->
            <div
                class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                  src="https://www.studentkortet.se/wp-content/uploads/2023/09/adlibris-large.jpg"
                  alt="Chrome extension"
                  class="w-full h-48 object-cover"
              />
              <div class="p-8">
                <h3 class="text-lg font-bold text-gray-800">
                  Installera vårt Chrome-tillägg
                </h3>
                <a href="#" class="text-sm text-purple-600 hover:underline"
                >Upptäck mer</a
                >
              </div>
            </div>

            <div
                class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                  src="https://www.studentkortet.se/wp-content/uploads/2024/12/nextory-large.jpg"
                  alt="Rekommenderas"
                  class="w-full h-48 object-cover"
              />
              <div class="p-8">
                <h3 class="text-lg font-bold text-gray-800">
                  Rekommenderas för dig
                </h3>
                <a href="#" class="text-sm text-purple-600 hover:underline"
                >Upptäck mer</a
                >
              </div>
            </div>

            <div
                class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                  src="https://www.studentkortet.se/wp-content/uploads/2022/06/samsung-large-new.jpg"
                  alt="Hett just nu"
                  class="w-full h-48 object-cover"
              />
              <div class="p-8">
                <h3 class="text-lg font-bold text-gray-800">Hett just nu</h3>
                <a href="#" class="text-sm text-purple-600 hover:underline"
                >Upptäck erbjudanden</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards on small screens: shown normally in flow - EXACTLY as you had -->
    <div class="block md:hidden px-6 mt-8 mb-12">
      <div class="grid grid-cols-1 gap-6">
        <!-- Same 3 cards repeated -->
        <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <img
              src="https://www.studentkortet.se/wp-content/uploads/2023/09/adlibris-large.jpg"
              alt="Chrome extension"
              class="w-full h-48 object-cover"
          />
          <div class="p-8">
            <h3 class="text-lg font-bold text-gray-800">
              Installera vårt Chrome-tillägg
            </h3>
            <a href="#" class="text-sm text-purple-600 hover:underline"
            >Upptäck mer</a
            >
          </div>
        </div>

        <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <img
              src="https://www.studentkortet.se/wp-content/uploads/2024/12/nextory-large.jpg"
              alt="Rekommenderas"
              class="w-full h-48 object-cover"
          />
          <div class="p-8">
            <h3 class="text-lg font-bold text-gray-800">
              Rekommenderas för dig
            </h3>
            <a href="#" class="text-sm text-purple-600 hover:underline"
            >Upptäck mer</a
            >
          </div>
        </div>

        <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <img
              src="https://www.studentkortet.se/wp-content/uploads/2022/06/samsung-large-new.jpg"
              alt="Hett just nu"
              class="w-full h-48 object-cover"
          />
          <div class="p-8">
            <h3 class="text-lg font-bold text-gray-800">Hett just nu</h3>
            <a href="#" class="text-sm text-purple-600 hover:underline"
            >Upptäck erbjudanden</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- White background section to show overlap on large screens - adjusted height for mobile -->
    <div class="bg-white h-32 lg:h-50"></div>
  </section>
</template>
<script setup lang="ts">
const props = defineProps<{
  data: {
    mainHeading: string;
    secondHeading: string;
    buttonText: string;
    image: string;
  },
  colors: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}>()
const primaryColor = computed(() => props.colors?.primaryColor || '#d63384');
const secondaryColor = computed(() => props.colors?.secondaryColor || '#a76e81');
</script>