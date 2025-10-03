<template>
  <footer class="relative bg-[#f5f3fc] pt-8 pb-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 px-4 md:px-8">
      <!-- Logo + Tagline -->
      <div class="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
        <span class="text-[#d63384] font-bold text-3xl mb-2" style="font-family: 'Pacifico', cursive;">
          <img width="250px" :src="logo" alt="Logo here" />
        </span>
        <span class="text-gray-500 text-lg">All discounts in one place!</span>
      </div>

      <!-- Useful Links -->
      <div class="flex-1 flex flex-col sm:flex-row justify-between gap-10">
        <!-- Useful Links -->
        <div>
          <h4 class="font-bold text-lg mb-2">{{ safeFooter.usefulLinks.mainHeading }}</h4>
          <ul class="space-y-2 text-gray-700">
            <li><NuxtLink to="/browse" class="hover:text-[#d63384] transition">{{ safeFooter.usefulLinks.discounts.text }}</NuxtLink></li>
            <li><NuxtLink to="/categories" class="hover:text-[#d63384] transition">{{ safeFooter.usefulLinks.categories.text }}</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-[#d63384] transition">{{ safeFooter.usefulLinks.contact.text }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Business Links -->
        <div>
          <h4 class="font-bold text-lg mb-2">{{ safeFooter.businessLinks.mainHeading }}</h4>
          <ul class="space-y-2 text-gray-700">
            <li><NuxtLink to="/terms" class="hover:text-[#d63384] transition">{{ safeFooter.businessLinks.termOfService.text }}</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-[#d63384] transition">{{ safeFooter.businessLinks.privacyPolicy.text }}</NuxtLink></li>
            <li><NuxtLink to="/cookies" class="hover:text-[#d63384] transition">{{ safeFooter.businessLinks.cookiePolicy.text }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="sm:max-w-xs w-full">
          <h4 class="font-bold text-lg mb-2">{{ safeFooter.newsLetter.mainHeading }}</h4>
          <p class="text-gray-700 text-sm mb-4">{{ safeFooter.newsLetter.subHeading }}</p>
          <form class="flex">
            <input
                type="email"
                class="rounded-l-lg border border-[#d63384] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#d63384] w-full"
                placeholder="Ange din email här.."
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

      <!-- Back to top -->
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

<script setup lang="ts">
import { computed } from "vue"

// ✅ Footer types
interface FooterLink {
  text: string
}
interface FooterSection {
  mainHeading: string
  [key: string]: FooterLink | string
}
interface FooterData {
  usefulLinks: {
    mainHeading: string
    discounts: FooterLink
    categories: FooterLink
    contact: FooterLink
  }
  businessLinks: {
    mainHeading: string
    termOfService: FooterLink
    privacyPolicy: FooterLink
    cookiePolicy: FooterLink
  }
  newsLetter: {
    mainHeading: string
    subHeading: string
  }
}

// ✅ Props with optional values
const props = defineProps<{
  logo?: string
  footer?: Partial<FooterData>
}>()

// ✅ Defaults
const defaultFooter: FooterData = {
  usefulLinks: {
    mainHeading: "Useful Links",
    discounts: { text: "Discounts" },
    categories: { text: "Categories" },
    contact: { text: "Contact" },
  },
  businessLinks: {
    mainHeading: "Business Links",
    termOfService: { text: "Terms of Service" },
    privacyPolicy: { text: "Privacy Policy" },
    cookiePolicy: { text: "Cookie Policy" },
  },
  newsLetter: {
    mainHeading: "Newsletter",
    subHeading: "Stay up to date with the latest news, updates and offers by subscribing to our newsletter.",
  },
}

// ✅ Merge props.footer with defaults
const safeFooter = computed<FooterData>(() => {
  return {
    ...defaultFooter,
    ...props.footer,
    usefulLinks: { ...defaultFooter.usefulLinks, ...props.footer?.usefulLinks },
    businessLinks: { ...defaultFooter.businessLinks, ...props.footer?.businessLinks },
    newsLetter: { ...defaultFooter.newsLetter, ...props.footer?.newsLetter },
  }
})

// ✅ Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const logo = props.logo || "/default-logo.png"
</script>
