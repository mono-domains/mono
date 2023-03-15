<template>
  <li class="py-2">
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

    <div v-if="isExpanded" class="pt-4 ml-4 mb-8">
      <div class="mb-8">
        <!-- Checking Whois -->
        <template v-if="whoisSearchStatus === 'pending'">
          <p class="text-xl tracking-wide">we're checking this domain's availability...</p>
        </template>

        <!-- Domain is taken -->
        <template v-else-if="isDomainAvailable === false">
          <p class="text-xl tracking-wide mb-4">
            this domain is taken 😔
            <!-- <a
              href="#"
              class="ml-2 text-sky-600"
              @click.prevent="toggleIsWhoisVisible">
              {{ isWhoisVisible ? 'hide' : 'show' }} whois
            </a> -->
          </p>
          <pre
            class="max-w-3xl max-h-60 mb-8 rounded bg-neutral-50 px-8 py-6 text-sm shadow-md shadow-neutral-200 overflow-auto whitespace-pre-line">{{ whoisInfo }}</pre>
        </template>

        <!-- Domain is available/unknown -->
        <template v-else>
          <p v-if="domainAvailability === '???'" class="text-xl tracking-wide mb-4">this domain might be available! 🙏</p>
          <p v-else class="text-xl tracking-wide">this domain is available! 🎉</p>
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
      const domain = this.result.domain + this.result.extension.extension
      const punycodedDomain = punycode.toASCII(domain)

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