<template>
  <DomainSearchInput @onInput="onSearchInput" />
  <DomainSearchResults :results="searchResults.results" />
</template>

<script>
import { debounce } from '~/mixins/debounce'

export default {
  name: 'DomainSearch',
  setup() {
    const { getSearchResultsFromApi } = useMonoApi()

    return { getSearchResultsFromApi }
  },
  mixins: [debounce],
  data() {
    return {
      searchTerm: '',
      searchResults: {}
    }
  },
  methods: {
    onSearchInput(input) {
      this.searchTerm = input

      this.debounce(this.getSearchResults, 1000)
    },
    async getSearchResults() {
      // Don't search for things less than 3 characters
      if (this.searchTerm.length < 3) {
        return
      }

      try {
        this.searchResults = await this.getSearchResultsFromApi(this.searchTerm)
      } catch (e) {
        // Error reporting, improve this later
        alert(e.message)
      }
    }
  }
}
</script>