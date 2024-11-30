<template>
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('privacy.title') }}</h1>
      <p class="mt-6 text-xl leading-8">{{ $t('privacy.intro') }}</p>
      
      <div class="mt-10 max-w-2xl">
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('privacy.data_collection.title') }}</h2>
        <p class="mt-6">{{ $t('privacy.data_collection.description') }}</p>
        
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('privacy.data_usage.title') }}</h2>
        <p class="mt-6">{{ $t('privacy.data_usage.description') }}</p>
        
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('privacy.cookies.title') }}</h2>
        <p class="mt-6">{{ $t('privacy.cookies.description') }}</p>
        
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">{{ $t('privacy.contact.title') }}</h2>
        <p class="mt-6">{{ $t('privacy.contact.description') }}</p>
      </div>
    </div>
  </div>
</template>
