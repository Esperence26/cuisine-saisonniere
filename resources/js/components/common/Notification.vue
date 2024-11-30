<template>
  <div
    v-if="show"
    class="fixed inset-x-0 top-4 z-50 flex justify-center"
  >
    <div
      class="rounded-lg bg-emerald-50 p-4 shadow-lg ring-1 ring-emerald-500/10"
      :class="{
        'bg-emerald-50 ring-emerald-500/10': type === 'success',
        'bg-red-50 ring-red-500/10': type === 'error'
      }"
    >
      <div class="flex items-center gap-3">
        <CheckCircleIcon
          v-if="type === 'success'"
          class="h-5 w-5 text-emerald-500"
        />
        <XCircleIcon
          v-else
          class="h-5 w-5 text-red-500"
        />
        <p
          class="text-sm font-medium"
          :class="{
            'text-emerald-800': type === 'success',
            'text-red-800': type === 'error'
          }"
        >
          {{ message }}
        </p>
        <button
          type="button"
          class="ml-4 rounded-md p-1 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          :class="{
            'hover:bg-emerald-100 focus:ring-emerald-600': type === 'success',
            'hover:bg-red-100 focus:ring-red-600': type === 'error'
          }"
          @click="close"
        >
          <span class="sr-only">Fermer</span>
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const show = ref(true)

const close = () => {
  show.value = false
}

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(close, props.duration)
  }
})

defineExpose({
  close
})
</script>
