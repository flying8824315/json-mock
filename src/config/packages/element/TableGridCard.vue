<template>
  <ElCard>
    <div slot="header" class="im-table-grid-header">
      <div>
        <slot name="title">{{title}}</slot>
      </div>
      <div>
        <slot name="control"/>
        <ElSelect
          v-if="columnsList!==false"
          class="width-80"
          v-model="count"
          placeholder="请选择">
          <ElOption
            v-for="val in _colsList"
            :key="val"
            :label="val"
            :value="val">
              <span class="im-doc-option">
                {{val}}
              </span>
          </ElOption>
        </ElSelect>
      </div>
    </div>
    <div>
      <ElRow
        v-for="(group, idx) in groupedList"
        :key="idx" :gutter="gutter">
        <ElCol
          v-for="(item,index) in group"
          :key="index"
          :span="columnsSize">
          <slot
            :index="getIndex(idx,index)"
            :row="idx" :col="index"
            :data="item"/>
        </ElCol>
      </ElRow>
    </div>
  </ElCard>
</template>
<script>
  import {TableGridMixin} from './mixins';

  export default {
    name: 'TableGridCard',
    mixins: [TableGridMixin],
    props: {
      title: String,
      indexed: Boolean,
      columnsList: {
        type: [Boolean, Array],
        default: true,
      },
      storageCountId: String,
      /*
      data: {
        type: Array,
        default: () => [],
      },
      gutter: {
        type: Number,
        default: 16,
      },
      columnsCount: {
        type: Number,
        default: defaultCount,
      },
       */
    },
    data() {
      return {
        count: this.columnsCount,
      };
    },
    localWatch: {
      count: {
        key: ({storageCountId: id}) =>
          (id ? `count[${id}]` : null),
        default: 4,
      },
    },
    computed: {
      _colsList({columnsList: list}) {
        return Array.isArray(list) ? list : [1, 2, 3, 4, 6, 8];
      },
      columnsSize({count}) {return 24 / count;},
      groupedList({data: list, count: count}) {
        const grouped = [], len = list.length;
        for (let i = 0; i < len; i += count) {
          grouped.push(list.slice(i, i + count));
        }
        return grouped;
      },
    },
  };
</script>
<style scoped lang="scss">
  .im-table-grid-header {
    display: flex;
    justify-content: space-between;
  }
</style>