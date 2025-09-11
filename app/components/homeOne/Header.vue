<template>
  <header class="relative overflow-hidden" :style="{ backgroundColor: '#f5f3fc', '--primary-color': primaryColor }">
    <nav class="max-w-7xl mx-auto flex items-center justify-between py-7 px-4 md:px-10">
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" @click="closeMenu">
          <span class="font-bold text-2xl" :style="{ color: primaryColor, fontFamily: 'Pacifico' }">
            <img width="250px" :src="logo" :alt="appName" />
          </span>
        </NuxtLink>
      </div>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex gap-7 items-center font-medium text-lg">
        <li v-for="(item, i) in navLinks" :key="i">
          <NuxtLink
              :to="item.to"
              class="transition pb-1"
              :class="{ 'border-b-2': isActive(item.to) }"
              :style="{
              color: isActive(item.to) ? primaryColor : '',
              borderColor: isActive(item.to) ? primaryColor : '',
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
          class="md:hidden flex items-center px-3 py-2 border rounded focus:outline-none"
          :style="{ color: primaryColor, borderColor: primaryColor }"
          @click="toggleMenu"
          aria-label="Open main menu"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>

    <!-- Overlay -->
    <transition name="fade">
      <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          @click.self="toggleMenu"
      />
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div
          v-if="mobileMenuOpen"
          class="fixed top-0 left-0 right-0 z-50 p-6 shadow-lg bg-[#f5f3fc] md:hidden"
      >
        <div class="flex justify-between items-center mb-4">
          <NuxtLink to="/" @click="closeMenu">
            <span class="font-bold text-2xl" :style="{ color: primaryColor, fontFamily: 'Pacifico' }">Veckans R</span>
          </NuxtLink>
          <button @click="toggleMenu" class="text-3xl px-2 focus:outline-none" :style="{ color: primaryColor }">
            &times;
          </button>
        </div>

        <ul class="flex flex-col gap-4 text-lg font-medium">
          <li v-for="(item, i) in navLinks" :key="i">
            <NuxtLink
                :to="item.to"
                class="transition pb-1"
                :class="{ 'border-b-2': isActive(item.to) }"
                :style="{
                color: isActive(item.to) ? primaryColor : '',
                borderColor: isActive(item.to) ? primaryColor : '',
              }"
                @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#imports';

const mobileMenuOpen = ref(false);
const toggleMenu = () => (mobileMenuOpen.value = !mobileMenuOpen.value);
const closeMenu = () => (mobileMenuOpen.value = false);

const logo = ref('');
const appName = ref({});
const primaryColor = ref('#d63384'); // fallback

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/browse', label: 'Browse' },
  { to: '/contact', label: 'Contact' },
];

onMounted(async () => {
  const settings:any = await $fetch("/api/settings");

  logo.value = settings?.logo;
  primaryColor.value = settings?.colors?.primaryColor || '#d63384';

  const config = useRuntimeConfig();
  appName.value = config.public.appName;
});

const route = useRoute();
const isActive = (path: string) => route.path === path;
</script>

<style scoped>
a {
  transition: color 0.2s ease, border-color 0.2s ease;
}

/* Hover color for all links */
a:hover {
  color: var( --primary-color);
}

/* Border hover if border-b-2 is applied */
a.border-b-2:hover {
  border-color: var( --primary-color);
}

/* Mobile menu close button hover */
button:hover {
  color: var( --primary-color);
  border-color: var( --primary-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-32px);
  opacity: 0;
}
</style>
