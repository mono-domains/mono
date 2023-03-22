<template>
  <NuxtLink v-if="to.startsWith('/')" :to="to" class="text-sky-600">
    <slot />
  </NuxtLink>

  <a v-else :href="to" target="_blank" rel="noopener" class="text-sky-600">
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