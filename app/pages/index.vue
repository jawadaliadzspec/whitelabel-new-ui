<template>
  <component v-if="selectedComponent" :is="selectedComponent" :settings="homeSettings" />
</template>

<script setup>
import { shallowRef, onMounted } from 'vue'
import HomeOne from '~/components/homeOne/main.vue'
import HomeTwo from '~/components/homeTwo/main.vue'
import HomeThree from '~/components/homeThree/main.vue'
import { usePageMeta } from '~/composables/usePageMeta'

usePageMeta('Home', 'Contact With Us')
const componentMap = {
  homeOne: HomeOne,
  homeTwo: HomeTwo,
  homeThree: HomeThree,

}

const selectedComponent = shallowRef(null) // no component yet
const homeSettings = ref({})
onMounted(async () => {
  const settings=useFetch('/api/settings')
  // const settings = await $fetch('/api/settings')
  homeSettings.value = settings
  const homepageKey = settings?.homePage ?? 'homeOne'

  if (componentMap[homepageKey]) {
    selectedComponent.value = componentMap[homepageKey]
  } else {
    selectedComponent.value = HomeOne
  }
})

</script>
