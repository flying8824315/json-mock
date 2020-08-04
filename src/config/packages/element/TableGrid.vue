<template>
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
</template>

<script>
  import {TableGridMixin} from './mixins';

  export const TableGrid = {
    name: 'TableGrid',
    mixins: [TableGridMixin],
    computed: {
      columnsSize({columnsCount: count}) {
        return 24 / count;
      },
      groupedList({data: list, columnsCount: count}) {
        const grouped = [], len = list.length;
        for (let i = 0; i < len; i += count) {
          grouped.push(list.slice(i, i + count));
        }
        return grouped;
      },
    },
    created() {
      // console.log('=============', this);
    },
  };

  export default TableGrid;
</script>
<style scoped>

</style>