<template>
  <header
      class="bg-[#020420] flex items-center justify-between p-6"
  >
    <nuxt-link to="/" class="hover:cursor-pointer">
      <img src="~/assets/images/logo.svg" alt="logo"/>
    </nuxt-link>

    <button
        type="button"
        class="lg:hidden"
        @click="isDrawerOpen = true"
    >
      <img src="~/assets/images/bars.svg" class="h-8 w-8" alt="mobile menu"></img>
    </button>

    <!-- nav var (for PC) -->
    <nav class="hidden lg:block">
      <ul class="flex space-x-8 text-xl text-white ">
        <li>
          <span class="hover:underline hover:decoration-1">Home</span>
        </li>
        <li>
          <span class="hover:underline hover:decoration-1">Get started</span>
        </li>
        <li>
          <span class="hover:underline hover:decoration-1">Modules</span>
        </li>
        <li>
          <span class="hover:underline hover:decoration-1">Examples</span>
        </li>
      </ul>
    </nav>

    <!-- drawer menu (for mobile) -->
    <aside
        class="bg-[#020420] fixed top-0 left-0 w-full h-full z-30 p-8 ease-in-out transition-all duration-300"
        :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex justify-end">
        <button
            type="button"
            @click="isDrawerOpen = false"
        >
          <img src="~/assets/images/xmark.svg" class="h-8 w-8" alt="mark"/>
        </button>
      </div>

      <ul class="flex flex-col items-center space-y-6 text-xl text-white">
        <li @click="isDrawerOpen = false">
          <span class="hover:underline hover:decoration-1">Home</span>
        </li>
        <li @click="isDrawerOpen = false">
          <span class="hover:underline hover:decoration-1">Get started</span>
        </li>
        <li @click="isDrawerOpen = false">
          <span class="hover:underline hover:decoration-1">Modules</span>
        </li>
        <li @click="isDrawerOpen = false">
          <span class="hover:underline hover:decoration-1">Examples</span>
        </li>
      </ul>
    </aside>
  </header>
</template>

<style scoped></style>
<script setup lang="ts">
const isDrawerOpen = ref<boolean>(false)
</script>
