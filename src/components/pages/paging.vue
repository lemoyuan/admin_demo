<template>

     <div >
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1
    };
  },
  watch: {
      changePage1(curVal,oldVal){
　　　　　　　　　　console.log(curVal,oldVal,"changePage");
                    if(curVal){
                        this.currentPage = 1;
                    }
　　　　　　　　}
  },
  props: {
      pageSize:"",
      total:"",
      changePage1:"",
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    handleSizeChange(val) {
        this.$emit("sizeChange",val);

    },
    changePage(){
        this.currentPage = 1;
    },
    handleCurrentChange(val) {
      
       this.$emit("currentChange",val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>