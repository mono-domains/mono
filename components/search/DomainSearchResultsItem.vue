<template>
  <li class="py-2" v-auto-animate>
    <button
      class="w-full text-left flex transition-opacity duration-300 text-2xl tracking-wide"
      :class="{
        'opacity-50': isDomainAvailable === false
      }"
      @click="toggleIsExpanded">
      <h2 class="flex-1 font-semibold tracking-wide">
        <span v-if="result.subdomains" class="text-neutral-300">{{ result.subdomains }}</span>
        <span>{{ result.domain }}</span>
        <span class="text-neutral-700">{{ result.extension.extension }}</span>
      </h2>
      
      <span :class="{
        'text-amber-500': domainAvailability === '???',
        'text-red-500': domainAvailability === 'no',
        'text-green-500': domainAvailability === 'yes'
      }">
        {{ domainAvailability }}
      </span>
    </button>

    <div v-if="isExpanded" class="mt-6 mb-8 pl-4" v-auto-animate>
      <div class="mb-8">
        <!-- Checking Whois -->
        <template v-if="whoisSearchStatus === 'pending'">
          <p class="text-xl tracking-wide">we're checking this domain's availability...</p>
        </template>

        <!-- Domain is taken -->
        <template v-else-if="isDomainAvailable === false">
          <p class="text-5xl font-semibold mb-3">sorry! 😔</p>
          <p class="text-xl tracking-wide mb-8">{{ domain }} is taken</p>
          <pre
            class="max-w-3xl max-h-60 mb-8 rounded bg-neutral-50 px-8 py-6 text-sm shadow-md shadow-neutral-200 overflow-auto whitespace-pre-line">{{ whoisInfo }}</pre>
        </template>

        <!-- Domain is unknown -->
        <template v-else-if="domainAvailability === '???'">
          <p class="text-5xl font-semibold mb-3">hmm.. 🤔</p>
          <p class="text-xl tracking-wide">{{ domain }} might be available</p>
        </template>

        <!-- Domain is available -->
        <template v-else>
          <p class="text-5xl font-semibold mb-3">yay! 🎉</p>
          <p class="text-xl tracking-wide">{{ domain }} is available!</p>
        </template>
      </div>

      <RegistrarPricing v-if="isDomainAvailable !== false" :registrars="result.extension.registrars" />
    </div>
  </li>
</template>

<script>
import punycode from 'punycode'

export default {
  name: 'DomainSearchResultsItem',
  setup() {
    const { getWhoisResultFromApi } = useMonoApi()

    return { getWhoisResultFromApi }
  },
  props: {
    result: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isExpanded: false,
      whoisSearchStatus: 'pending',
      isDomainAvailable: null,
      whoisInfo: null,
      isWhoisVisible: false
    }
  },
  computed: {
    domain() {
      return this.result.domain + this.result.extension.extension
    },
    domainAvailability() {
      if (this.whoisSearchStatus === 'pending') {
        return '...'
      }

      if (this.whoisSearchStatus === 'error') {
        return '???'
      }

      return this.isDomainAvailable ? 'yes' : 'no'
    }
  },
  mounted() {
    this.setDomainAvailabilityInfo()
  },
  methods: {
    async setDomainAvailabilityInfo() {
      const punycodedDomain = punycode.toASCII(this.domain)

      try {
        const { success, isDomainAvailable, whoisInfo, error } = await this.getWhoisResultFromApi(punycodedDomain)

        if (!success) {
          this.whoisSearchStatus = 'error'

          return
        }

        this.whoisSearchStatus = 'success'
        this.isDomainAvailable = isDomainAvailable,
        this.whoisInfo = whoisInfo.trim()
      } catch (e) {
        this.whoisSearchStatus = 'error'

        alert(e)
      }
    },
    toggleIsExpanded() {
      this.isExpanded = !this.isExpanded
    },
    toggleIsWhoisVisible() {
      this.isWhoisVisible = !this.isWhoisVisible
    }
  }
}
</script>