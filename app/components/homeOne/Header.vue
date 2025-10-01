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
      <li v-for="(item,index) in navLinks" :key="index">
        <NuxtLink
            :to="item.link"
            class="transition pb-1"
            :class="{ 'border-b-2': isActive(item.link) }"
            :style="{
        color: isActive(item.link) ? primaryColor : '',
        borderColor: isActive(item.link) ? primaryColor : '',
      }"
        >
          {{ item.text }}
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
            <span class="font-bold text-2xl" :style="{ color: primaryColor, fontFamily: 'Pacifico' }">{{ appName }}</span>
          </NuxtLink>
          <button @click="toggleMenu" class="text-3xl px-2 focus:outline-none" :style="{ color: primaryColor }">
            &times;
          </button>
        </div>

        <ul class="flex flex-col gap-4 text-lg font-medium">
          <li v-for="(item, i) in navLinks" :key="i">
            <NuxtLink
                :to="item.link"
                class="transition pb-1"
                :class="{ 'border-b-2': isActive(item.link) }"
                :style="{
                color: isActive(item.link) ? primaryColor : '',
                borderColor: isActive(item.link) ? primaryColor : '',
              }"
                @click="closeMenu"
            >
              {{ item.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRuntimeConfig } from '#imports'

const mobileMenuOpen = ref(false)
const toggleMenu = () => (mobileMenuOpen.value = !mobileMenuOpen.value)
const closeMenu = () => (mobileMenuOpen.value = false)

const logo = ref('')
const appName = ref('')
const primaryColor = ref('#d63384')

// ✅ Props typing
interface HeaderItem {
  text: string
  link: string
}

const props = defineProps<{
  logo?: string
  primaryColor?: string
  header?: Record<string, HeaderItem | undefined>
}>()

// ✅ Default nav items (if backend gives nothing)
const defaultHeader: Record<string, HeaderItem> = {
  home: { text: 'Home', link: '/' },
  browse: { text: 'Browse', link: '/browse' },
  categories: { text: 'Categories', link: '/categories' },
  contact: { text: 'Contact', link: '/contact' },
}

// ✅ Menu order
const menuOrder = ['home', 'browse', 'categories', 'contact']

// ✅ Strongly typed navLinks (fallback to defaultHeader)
const navLinks = computed<HeaderItem[]>(() =>
    menuOrder
        .map(key => props.header?.[key] || defaultHeader[key]) // fallback
        .filter((item): item is HeaderItem => !!item)
)

onMounted(() => {
  logo.value = props.logo || '/default-logo.png'
  primaryColor.value = props.primaryColor || '#d63384'

  const config = useRuntimeConfig()
  appName.value = config.public.appName || 'My App'
})

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>


