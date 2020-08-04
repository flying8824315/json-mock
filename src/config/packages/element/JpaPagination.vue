<template>
  <ElPagination
    @current-change="onPageChange"
    @size-change="onSizeChange"
    @prev-click="onPrev"
    @next-click="onNext"
    :small="small"
    :layout="layout"
    :background="background"
    :paperCount="paperCount"
    :pageSizes="pageSizes"
    :pageSize="paging.size"
    :currentPage="paging.number+pageOffset"
    :total="paging.totalElements"
  />
</template>

<script>

  function defaultPaging() {
    return {
      empty: false,
      first: true,
      last: true,
      number: 0,
      numberOfElements: 6,
      size: 15,
      totalElements: 6,
      totalPages: 1,
    };
  }

  export const JpaPagination = {
    name: 'JpaPagination',
    props: {
      paging: {
        type: Object,
        default: defaultPaging,
      },
      layout: {type: String, default: 'sizes,prev,pager,next'},
      pageSizes: {
        type: Array,
        default: () => [5, 10, 15, 20, 30, 50],
      },
      paperCount: {
        type: Number,
        default: 5,
      },
      background: {
        type: Boolean,
        default: true,
      },
      small: Boolean,
      pageProp: {
        type: String,
        default: 'page',
      },
      sizeProp: {
        type: String,
        default: 'size',
      },
      pageStart: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      offset({paging}) {
        return this.getOffset(paging);
      },
      pageOffset({pageStart}) {
        return 1 - pageStart;
      },
    },
    methods: {
      getOffset(paging) {
        const {pageProp, sizeProp} = this;
        const {
          offset, number = 0,
          [pageProp]: page = number,
          [sizeProp]: size,
        } = paging || {};
        return offset === undefined ? ((page * size) || 0) : 0;
      },
      onPageChange(page) {
        const {paging, sizeProp, pageOffset} = this;
        this.doChangePage({page: page - pageOffset, size: paging[sizeProp]});
      },
      onSizeChange(size) {
        const {offset, doChangePage} = this;
        doChangePage({page: parseInt(`${offset / size}`), size});
      },
      onNext() {
        // console.log(page);
      },
      onPrev() {
        // console.log(page);
      },
      doChangePage(pagingArg) {
        const {paging, pageProp, sizeProp} = this;
        const {page = 0, size = 15} = pagingArg;
        const {
          number = 0,
          [pageProp]: pageNum = number,
          [sizeProp]: pageSize,
        } = paging;
        if (!(page === pageNum && pageSize === size)) {
          paging.number = page;
          paging[pageProp] = page;
          paging[sizeProp] = size;
          this.$emit('changePage', {[pageProp]: page, [sizeProp]: size});
        }
      },
    },
  };

  export default JpaPagination;
</script>
<style scoped>

</style>