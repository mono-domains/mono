<template>
  <DomainSearchInput ref="searchInput" @onInput="onSearchInput" />

  <div v-auto-animate>
    <p
      v-if="exampleSearch && searchResults.length === 0"
      class="mt-6 sm:mt-8 text-xl sm:text-2xl transition-opacity duration-300"
    >
      {{ examplePrefix }} try '<a
        href="#"
        class="text-sky-700 decoration-1 underline underline-offset-4 decoration-transparent hover:decoration-current transition-colors duration-300"
        @click.prevent="doSearch(exampleSearch)"
        >{{ exampleSearch }}</a
      >'
    </p>

    <DomainSearchResults
      v-if="searchResults.length > 0"
      :results="searchResults"
    />
  </div>
</template>

<script>
import punycode from 'punycode/'
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
      searchResults: [],
      examplePrefix: '',
      exampleSearch: '',
    }
  },
  computed: {
    sanitizedSearchTerm() {
      let searchTerm = this.searchTerm.toLowerCase()

      searchTerm = searchTerm.replace(/^[a-z]*(?:\:\/\/)/, '')

      return searchTerm
    },
  },
  mounted() {
    setTimeout(this.setExampleSearch, 1000)
  },
  methods: {
    onSearchInput(input) {
      this.searchTerm = input

      // If the user clears the search box, remove any results
      if (this.searchTerm === '') {
        this.searchResults = []
        return
      }

      // Otherwise, get the results for the user's search terms
      this.debounce(this.getSearchResults, 750)
    },
    async getSearchResults() {
      if (this.sanitizedSearchTerm === '') {
        return
      }

      let searchTerm = punycode.toASCII(this.sanitizedSearchTerm)

      searchTerm = searchTerm.replace(/[^a-zA-Z0-9\-.]/g, '')

      try {
        const searchResponse = await this.getSearchResultsFromApi(searchTerm)
        const searchResults = searchResponse.results

        const formattedSearchResults = searchResults.map(result => {
          return {
            extension: this.getDecodedExtension(result.extension),
            domain: punycode.toUnicode(result.domain),
            subdomains: punycode.toUnicode(result.subdomains),
          }
        })

        this.searchResults = formattedSearchResults
      } catch (e) {
        // Error reporting, improve this later
        // alert(e.message)
      }
    },
    setExampleSearch() {
      const prefixes = ['unsure?', 'maybe', 'why not']
      const firstWords = ['awesome', 'cheap', 'cool', 'exotic', 'interesting']
      const secondWords = ['cars', 'domains', 'website', 'gifts', 'holiday']

      this.examplePrefix = this.getRandomItem(prefixes)
      this.exampleSearch = `${this.getRandomItem(
        firstWords
      )} ${this.getRandomItem(secondWords)}`
    },
    getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)]
    },
    async doSearch(search) {
      this.$refs.searchInput.input = search
      this.searchTerm = search
      await this.getSearchResults()

      setTimeout(this.setExampleSearch, 750)
    },
    getDecodedExtension(extension) {
      extension.extension = punycode.toUnicode(extension.extension)

      return extension
    },
  },
}
</script>
