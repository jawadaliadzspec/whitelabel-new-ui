<template>
  <footer class="relative bg-[#f5f3fc] pt-8 pb-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 px-4 md:px-8">
      <!-- Logo + Tagline -->
      <div class="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
        <span class="text-[#d63384] font-bold text-3xl mb-2" style="font-family: 'Pacifico', cursive;">
          Veckans R
        </span>
        <span class="text-gray-500 text-lg">All discounts in one place!</span>
      </div>

      <!-- Useful Links -->
      <div class="flex-1 flex flex-col sm:flex-row justify-between gap-10">
        <!-- Användbara länkar -->
        <div>
          <h4 class="font-bold text-lg mb-2">Useful Links</h4>
          <ul class="space-y-2 text-gray-700">
            <li><NuxtLink to="/browse" class="hover:text-[#d63384] transition">Discounts</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-[#d63384] transition">Categories</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-[#d63384] transition">Contact</NuxtLink></li>
<!--            <li><NuxtLink to="/login" class="hover:text-[#d63384] transition">Logga in</NuxtLink></li>-->
          </ul>
        </div>
        <!-- Företagslänkar -->
        <div>
          <h4 class="font-bold text-lg mb-2">Business links</h4>
          <ul class="space-y-2 text-gray-700">
<!--            <li><NuxtLink to="/" class="hover:text-[#d63384] transition">Blog</NuxtLink></li>-->
            <li><NuxtLink to="/" class="hover:text-[#d63384] transition">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-[#d63384] transition">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-[#d63384] transition">Cookie Policy</NuxtLink></li>
          </ul>
        </div>
        <!-- Nyhetsbrev -->
        <div class="sm:max-w-xs w-full">
          <h4 class="font-bold text-lg mb-2">Newsletter</h4>
          <p class="text-gray-700 text-sm mb-4">
            Stay up to date with the latest news, updates and offers by subscribing to our newsletter.
          </p>
          <form class="flex">
            <input
                type="email"
                class="rounded-l-lg border border-[#d63384] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#d63384] w-full"
                placeholder="Enter your email here"
            />
            <button
                type="submit"
                class="bg-[#d63384] hover:bg-white hover:text-[#d63384] border border-[#d63384] text-white text-xl px-6 py-2 rounded-r-lg flex items-center justify-center transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Copyright & Back To Top -->
    <div class="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 pt-6 px-4 max-w-7xl mx-auto">
      <span class="text-gray-600 text-base text-center sm:text-left w-full sm:w-auto">
        Copyright 2025. All rights reserved.
      </span>
      <!-- Back to top button -->
      <button
          @click="scrollToTop"
          class="fixed z-40 bottom-8 right-8 bg-white border-2 border-[#d63384] shadow-2xl w-14 h-14 rounded-full flex items-center justify-center transition hover:bg-[#fbeff7]"
          aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#d63384]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" fill="none"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16V8m0 0l-4 4m4-4l4 4"/>
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>
