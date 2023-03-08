<template>
  <ul class="flex -mb-2">
    <RegistrarPricingItem
      v-for="(registrar, key) in registrars" :key="registrar + key"
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
  }
}
</script>