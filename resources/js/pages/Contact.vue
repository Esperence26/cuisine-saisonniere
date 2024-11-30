<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="relative isolate bg-gradient-to-b from-emerald-100/20">
      <div class="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {{ $t('contact.hero.title') }}
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                {{ $t('contact.hero.description') }}
              </p>
              <div class="mt-10 space-y-6">
                <div class="flex gap-x-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600">
                    <i class="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-900">{{ $t('contact.address.title') }}</h3>
                    <address class="mt-2 text-sm text-gray-600 not-italic">
                      {{ $t('contact.address.street') }}<br>
                      {{ $t('contact.address.city') }}<br>
                      {{ $t('contact.address.country') }}
                    </address>
                  </div>
                </div>
                <div class="flex gap-x-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600">
                    <i class="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-900">{{ $t('contact.phone.title') }}</h3>
                    <p class="mt-2 text-sm text-gray-600">
                      <a href="tel:+33123456789" class="hover:text-emerald-600">+33 1 23 45 67 89</a>
                    </p>
                    <p class="mt-2 text-sm text-gray-600">
                      {{ $t('contact.phone.hours') }}
                    </p>
                  </div>
                </div>
                <div class="flex gap-x-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600">
                    <i class="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-900">{{ $t('contact.email.title') }}</h3>
                    <p class="mt-2 text-sm text-gray-600">
                      <a href="mailto:contact@cuisine-saisonniere.fr" class="hover:text-emerald-600">
                        contact@cuisine-saisonniere.fr
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 lg:px-0">
          <!-- Contact form -->
          <form @submit.prevent="submitForm" class="mx-auto mt-16 max-w-xl sm:mt-20">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">
                  {{ $t('contact.form.name') }}
                </label>
                <div class="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    v-model="formData.name"
                    autocomplete="name"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">
                  {{ $t('contact.form.email') }}
                </label>
                <div class="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="formData.email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="subject" class="block text-sm font-semibold leading-6 text-gray-900">
                  {{ $t('contact.form.subject') }}
                </label>
                <div class="mt-2.5">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    v-model="formData.subject"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">
                  {{ $t('contact.form.message') }}
                </label>
                <div class="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    v-model="formData.message"
                    rows="4"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="mt-8 flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="rounded-md bg-emerald-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">
                  <i class="fas fa-circle-notch fa-spin mr-2"></i>
                  {{ $t('contact.form.sending') }}
                </span>
                <span v-else>
                  {{ $t('contact.form.send') }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#68a384] to-[#34d399] opacity-30" />
      </div>
    </div>

    <!-- Map section -->
    <div class="mt-20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647874587201!5m2!1sfr!2sfr"
        class="w-full h-96 rounded-lg shadow-lg"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    // Show success message
    alert(t('contact.form.success'))
  } catch (error) {
    alert(t('contact.form.error'))
  } finally {
    isSubmitting.value = false
  }
}
</script>
