<template>
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('terms.title') }}</h1>
      <p class="mt-6 text-xl leading-8">{{ $t('terms.intro') }}</p>
      
      <div class="mt-10 max-w-2xl">
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('terms.usage.title') }}</h2>
        <p class="mt-6">{{ $t('terms.usage.description') }}</p>
        
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('terms.account.title') }}</h2>
        <p class="mt-6">{{ $t('terms.account.description') }}</p>
        
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('terms.orders.title') }}</h2>
        <p class="mt-6">{{ $t('terms.orders.description') }}</p>
        
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('terms.liability.title') }}</h2>
        <p class="mt-6">{{ $t('terms.liability.description') }}</p>
      </div>
    </div>
  </div>
</template>
