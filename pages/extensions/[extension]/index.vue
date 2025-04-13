<script setup>
const { getExtensionPricingResultFromApi } = useMonoApi()

const route = useRoute()
const extension = '.' + route.params.extension
const encodedExtension = punycode.toUnicode(extension)

const extensionPricing = await getExtensionPricingResultFromApi(extension)
const registrars = extensionPricing.registrars

// Let's set the page metadata
useHead({
  title: `mono domains - cheapest ${extension} domain prices`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `starting from $${registrars[0].registerPrice.toFixed(
        2
      )} - a list of all registrars supporting ${encodedExtension} and their cheapest prices. find the cheapest domain prices with mono domains!`,
    },
    {
      hid: 'canonical',
      rel: 'canonical',
      href: `https://mono.domains/extensions/${extension}`,
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: `https://mono.domains/extensions/${extension}`,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `mono domains - cheapest ${extension} domain prices`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: `starting from $${registrars[0].registerPrice.toFixed(
        2
      )} - a list of all registrars supporting ${encodedExtension} and their cheapest prices. find the cheapest domain prices with mono domains!`,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `https://mono.domains/extensions/${extension}`,
    },
  ],
})
</script>

<template>
  <PageHeader />

  <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32 md:py-44">
    <h1 class="text-6xl sm:text-8xl font-bold leading-none -ml-0.5 mb-4">
      <span :dir="getTextDirection(encodedExtension)">{{
        encodedExtension
      }}</span>
    </h1>
    <p class="text-l sm:text-xl leading-relaxed mb-10 sm:mb-12">
      the
      <span class="font-semibold" :dir="getTextDirection(encodedExtension)"
        >{{ encodedExtension }}
        {{ encodedExtension !== extension ? `(${extension})` : '' }}</span
      >
      extension is available from
      <span class="font-semibold">{{ registrars.length }}</span>
      {{ registrars.length > 1 ? 'registrars' : 'registrar' }}, starting from
      <span class="font-semibold"
        >${{ formatNumber(registrars[0].registerPrice) }}</span
      >.
    </p>

    <RegistrarPricing :extension="encodedExtension" :registrars="registrars" />

    <p class="text-l sm:text-xl text-center mt-16 sm:mt-24">
      <BaseLink to="/extensions">back to extensions list</BaseLink>
    </p>
  </div>

  <PageFooter />
</template>

<script>
import punycode from 'punycode/'

import { helpers } from '../../../mixins/helpers'

export default {
  name: 'ExtensionPage',
  mixins: [helpers],
}
</script>
