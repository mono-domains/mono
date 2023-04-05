<template>
  <li
    class="relative flex items-center mr-3 mb-3 rounded rounded bg-neutral-50 shadow-md shadow-neutral-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 leading-normal text-center"
    :class="sizeClasses">
    <NuxtLink
      v-if="isExtension"
      :to="`/extensions/${pricing.name}`"
      class="block w-full"
      :class="isLarge ? 'py-1.5' : 'py-1'"
      :noPrefetch="prefetch === false ? true : null">
      <p class="font-semibold tracking-wide">{{ decodedName }}</p>
      <p class="tracking-wide">{{ isExtension ? 'from ' : '' }}${{ formatNumber(pricing.registerPrice) }}</p>
    </NuxtLink>

    <a v-else :href="pricing.registerUrl" class="block w-full" :class="isLarge ? 'py-1.5' : 'py-1'" target="_blank" rel="noopener">
      <p class="font-semibold tracking-wide">{{ pricing.name }}</p>
      <p class="tracking-wide">${{ formatNumber(pricing.registerPrice) }}</p>
    </a>

    <div
      v-if="pricing.isOnSale"
      class="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
      <BaseTooltip ariaLabel="isOnSale" class="translate-y-px">
        <template #label>
          <span
            class="flex justify-center items-center leading-3 bg-red-500 font-semibold text-white rounded-full -rotate-6"
            :class="saleRibbonSizeClasses">
            %
          </span>
        </template>
        <template #tooltip>
          this extension is on sale!
        </template>
      </BaseTooltip>
      
    </div>
  </li>
</template>

<script>
import punycode from 'punycode'

import { helpers } from '../mixins/helpers'

export default {
  name: 'ItemPricing',
  mixins: [helpers],
  props: {
    pricing: {
      type: Object,
      default: null
    },
    isExtension: {
      type: Boolean,
      default: false
    },
    isLarge: {
      type: Boolean,
      default: false
    },
    prefetch: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sizeClasses() {
      if (this.isLarge) {
        return 'w-32 text-base'
      }

      return 'w-28 text-sm'
    },
    saleRibbonSizeClasses() {
      if (this.isLarge) {
        return 'w-5.25 sm:w-6 h-5.25 sm:h-6 text-xs sm:text-sm'
      }

      return 'w-5.25 h-5.25 text-xs'
    },
    decodedName() {
      return punycode.toUnicode(this.pricing.name)
    }
  }
}
</script>