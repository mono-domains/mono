<template>
  <div class="mb-44">
    <h2 class="text-4xl font-bold tracking-wide mb-6">what is mono?</h2>
    <div class="mb-20">
      <p class="text-xl leading-relaxed mb-2">mono is <em>the</em> domain name search engine for developers, entrepreneurs and domain name enthusiasts!</p>
      <p class="text-xl leading-relaxed">with mono, you can get real time information on domain availability, pricing and more in seconds!</p>
    </div>

    <div class="flex items-center mb-24">
      <div class="flex-1 mr-16">
        <h2 class="text-3xl font-bold tracking-wide mb-6">price comparisons</h2>
        <p class="text-xl leading-relaxed mb-4">mono fetches pricing data from several reputable registrars to make sure you're getting the best price!</p>
        <p class="text-xl leading-relaxed">we fetch our data several times a day to ensure what we're showing you is exactly what you'll pay.</p>
      </div>
    
      <div class="relative w-96 mr-10 overflow-hidden">
        <p class="text-2xl font-semibold mb-8">
          <span>example</span>
          <span class="text-neutral-700">.com</span>
        </p>

        <ul class="flex">
          <ItemPricing
            v-for="(registrar) of comRegistrars"
            :key="registrar.name"
            :pricing="registrar"
            class="pointer-events-none" />
        </ul>

        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white" />
      </div>
    </div>

    <div class="flex items-center">
      <div class="relative w-96 ml-10 overflow-hidden">
        <div class="bg-neutral-50 text-2xl shadow-md shadow-neutral-200 rounded px-5 py-4 tracking-wide leading-none mb-6">
          cheap cars
        </div>

        <ul>
          <li
            v-for="(result) of domainHacks"
            :key="result.domain + result.extension.extension"
            class="text-2xl font-semibold py-1.5">
            <span>{{ result.domain }}</span>
            <span class="text-neutral-700">{{ result.extension.extension }}</span>
          </li>
        </ul>

        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white" />
        <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white" />
      </div>

      <div class="flex-1 ml-16">
        <h2 class="text-3xl font-bold tracking-wide mb-6">domain hacks</h2>
        <p class="text-xl leading-relaxed mb-4">mono automatically detects and includes domain hacks in your search results to help you find shorter (and cooler) domains.</p>
        <p class="text-xl leading-relaxed">
          <a href="https://en.wikipedia.org/wiki/Domain_hack" target="_blank" class="text-sky-600">
            read more about domain hacks
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhatIsMono',
  async setup() {
    const { getHomepageStatsFromApi } = useMonoApi()

    const {
      comRegistrars,
      domainHacks
    } = await getHomepageStatsFromApi()

    return {
      comRegistrars,
      domainHacks
    }
  }
}
</script>