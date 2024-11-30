<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-16 w-auto" src="/img/logo.png" alt="Cuisine Saisonnière" />
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {{ $t('auth.login.title') }}
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                {{ $t('auth.login.email') }}
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  v-model="formData.email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                {{ $t('auth.login.password') }}
              </label>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  v-model="formData.password"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center">
                  <input
                    id="show-password"
                    name="show-password"
                    type="checkbox"
                    v-model="showPassword"
                    class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                  />
                  <label for="show-password" class="ml-3 block text-sm leading-6 text-gray-900">
                    {{ $t('auth.login.showPassword') }}
                  </label>
                </div>
                <div class="text-sm leading-6">
                  <router-link :to="{ name: 'forgot-password' }" class="font-semibold text-emerald-600 hover:text-emerald-500">
                    {{ $t('auth.login.forgotPassword') }}
                  </router-link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading" class="flex items-center">
                  <i class="fas fa-circle-notch fa-spin mr-2"></i>
                  {{ $t('auth.login.loading') }}
                </span>
                <span v-else>
                  {{ $t('auth.login.submit') }}
                </span>
              </button>
            </div>
          </form>

          <div class="mt-10">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-sm font-medium leading-6">
                <span class="bg-white px-6 text-gray-900">{{ $t('auth.login.orContinueWith') }}</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <a
                href="#"
                class="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              >
                <i class="fab fa-google text-lg"></i>
                <span class="text-sm font-semibold leading-6">Google</span>
              </a>

              <a
                href="#"
                class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
              >
                <i class="fab fa-facebook text-lg"></i>
                <span class="text-sm font-semibold leading-6">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <p class="mt-10 text-center text-sm text-gray-500">
          {{ $t('auth.login.notMember') }}
          <router-link :to="{ name: 'register' }" class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
            {{ $t('auth.login.register') }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to home page after successful login
    router.push('/')
  } catch (error) {
    alert(t('auth.login.error'))
  } finally {
    isLoading.value = false
  }
}
</script>
