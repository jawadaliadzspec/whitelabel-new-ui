<template>
  <div class="bg-purple-100 min-h-[16rem] flex items-center justify-center text-center px-2">
    <div>
      <h1 class="text-3xl sm:text-4xl font-semibold">{{ title }}</h1>
      <p class="mt-3 sm:mt-4 text-base sm:text-lg flex items-center justify-center gap-2 text-gray-700">
        <i class="fa-solid fa-house small"></i>
        <span v-if="breadcrumb" v-html="breadcrumb" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
 defineProps<{
  title: string
  breadcrumb?: string
}>()
</script>
