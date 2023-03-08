<template>
  <li
    class="w-28 mr-2 mb-2 rounded rounded bg-neutral-50 shadow-md shadow-neutral-200 hover:shadow-lg transition-shadow duration-300 text-sm leading-normal text-center">
    <a :href="registrar.registerUrl" class="block py-1">
      <p>{{ registrar.name }}</p>
      <p>${{ registrar.registerPrice }}</p>
    </a>
  </li>
</template>

<script>
export default {
  name: 'RegistrarPricingItem',
  props: {
    registrar: {
      type: Object,
      default: null
    }
  }
}
</script>