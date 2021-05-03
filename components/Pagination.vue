<template>
  <!-- 検討中 -->
  <div class="contents-pagination">
    <paginate v-if="(getPageCount > 1)"
      :page-count="getPageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickViewPage"
      :prev-text="'＜'"
      :next-text="'＞'"
      :container-class="'pagination'"
      :page-class="'pagination-li'"
      :page-link-class="'pagination-a'">
    </paginate>
  </div>
</template>

<script>
export default {
  props: ['parentText'],
  data() {
    return {
     parPage: 2,
     currentPage: 1
    }
  },
  computed: {
    getCources() {
      let current = this.currentPage * this.parPage;
      let start = current - this.parPage;
      return this.parentText.slice(start , current);
    },
    getPageCount() {
      return Math.ceil(this.parentText.length / this.parPage);
    },
  },
  methods: {
    clickViewPage(pageNum) {
       this.currentPage = Number(pageNum);
    },
  }
}
</script>

<style>
/* ページネーション */
.pagination {
  list-style: none;
  display: flex;
  justify-content: center;
  text-align: center;

}
.pagination-li {
  margin: 0 6px;
}
.pagination-a {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #55BBBB;
}

.pagination-a:hover {
  background: #04C6C6 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #FFFFFF;
  transition:  0.3s 0s ease-in;
  cursor: pointer;
}
</style>