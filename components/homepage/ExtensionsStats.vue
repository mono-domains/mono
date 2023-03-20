<template>
  <div class="flex flex-wrap justify-center mb-44">
    <h2 class="text-4xl text-center tracking-wide font-bold mb-6">from {{ firstAndLastTLD[0] }} to {{ firstAndLastTLD[1] }}</h2>
    <p class="text-xl text-center leading-relaxed mb-12">
      mono stores prices for
      <span class="font-semibold">{{ formatNumber(extensionsCount) }}</span>
      different extensions from
      <span class="font-semibold">{{ registrarsCount }}</span>
      different registrars!
    </p>

    <p class="text-xl text-center leading-relaxed mb-6">here are some of the cheapest extensions that you can buy right now:</p>
    <ul class="max-w-2xl flex flex-wrap justify-center pl-4">
      <ItemPricing
        v-for="(extension, key) in cheapestExtensions" :key="extension + key"
        :isExtension="true"
        :isLarge="true"
        :pricing="extension"
        class="mr-4 mb-6" />
    </ul>
    <p class="w-full text-l text-center leading-relaxed">
      <NuxtLink to="/extensions" class="text-sky-600">view all extensions</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ExtensionsStats',
  async setup() {
    const { getHomepageStatsFromApi } = useMonoApi()

    const {
      firstAndLastTLD,
      extensionsCount,
      registrarsCount,
      cheapestExtensions
    } = await getHomepageStatsFromApi()

    return {
      firstAndLastTLD,
      extensionsCount,
      registrarsCount,
      cheapestExtensions
    }
  },
  methods: {
    formatNumber(value, maximumFractionDigits = 2) {
      return parseFloat(value).toLocaleString(undefined, { maximumFractionDigits })
    }
  }
}
</script>