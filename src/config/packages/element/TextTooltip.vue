<template>
  <ElTooltip
    v-if="$slots.default||text"
    :popperClass="popperClass"
    :content="getContent()"
    :disabled="placement!==false"
    :placement="placementVal">
    <span
      class="view-text-container"
      :style="dynamicStyle"
      :class="dynamicClass">
      <slot>{{text}}</slot>
    </span>
  </ElTooltip>
</template>

<script>
  export default {
    name: 'TextTooltip',
    props: {
      inline: Boolean,
      text: String,
      lineCount: {
        type: Number,
        default: 0,
      },
      placement: {
        type: [String, Boolean],
        default: false,
      },
      popperClass: {
        type: String,
        default: 'im-text-content-popper',
      },
    },
    computed: {
      dynamicClass: ({inline}) => inline ? 'display-inline' : 'display-block',
      dynamicStyle: ({lineCount: count}) => {
        if (count === 1) {
          return {
            'text-overflow': `ellipsis`,
            'white-space': `nowrap`,
            'overflow': `hidden`,
          };
        } else if (count > 1) {
          return {
            'display': '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': `${count}`,
            'word-break': `break-all`,
            'overflow': `hidden`,
          };
        }
      },
      placementVal: ({placement: val}) => {
        if (val !== false) {
          return val;
        }
      },
    },
    methods: {
      getContent() {
        const {default: dft, text} = this.$slots;
        return dft ? dft.map(({text}) => text || '').join('') : text;
      },
    },
  };
</script>

<style scoped>
  .view-text-container {
    font-size: 14px;
  }
</style>
<style>
  .im-text-content-popper {
    max-width: 350px;
  }
</style>