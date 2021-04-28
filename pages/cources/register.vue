<template>
  <div id="app">
    <ul>
      <li v-for="(item,index) in getItems" :key="index">{{item}}</li>
    </ul>
    <paginate
      :page-count="getPageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickViewPage"
      :prev-text="'＜'"
      :next-text="'＞'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
  </div>
</template>


<script>
export default {
  data() {
    return {
     items: ['1','2','3','4','5','6'],
     parPage: 2,
     currentPage: 1
    }
  },
   methods: {
    clickViewPage: function (pageNum) {
       this.currentPage = Number(pageNum);
    }
   },
   computed: {
     getItems: function() {
       let current = this.currentPage * this.parPage;
       let start = current - this.parPage;
       return this.items.slice(start, current);
     },
     getPageCount: function() {
       return Math.ceil(this.items.length / this.parPage);
     }
   }
}
</script>

<style scoped>

</style>