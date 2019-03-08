<template>
  <el-row>
    <el-col :span="24">
        <el-pagination
        background     
        @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
        </el-pagination>     
    </el-col>
    </el-row>  
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    };
  },
  watch: {
    changePage1(curVal, oldVal) {
      if (curVal) {
        // console.log(curVal, oldVal,'this.currentPage');
        this.currentPage = 1;
      }
    }
  },
  props: {
    totalNumber: "", //总条数
    pageSize: "",
    changePage1: ""
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.$emit("currentPage", `${val}`);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      window.scrollTo(0, 0);
    });
  }
};
</script>

