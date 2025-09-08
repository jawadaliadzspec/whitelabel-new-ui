<template>
  <!-- Hero Section -->
  <HeroSection
      title="Contact Us"
      breadcrumb="Home / Contact Us"
  />

  <!-- Contact Content Section -->
  <section class="py-10 bg-white max-w-7xl mx-auto">
    <h2 class="text-2xl sm:text-3xl font-bold ml-6 sm:ml-16 mb-8">Get In Touch With Us</h2>
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-16 px-3 sm:px-8 lg:px-16 max-w-7xl mx-auto">
      <!-- Contact Info Boxes -->
      <div class="w-full lg:w-1/2 space-y-6">
        <!-- Ring oss Box -->
        <div class="p-6 rounded-lg border border-gray-300 bg-purple-50 shadow-sm">
          <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Call Us</h3>
          <div class="flex items-center text-pink-700 gap-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <div class="text-gray-800 text-base sm:text-lg leading-relaxed">
              {{contactSettings.phone1 || '073–1785828'}} <br />
              {{contactSettings.phone2 || '073–1785828'}}
            </div>
          </div>
        </div>
        <!-- E-post Box -->
        <div class="p-6 rounded-lg border border-gray-300 bg-purple-50 shadow-sm">
          <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">E-mail US</h3>
          <div class="flex items-center text-pink-700 gap-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <div class="text-gray-800 text-base sm:text-lg leading-relaxed">
              {{contactSettings.email1 || 'contact@company.com'}}<br />
              {{contactSettings.email2 || 'info@company.com'}}
            </div>
          </div>
        </div>
        <!-- Kontor Box -->
        <div class="p-6 rounded-lg border border-gray-300 bg-purple-50 shadow-sm">
          <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Visit Us</h3>
          <div class="flex items-center text-pink-700 gap-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 21c-4.418-4.418-6-7.418-6-10a6 6 0 1112 0c0 2.582-1.582 5.582-6 10z"/>
            </svg>
            <div class="text-gray-800 text-base sm:text-lg leading-relaxed">
              {{contactSettings.address || 'Company Address Here'}}
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="w-full lg:w-1/2 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <form class="space-y-5">
          <div>
            <input
                type="text"
                placeholder="Name"
                class="mt-1 block w-full border text-lg border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <input
                type="email"
                placeholder="E-mail"
                class="mt-1 block w-full border text-lg border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <input
                type="text"
                placeholder="Subject"
                class="mt-1 block w-full border text-lg border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <textarea
                rows="4"
                placeholder="Message"
                class="mt-1 block w-full text-lg border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-600"
            ></textarea>
          </div>
          <div class="w-full flex justify-center sm:justify-start">
            <button
                type="submit"
                class="w-full sm:w-auto bg-pink-700 hover:text-pink-700 hover:bg-white border border-pink-700 text-sm sm:text-lg transition duration-700 text-white font-bold px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              Send
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-5 w-5 flex-shrink-0"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { usePageMeta } from '~/composables/usePageMeta'
import HeroSection from "~/components/common/HeroSection.vue";
import {onMounted} from "vue";
import HomeOne from "~/components/homeOne/main.vue";

const contactSettings = ref({})
usePageMeta('Contact Us', 'Contact With Us')
onMounted(async () => {
  const settings = await $fetch('/api/settings')
  contactSettings.value = settings.contactUs
})
</script>
