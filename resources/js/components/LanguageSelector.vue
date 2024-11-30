<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        @click="isOpen = !isOpen"
      >
        {{ currentLanguage.toUpperCase() }}
      </button>
    </div>

    <div
      v-if="isOpen"
      class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div class="py-1">
        <button
          v-for="lang in availableLanguages"
          :key="lang"
          class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          @click="changeLanguage(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isOpen = ref(false);

const currentLanguage = computed(() => locale.value);
const availableLanguages = ['fr', 'en', 'de'];

function changeLanguage(lang) {
  locale.value = lang;
  localStorage.setItem('locale', lang);
  isOpen.value = false;
}
</script>
