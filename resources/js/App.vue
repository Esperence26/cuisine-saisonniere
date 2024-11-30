<template>
  <div class="min-h-screen bg-gray-50">
    <Suspense>
      <template #default>
        <Navigation />
      </template>
      <template #fallback>
        <div class="h-16 bg-white shadow"></div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <router-view v-slot="{ Component }">
          <component :is="Component" :key="$route.fullPath" />
        </router-view>
      </template>
      <template #fallback>
        <div class="flex items-center justify-center min-h-[60vh]">
          <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <Footer />
      </template>
      <template #fallback>
        <div class="h-64 bg-emerald-800"></div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const Navigation = defineAsyncComponent(() => 
  import('@/components/layout/Navigation.vue')
)

const Footer = defineAsyncComponent(() => 
  import('@/components/layout/Footer.vue')
)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
