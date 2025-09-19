<template>
  <hero-section :data="heroData" :colors="settings.colors" :slider="slider"/>
  <exclusive-section :data="exclusiveData"/>
  <PopularCategories :data="popularData"/>
  <banner-section :data="bannerData"/>
  <Faq :data="faqData"/>

</template>
<script setup lang="ts">
import HeroSection from "~/components/homeThree/heroSection.vue";
import ExclusiveSection from "~/components/homeThree/ExclusiveSection.vue";
import BannerSection from "~/components/homeThree/BannerSection.vue";
import PopularCategories from "~/components/homeThree/PopularCategories.vue";
import Faq from "~/components/homeThree/Faq.vue";
const props = defineProps<{
  settings: Record<string, any>
}>()

const heroData = props.settings?.homeThree?.heroSection ?? {
  mainHeading: '',
  secondHeading: '',
  buttonText: '',
  image: '',
};
const slider = props.settings?.homeThree?.sliderImages ?? [
  {url:'https://demos.wicombit.com/couponza/images/slider_1635351790.jpg'},
  {url:'https://demos.wicombit.com/couponza/images/slider_1635353238.jpg'},
  {url:'https://demos.wicombit.com/couponza/images/slider_1635352051.jpg'}
]
const bannerData = props.settings?.homeThree?.bannerSection ?? {
  mainHeading: '',
  secondHeading: '',
  buttonText: '',
  image: '',
};

const exclusiveData = props.settings?.homeThree?.exclusiveSection ?? {
  mainHeading: '',
  buttonText: '',
};
const popularData = props.settings?.homeThree?.popularSection ?? {
  mainHeading: '',
  buttonText: '',
};
const faqData = props.settings?.homeThree?.faqSection ?? {
  title: 'FAQ',
  items: []
}
</script>