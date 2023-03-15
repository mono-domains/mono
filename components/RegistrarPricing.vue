<template>
  <ul class="flex flex-wrap -mb-3">
    <h3 class="w-full font-semibold tracking-wide text-2xl mb-4">cheapest registrar</h3>
    <RegistrarPricingItem
      :isLarge="true"
      :registrar="cheapestRegistrar"
      class="mb-8" />

    <h3 class="w-full font-semibold tracking-wide text-xl mb-4">other registrars</h3>
    <RegistrarPricingItem
      v-for="(registrar, key) in otherRegistrars" :key="registrar + key"
      :registrar="registrar" />
  </ul>
</template>

<script>
export default {
  name: 'RegistrarPricing',
  props: {
    registrars: {
      type: Array,
      default: null
    }
  },
  computed: {
    cheapestRegistrar() {
      return this.registrars[0]
    },
    otherRegistrars() {
      return this.registrars.slice(1)
    }
  }
}
</script>