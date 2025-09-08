<template>
  <HeroSection :data="heroData" :colors="settings.colors"/>
  <ExclusiveSection/>
  <PopularSection/>
  <PopularCategories/>
  <BannerSection :data="bannerData"/>
  <FaqSection :data="faqData"/>
</template>
<script setup lang="ts">
import HeroSection from "~/components/homeOne/HeroSection.vue";
import ExclusiveSection from "~/components/homeOne/ExclusiveSection.vue";
import PopularSection from "~/components/homeOne/PopularSection.vue";
import PopularCategories from "~/components/homeOne/PopularCategories.vue";
import BannerSection from "~/components/homeOne/BannerSection.vue";
import FaqSection from "~/components/homeOne/FaqSection.vue";

const props = defineProps<{
  settings: Record<string, any>
}>()


const heroData = props.settings?.homeOne?.heroSection ?? {
  mainHeading: '',
  secondHeading: '',
  buttonText: '',
  image: '',
};

const bannerData = props.settings?.homeOne?.bannerSection ?? {
  mainHeading: '',
  secondHeading: '',
  buttonText: '',
  image: '',
};

const faqData = props.settings?.homeOne?.faqSection ?? {
  title: 'FAQ',
  items: []
}
</script>