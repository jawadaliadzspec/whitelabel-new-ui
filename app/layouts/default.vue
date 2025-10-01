<template>
  <div>
    <component v-if="selectedNavbar" :is="selectedNavbar" :header="headerData" :logo="logo" :primaryColor="primaryColor" />

    <main class="border-gray-700">
      <slot />
    </main>

    <component v-if="selectedFooter" :is="selectedFooter" :footer="footerData" :logo="logo" />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, ref, type ShallowRef } from 'vue'
import type { Component } from 'vue'

import HeaderHomeOne from '~/components/homeOne/Header.vue'
import HeaderHomeTwo from '~/components/homeOne/Header.vue'
import HeaderHomeThree from '~/components/homeOne/Header.vue'

import FooterHomeOne from '~/components/homeOne/Footer.vue'
import FooterHomeTwo from '~/components/homeOne/Footer.vue'
import FooterHomeThree from '~/components/homeOne/Footer.vue'

const logo = ref('')
const headerData = ref({})
const footerData = ref({})
const primaryColor = ref({})

const navbarMap: Record<string, Component> = {
  homeOne: HeaderHomeOne,
  homeTwo: HeaderHomeTwo,
  homeThree: HeaderHomeThree,
}

const footerMap: Record<string, Component> = {
  homeOne: FooterHomeOne,
  homeTwo: FooterHomeTwo,
  homeThree: FooterHomeThree,
}

const selectedNavbar: ShallowRef<Component | null> = shallowRef(null)
const selectedFooter: ShallowRef<Component | null> = shallowRef(null)

onMounted(async () => {
  const settings = await $fetch('/api/settings')
  const homepageKey = settings?.homePage ?? 'homeOne'
  logo.value = settings?.logo ?? ''
  primaryColor.value = settings?.colors.primaryColor ?? '#d63384'
  headerData.value = settings?.headerFooter?.header ?? ''
  footerData.value = settings?.headerFooter?.footer ?? ''
  selectedNavbar.value = navbarMap[homepageKey] || HeaderHomeOne
  selectedFooter.value = footerMap[homepageKey] || FooterHomeOne
})
</script>
