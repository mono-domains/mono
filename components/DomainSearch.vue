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
  computed: {
    sanitizedSearchTerm() {
      let searchTerm = this.searchTerm.toLowerCase()

      searchTerm = searchTerm.replace(/^[a-z]*(?:\:\/\/)/, '')
      searchTerm = searchTerm.replace(/[^a-zA-Z0-9\-.]/g, '')

      return searchTerm
    }
  },
  methods: {
    onSearchInput(input) {
      this.searchTerm = input

      this.debounce(this.getSearchResults, 750)
    },
    async getSearchResults() {
      if (this.sanitizedSearchTerm === '') {
        return
      }

      const searchTerm = punycode.toASCII(this.sanitizedSearchTerm)

      try {
        const searchResponse = await this.getSearchResultsFromApi(searchTerm)
        const searchResults = searchResponse.results

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