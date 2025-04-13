<script setup>
const { getAllExtensionsFromApi } = useMonoApi()

const allExtensions = await getAllExtensionsFromApi()

const extensions = {}

// We want to now group these into alphabetical order
for (const [category, extensionList] of Object.entries(allExtensions.results)) {
  const formattedExtensionsList = []

  Object.values(extensionList).forEach(extension => {
    if (!extension.registrars) {
      return
    }

    formattedExtensionsList.push({
      registrar: extension.registrars[0].registrar,
      extension: extension.extension,
      registerPrice: extension.registrars[0].registerPrice,
      renewalPrice: extension.registrars[0].renewalPrice,
      isOnSale: !!extension.registrars[0].isOnSale,
    })
  })

  extensions[category] = formattedExtensionsList
}

const extensionsCount = Object.values(extensions).reduce(
  (partialLength, category) => partialLength + category.length,
  0
)

// Let's also set the page metadata
useHead({
  title: `mono domains - all domain extensions`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `a list of all ${extensionsCount} extensions mono is tracking and their cheapest prices. find the cheapest domain prices with mono domains!`,
    },
    {
      hid: 'canonical',
      rel: 'canonical',
      href: 'https://mono.domains/extensions',
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: 'https://mono.domains/extensions',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `mono domains - all domain extensions`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: `a list of all ${extensionsCount} extensions mono is tracking and their cheapest prices. find the cheapest domain prices with mono domains!`,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://mono.domains/extensions',
    },
  ],
})
</script>

<template>
  <PageHeader />

  <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32 md:py-44">
    <h1 class="text-6xl sm:text-8xl font-bold leading-none -ml-0.5 mb-4">
      all extensions.
    </h1>
    <p class="text-l sm:text-xl leading-relaxed mb-2">
      here's a list of the
      <span class="font-semibold">{{ formatNumber(extensionsCount) }}</span>
      different domain extensions that mono is tracking with their cheapest
      prices.
    </p>

    <ExtensionsList :extensions="extensions" />
  </div>

  <PageFooter />
</template>

<script>
import { helpers } from '../../mixins/helpers'

export default {
  name: 'ExtensionsPage',
  mixins: [helpers],
}
</script>
