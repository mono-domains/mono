<template>
  <li class="py-2" v-auto-animate>
    <button
      class="w-full text-left flex transition-opacity duration-300 text-xl sm:text-2xl tracking-wide"
      :class="{
        'opacity-50': isDomainAvailable === false,
      }"
      @click="toggleIsExpanded"
    >
      <h2 class="flex-1 font-semibold tracking-wide">
        <span v-if="result.subdomains" class="text-neutral-400">{{
          result.subdomains
        }}</span>
        <span class="break-all">{{ result.domain }}</span>
        <span :class="isExtension ? '' : 'text-neutral-700'">{{
          result.extension.extension
        }}</span>
      </h2>

      <span
        v-if="!isExtension"
        :class="{
          'text-amber-500': domainAvailability === '???',
          'text-red-500': domainAvailability === 'no',
          'text-green-500': domainAvailability === 'yes',
        }"
      >
        {{ domainAvailability }}
      </span>
    </button>

    <div v-if="isExpanded" class="mt-6 mb-8 sm:pl-4" v-auto-animate>
      <div class="mb-6 sm:mb-8">
        <template v-if="isExtension">
          <p class="text-4xl sm:text-5xl font-semibold mb-3">
            {{ result.extension.extension }}
          </p>
          <p class="text-l sm:text-xl tracking-wide">
            {{ result.extension.extension }} is a domain extension
          </p>
        </template>

        <!-- Checking Whois -->
        <template v-else-if="whoisSearchStatus === 'pending'">
          <p class="text-4xl sm:text-5xl font-semibold mb-3">one sec.. ⚙️</p>
          <p class="text-l sm:text-xl tracking-wide">
            we're checking this domain's availability
          </p>
        </template>

        <!-- Domain is taken -->
        <template v-else-if="isDomainAvailable === false">
          <p class="text-4xl sm:text-5xl font-semibold mb-3">sorry! 😔</p>
          <p class="text-l sm:text-xl tracking-wide mb-3 sm:mb-8">
            {{ domain }} is taken
          </p>

          <BaseLink :to="`https://${domain}`">visit site</BaseLink>
          -
          <BaseLink :to="`https://who.is/whois/${domain}`">whois</BaseLink>
        </template>

        <!-- Domain is unknown -->
        <template v-else-if="domainAvailability === '???'">
          <p class="text-4xl sm:text-5xl font-semibold mb-3">hmm.. 🤔</p>
          <p class="text-l sm:text-xl tracking-wide">
            {{ domain }} might be available
            <BaseTooltip
              :ariaId="maybeAvailableAriaId"
              class="hidden sm:inline-block ml-0.5 translate-y-px"
            >
              <template #label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-4 h-4"
                >
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"
                  />
                </svg>
              </template>
              <template #tooltip
                >we couldn't determine whether {{ domain }} is available at this
                time, please check with the registrars below</template
              >
            </BaseTooltip>
          </p>
        </template>

        <!-- Domain is available -->
        <template v-else>
          <p class="text-4xl sm:text-5xl font-semibold mb-3">yay! 🎉</p>
          <p class="text-l sm:text-xl tracking-wide">
            {{ domain }} is available!
          </p>
        </template>
      </div>

      <RegistrarPricing
        v-if="isDomainAvailable !== false"
        :registrars="result.extension.registrars"
      />
    </div>
  </li>
</template>

<script>
import punycode from 'punycode/'

export default {
  name: 'DomainSearchResultsItem',
  setup() {
    const { getWhoisResultFromApi } = useMonoApi()

    return { getWhoisResultFromApi }
  },
  props: {
    result: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isExpanded: false,
      whoisSearchStatus: 'pending',
      isDomainAvailable: null,
      whoisInfo: null,
      isWhoisVisible: false,
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
    },
    maybeAvailableAriaId() {
      const cleanedDomain = this.domain.replace(/[^a-z0-9]/g, '')

      return `${cleanedDomain}MaybeAvailable`
    },
    isExtension() {
      return this.result.domain === ''
    },
  },
  mounted() {
    this.setDomainAvailabilityInfo()
  },
  methods: {
    async setDomainAvailabilityInfo() {
      // This is just an extension, no need to do a whois search
      if (this.isExtension) {
        return
      }

      const punycodedDomain = punycode.toASCII(this.domain)

      try {
        const { success, isDomainAvailable, error } =
          await this.getWhoisResultFromApi(punycodedDomain)

        if (!success) {
          this.whoisSearchStatus = 'error'

          return
        }

        this.whoisSearchStatus = 'success'
        this.isDomainAvailable = isDomainAvailable
      } catch (e) {
        this.whoisSearchStatus = 'error'

        // alert(e)
      }
    },
    toggleIsExpanded() {
      this.isExpanded = !this.isExpanded
    },
    toggleIsWhoisVisible() {
      this.isWhoisVisible = !this.isWhoisVisible
    },
  },
}
</script>
