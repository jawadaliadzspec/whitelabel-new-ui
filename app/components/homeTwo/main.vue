<template>
  <HeroSection :data="heroData" :colors="settings.colors"/>
  <ExclusiveSection/>
  <PopularSection/>
  <BannerSection :data="bannerData"/>
  <PopularCategories/>
  <faq :data="faqData"/>
</template>
<script setup lang="ts">
import HeroSection from "~/components/homeTwo/HeroSection.vue";
import ExclusiveSection from "~/components/homeTwo/ExclusiveSection.vue";
import PopularSection from "~/components/homeTwo/PopularSection.vue";
import PopularCategories from "~/components/homeTwo/PopularCategories.vue";
import BannerSection from "~/components/homeTwo/BannerSection.vue";
import Faq from "~/components/homeTwo/faq.vue";


const props = defineProps<{
  settings: Record<string, any>
}>()
const heroData = props.settings?.homeTwo?.heroSection ?? {
  mainHeading: '',
  secondHeading: '',
  buttonText: '',
  image: '',
};

const bannerData = props.settings?.homeTwo?.bannerSection ?? {
  mainHeading: '',
  secondHeading: '',
  buttonText: '',
  image: '',
}

const faqData = props.settings?.homeTwo?.faqSection ?? {
  title: 'FAQ',
  items: []
}

</script>

