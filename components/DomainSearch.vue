<template>
  <DomainSearchInput @onInput="onSearchInput" />
  <DomainSearchResults :results="searchResults" />
</template>

<script>
import punycode from 'punycode'
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
      searchResults: []
    }
  },
  methods: {
    onSearchInput(input) {
      this.searchTerm = input

      this.debounce(this.getSearchResults, 750)
    },
    async getSearchResults() {
      const searchTerm = punycode.toASCII(this.searchTerm)

      try {
        const searchResponse = await this.getSearchResultsFromApi(searchTerm)
        const searchResults = JSON.parse(JSON.stringify(searchResponse.results))

        const formattedSearchResults = searchResults.map((result) => {
          return {
            extension: result.extension,
            domain: punycode.toUnicode(result.domain),
            subdomains: result.subdomains
          }
        })

        this.searchResults = formattedSearchResults
      } catch (e) {
        // Error reporting, improve this later
        alert(e.message)
      }
    }
  }
}
</script>