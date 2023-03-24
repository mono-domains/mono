<template>
  <div class="w-full max-w-5xl mx-auto px-6 py-44">
    <h1 class="text-8xl font-bold leading-none -ml-0.5 mb-4">{{ extension }}</h1>
    <p class="text-xl leading-relaxed mb-12">
      the <span class="font-semibold">{{ extension }} {{ extension !== rawExtension ? `(${rawExtension})` : '' }}</span>
      extension is available from
      <span class="font-semibold">{{ registrars.length }}</span> {{ registrars.length > 1 ? 'registrars' : 'registrar' }},
      starting from
      <span class="font-semibold">${{ formatNumber(registrars[0].registerPrice) }}</span>.
    </p>

    <RegistrarPricing :registrars="registrars" />
  </div>

  <PageFooter />
</template>

<script>
import punycode from 'punycode'

import { helpers } from '../../mixins/helpers'

export default {
  name: 'ExtensionPage',
  mixins: [helpers],
  async setup() {
    const { getExtensionPricingResultFromApi } = useMonoApi()

    const route = useRoute()
    const extension = route.params.extension

    const extensionPricing = await getExtensionPricingResultFromApi(extension)

    return {
      extension: punycode.toUnicode(extension),
      rawExtension: extension,
      registrars: extensionPricing.registrars
    }
  }
}
</script>