<template>
  <div class="mb-44">
    <h2 class="text-3xl sm:text-4xl font-bold tracking-wide mb-4 sm:mb-6">what is mono?</h2>
    <div class="mb-28">
      <p class="text-l sm:text-xl leading-relaxed mb-2 sm:mb-4">mono is <em>the</em> domain name search engine for developers, entrepreneurs and domain name enthusiasts!</p>
      <p class="text-l sm:text-xl leading-relaxed">with mono, you can get real time information on domain availability, pricing and more in seconds!</p>
    </div>

    <div class="flex flex-wrap items-center mb-28">
      <div class="relative w-96 mr-10 mb-10 md:mb-0 md:order-1 overflow-hidden">
        <p class="text-2xl font-semibold mb-8">
          <span>example</span>
          <span class="text-neutral-700">.com</span>
        </p>

        <ul class="w-max">
          <ItemPricing
            v-for="(registrar) of comRegistrars"
            :key="registrar.name"
            :pricing="registrar"
            class="!inline-block pointer-events-none" />
        </ul>

        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white" />
      </div>

      <div class="basis-full flex-1 md:basis-0 md:order-0 mr-16">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-wide mb-4 sm:mb-6">cheapest domain names</h2>
        <p class="text-l sm:text-xl leading-relaxed mb-2 sm:mb-4">mono fetches pricing data from several reputable registrars to make sure you can find the cheapest domain name prices!</p>
        <p class="text-l sm:text-xl leading-relaxed">we fetch our data several times a day to ensure what we're showing you is exactly what you'll pay.</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center">
      <div class="relative w-96 mb-10 md:mb-0 md:ml-10 overflow-hidden">
        <div class="relative">
          <div class="bg-neutral-50 text-2xl shadow-md shadow-neutral-200 rounded pl-14 py-4 tracking-wide leading-none mb-6">
            cheap cars
          </div>

          <div class="absolute top-0 left-0 w-14 h-full pt-0.5 pl-0.5 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6">
              <path d="m23.809 21.646-6.205-6.205a9.68 9.68 0 0 0 1.857-5.711C19.461 4.365 15.096 0 9.73 0 4.365 0 0 4.365 0 9.73c0 5.366 4.365 9.73 9.73 9.73a9.678 9.678 0 0 0 5.487-1.698L21.455 24l2.354-2.354zM2.854 9.73c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877A6.884 6.884 0 0 1 2.854 9.73z"/>
            </svg>
          </div>
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

      <div class="basis-full md:basis-0 flex-1 md:ml-16">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-wide mb-4 sm:mb-6">domain hacks</h2>
        <p class="text-l sm:text-xl leading-relaxed mb-2 sm:mb-4">mono automatically detects and includes domain hacks in your search results.</p>
        <p class="text-l sm:text-xl leading-relaxed mb-2 sm:mb-4">domain hacks can help you create a shorter, more memorable and cooler domain name!</p>
        <p class="text-l sm:text-xl leading-relaxed">
          <BaseLink to="https://en.wikipedia.org/wiki/Domain_hack">
            read more about domain hacks
          </BaseLink>
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