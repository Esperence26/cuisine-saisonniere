<template>
  <div class="flex items-center">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          {{ $t('products.sortBy') }}
          <ChevronDownIcon
            class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem
              v-for="option in sortOptions"
              :key="option.value"
              v-slot="{ active }"
            >
              <button
                :class="[
                  option.value === modelValue ? 'font-medium text-gray-900' : 'text-gray-500',
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm w-full text-left'
                ]"
                @click="$emit('update:modelValue', option.value)"
              >
                {{ $t(option.label) }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])

const sortOptions = [
  { value: 'price-asc', label: 'sort.priceAsc' },
  { value: 'price-desc', label: 'sort.priceDesc' },
  { value: 'name-asc', label: 'sort.nameAsc' },
  { value: 'name-desc', label: 'sort.nameDesc' }
]
</script>
