<template>
  <li
    class="relative mr-3 mb-3 rounded bg-neutral-50 shadow-md shadow-neutral-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 leading-normal text-center"
    :class="sizeClasses"
  >
    <BaseTooltip
      :ariaId="tooltipAriaId"
      class="flex justify-center w-full h-full"
    >
      <template #label>
        <NuxtLink
          v-if="isExtension"
          :to="`/extensions/${pricing.extension.substring(1)}/`"
          class="block w-full"
          :class="isLarge ? 'py-1.5' : 'py-1'"
          :noPrefetch="prefetch === false ? true : null"
        >
          <p
            class="font-semibold tracking-wide"
            :dir="getTextDirection(decodedExtension)"
          >
            {{ decodedExtension }}
          </p>
          <p class="tracking-wide">
            from ${{ formatNumber(pricing.registerPrice) }}
          </p>
        </NuxtLink>

        <a
          v-else
          :href="pricing.registerUrl"
          class="block w-full"
          :class="isLarge ? 'py-1.5' : 'py-1'"
          target="_blank"
          rel="noopener"
        >
          <p class="font-semibold tracking-wide">{{ pricing.registrar }}</p>
          <p class="tracking-wide">
            ${{ formatNumber(pricing.registerPrice) }}
          </p>
        </a>

        <div
          v-if="pricing.isOnSale"
          class="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
        >
          <span
            class="flex justify-center items-center leading-3 bg-red-500 font-semibold text-white rounded-full -rotate-6 cursor-default"
            :class="saleRibbonSizeClasses"
          >
            %
          </span>
        </div>
      </template>

      <template #tooltip>
        <div class="text-left font-light">
          <p
            class="mb-2 font-semibold"
            :dir="getTextDirection(decodedExtension)"
          >
            <span>{{ decodedExtension }}</span> - {{ pricing.registrar }}
          </p>
          <table>
            <tr>
              <td>
                <p class="mr-4">registration price:</p>
              </td>
              <td>
                <p class="font-semibold">
                  ${{ formatNumber(pricing.registerPrice) }}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="mr-4">renewal price:</p>
              </td>
              <td>
                <p class="font-semibold">
                  ${{ formatNumber(pricing.renewalPrice) }}
                </p>
              </td>
            </tr>
          </table>

          <p v-if="pricing.isOnSale" class="mt-2">this extension is on sale!</p>
        </div>
      </template>
    </BaseTooltip>
  </li>
</template>

<script>
import punycode from 'punycode/'
import { helpers } from '../mixins/helpers'

export default {
  name: 'ItemPricing',
  mixins: [helpers],
  props: {
    pricing: {
      type: Object,
      default: null,
    },
    isExtension: {
      type: Boolean,
      default: false,
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
    prefetch: {
      type: Boolean,
      default: true,
    },
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
    decodedExtension() {
      return punycode.toUnicode(this.pricing.extension)
    },
    tooltipAriaId() {
      const pricingName = this.isExtension
        ? this.pricing.extension.toLowerCase()
        : this.pricing.registrar.toLowerCase()
      const cleanedPricingName = pricingName.replace(/[^a-z0-9]/g, '')

      return cleanedPricingName + this.getRandomId()
    },
  },
}
</script>
