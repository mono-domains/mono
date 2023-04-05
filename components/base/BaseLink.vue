<template>
  <NuxtLink
    v-if="to.startsWith('/')"
    :to="to"
    class="text-sky-700 decoration-1 underline underline-offset-4 decoration-transparent hover:decoration-current transition-colors duration-300">
    <slot />
  </NuxtLink>

  <a
    v-else
    :href="to"
    target="_blank"
    rel="noopener"
    class="text-sky-700 decoration-1 underline underline-offset-4 decoration-transparent hover:decoration-current transition-colors duration-300">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    to: {
      type: String,
      default: '#'
    }
  }
}
</script>