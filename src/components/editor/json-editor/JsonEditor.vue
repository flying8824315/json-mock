<template>
  <div>
    <ObjectEditor :data="data"></ObjectEditor>
  </div>
</template>
<script>
import ObjectEditor from './ObjectEditor';

export default {
  name: 'JsonEditor0',
  components: {ObjectEditor},
  props: {
    data: {
      type: [Object, Array],
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      dataTypes: [
        {name: ''},
      ],
      value: 'aaa',
    };
  },
  methods: {
    getKey(value) {
    },
  },
};
</script>

<style scoped>
.json-type-label {
  color: gray;
}
</style>