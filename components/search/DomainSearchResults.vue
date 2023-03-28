<template>
  <ul v-if="results" class="mt-6 sm:mt-8" v-auto-animate>
    <DomainSearchResultsItem
      v-for="(result) of results"
      :key="result.domain + result.extension.extension"
      :result="result" />
  </ul>
</template>

<script>
export default {
  name: 'DomainSearchResults',
  props: {
    results: {
      type: Array,
      default: null
    }
  }
}
</script>