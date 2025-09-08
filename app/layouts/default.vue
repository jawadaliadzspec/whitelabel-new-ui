<template>
  <div>
    <component v-if="selectedNavbar" :is="selectedNavbar" />

    <main class="border-gray-700">
      <slot />
    </main>

    <component v-if="selectedFooter" :is="selectedFooter" />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, type ShallowRef } from 'vue'
import HeaderHomeOne from '~/components/homeOne/Header.vue'
import HeaderHomeTwo from '~/components/homeOne/Header.vue'
import FooterHomeOne from '~/components/homeOne/Footer.vue'
import FooterHomeTwo from '~/components/homeOne/Footer.vue'
import HeaderHomeThree from '~/components/homeOne/Header.vue'
import FooterHomeThree from '~/components/homeOne/Footer.vue'

type DynamicComponent = typeof HeaderHomeOne
const navbarMap: Record<string, DynamicComponent> = {
  homeOne: HeaderHomeOne,
  homeTwo: HeaderHomeTwo,
  homeThree: HeaderHomeThree,
}
const footerMap: Record<string, DynamicComponent> = {
  homeOne: FooterHomeOne,
  homeTwo: FooterHomeTwo,
  homeThree: FooterHomeThree,
}

const selectedNavbar: ShallowRef<DynamicComponent | null> = shallowRef(null)
const selectedFooter: ShallowRef<DynamicComponent | null> = shallowRef(null)

onMounted(async () => {
  const settings = await $fetch('/api/settings')
  const homepageKey = settings?.homePage ?? 'homeOne'

  selectedNavbar.value = navbarMap[homepageKey] || HeaderHomeOne
  selectedFooter.value = footerMap[homepageKey] || FooterHomeOne
})
</script>
