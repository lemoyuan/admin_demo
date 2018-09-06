<template>
  <div class='header-div'>
   aaaaaaaaaaaaaaaaaa
   aaaaaaaaaaaaaaa
   <br>
    <button @click=goPage>分页返回第一页</button>
     <div class="block">
         <paging :pageSize="10" :total="100" @currentChange="currentChange" :changePage1="changePage"></paging>
        </div>
  </div>
</template>
<script>
import paging from './paging.vue'
export default {
  data() {
    return {
     
      currentPage: 5,
      changePage:false,
    };
  },
  watch: {
    $route: function(to, form) {
      //this.getAdminData();
    },
    adminInfo: function(newValue) {}
  },
  props: {
    meuId: ""
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
      goPage(){
          this.currentPage = 1;
          this.changePage = !this.changePage;
      },
       currentChange(val){
           console.log(val,this.currentPage);
       },
  },
  components:{
      paging
  }
};
</script>
<style lang="scss" scoped>
</style>