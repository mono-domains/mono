<template>
  <span class="group inline-block relative" tabindex="0">
    <span class="baseInfoTooltip__label" :aria-describedby="ariaId"><slot name="label" /></span>

    <span
      role="tooltip"
      :id="ariaId"
      class="hidden sm:block absolute -top-1.5 left-1/2 -translate-x-1/2 -translate-y-full w-max max-w-xs text-xs font-semibold text-center bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
      <slot name="tooltip" />
      <span class="absolute bottom-px left-1/2 -translate-x-1/2 translate-y-full border-black border-4 border-l-transparent border-r-transparent border-b-transparent" />
    </span>
  </span>
</template>

<script>
export default {
  name: 'BaseInfoTooltip',
  props: {
    ariaId: {
      type: String,
      default: ''
    }
  }
}
</script>