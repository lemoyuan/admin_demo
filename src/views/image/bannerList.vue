<template>
  <el-row v-loading="loading">
    <el-col :span="24">

      <el-row class="search-row">
        <el-col :span="6">
            <p class="search-rou">banner图片</p>
        </el-col>
        <el-col :span="18">
            <div class='button-div-tt' >
                <el-button type="primary"  size="small" @click="showAdd">添加</el-button>
            </div>
            <div class='button-div-tt'>
              <span @click="reGetData">重置</span>
            </div>
            <div class='input-div-tt'>
                <el-input placeholder="输入名称" size="small" v-model="name">
                    <el-button slot="append"  icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </div>
            <div class='select-div-tt'>
              <el-select size="small" v-model="area" clearable  placeholder="请选择文章类型" @change='search(area)'>
                <el-option v-for='(value,key,index) in userList' :key='index' :label="value" :value="key"></el-option>
              </el-select>
            </div>
        </el-col>
      </el-row>
      <el-table   :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="statusStr" label="显示状态"></el-table-column>
        <el-table-column prop="createTime" label="添加时间"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column prop="typeStr" label="文章类型"></el-table-column>
        <el-table-column label="置顶状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isTop === 1">置顶</span>
            <span v-if="scope.row.isTop === 0">未置顶</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown >
                <span class="el-dropdown-link">
                    <i class="el-icon-setting"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item   @click.native="lookItem(scope.row)" type="text" size="small">预览</el-dropdown-item>
                    <el-dropdown-item  @click.native="editItem(scope.row)" type="text" size="small">修改</el-dropdown-item>
                   
                </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="new_pag" style='margin-bottom: 60px;'>
          <paging :totalNumber="pageObj.total" @currentPage='getcurrentpage' :pageSize="pageObj.pageSize" :changePage1="changePage"></paging>
      </div>


      <div class="shadow2" v-show="second">
        <i @click="toNone">×</i>
        <h3>{{findList.title}}</h3>
        <p><span>时间：{{findList.createTime}}</span>来源：{{findList.source}}</p>
        <p style="text-align:left;" v-html="findList.content"></p>
        <!-- <p class="imgs"><img :src='httpUrl+findList.picUrl'/></p> -->
        <p class="down-word" @click="toNone">点击查看原文</p>
      </div>
      <div class="shdaow" v-show="zero" @click="toNone"></div>
    </el-col>

  </el-row>
</template>

<script>
import paging from "@/components/paging/paging.vue";
import api from "../../fetch/api";
import * as _ from "../../utils/tool";
import { mapState} from 'vuex'
export default {
  data() {
    return {
      zero:false,
      second:false,
      httpUrl:'',

      area: "",
      name: "",
      code:'',
      title:'',
      currentPage:1, //页码
      title:'',//标题搜索框
      source:'',//文章来源
      changePage:false,
      pageObj: {
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      tableData: [
        {
          title:'',
          isLocked:'',
          updatetime:'',//修改时间
          createTime:'',
          typeStr:'',
          isTop:'',
        }
      ],
      userList: [],
      findList:[],
      loading: false,
    };
  },
  computed:{
     ...mapState(['permissions']),
  },
  mounted() {
    // this.getCommon();
    // this.getData();

  },
  methods: {
    toNone(){
      this.zero = false;
      this.second = false;
    },
    lookItem(item){
      api.findAloneArticle({id:item.id})
        .then(res => {
          if (res.code && res.code == "200") {
            this.findList = res.data;
            var htpUrl = JSON.parse(this.$store.state.resConfig);
            this.httpUrl = htpUrl.site_resource_url;
            this.findList.createTime = _.getDate(res.data.createTime,'yyyy-MM-dd');
          } else {
            _.message("error", res.message);
            return false;
          }
        }).catch(err => {
          console.log(err, "0");
        });
      this.zero = true;
      this.second = true;
    },
    editItem(item){
       this.$router.push({path:this.dealRoute('articleAdd'),query:{id:item.id}});
    },
    switchItem(item){
      let datas = {
        id:item.id,
        isTop:item.isTop === 1 ? 0 : 1,
      };
      api.modifyAloneArticle(datas)
        .then(res => {
          if (res.code && res.code == "200") {
            this.getData();
          } else {
            _.message("error", res.message);
            return false;
          }
        }).catch(err => {
          console.log(err, "0");
        });
    },
    delItem(item){
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            api.deleteAloneArticle({id:item.id})
            .then(res => {
              if (res.code && res.code == "200") {
                this.getData();
                _.message('success',res.message);
              } else {
                _.message("error", res.message);
                return false;
              }
            })
            .catch(err => {
              console.log(err, "0");
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
    },
    showAdd(){
        this.$router.push(this.dealRoute('articleAdd'));
    },
    getCommon(){
      api.getItem({type:'article_type'}).then(res => {
          if (res.code && res.code == "200") {
            this.userList = res.data;
          } else {
            _.message("error", res.message);
            return false;
          }
        })
        .catch(err => {
          console.log(err, "0");
        });
    },
    getData() {
      var postData = {
        currentPage: this.currentPage,
        title:this.title,
        code:this.code,
      };
      api.articleList(postData)
        .then(res => {
          if (res.code && res.code == "200") {
            this.tableData = res.data.list;
            this.pageObj = res.data;
            this.changePage =false;
            this.tableData.forEach((key, index)=> {
              key.createTime = _.getDate(key.createTime,'yyyy-MM-dd');
              key.updateTime = _.getDate(key.updateTime,'yyyy-MM-dd hh:mm:ss');
            });
          } else {
            _.message("error", res.message);
            return false;
          }
        }).catch(err => {
          console.log(err, "0");
        });
    },
    reGetData(){
      this.title = "",
      this.area= "",
      this.name= "",
       this.code= "",
      this.currentPage = 1;
      this.changePage =true;
      this.getData();
    },
    //搜索列表
    search() {
      this.currentPage = 1;
      this.changePage =true;
      this.code = this.area;
      this.title = this.name;
      this.getData();
    },
    getcurrentpage(val) {
      //获取当前页码
      this.currentPage = val;
      this.getData();
    }
  },
  components: { paging }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/form.scss";
.search-row {
  padding-bottom: 8px;
  .el-input {
    width: 260px;
  }
}
.user-detail {
  letter-spacing: 3px;
  span {
    display: inline-block;
    height: 40px;
    width: 100px;
    margin-right: 10px;
    text-align: right;
  }
}
.user-locked {
  color: red;
}
.user-not-locked {
  color: green;
}
.shadow2{
  width:700px;
  padding:20px;
  background:#FFFFFF;
  border-radius:6px;
  text-align:center;
  position:fixed;
  top:22%;
  left:20%;
  z-index:11;
  font-size:16px;
  color:#333333;
  line-height:16px;
  overflow:hidden;
  i{
    font-style:normal;
    float:right;
    font-size:22px;
    cursor:pointer;
  }
  p{
    margin:30px 0;
    span{
      display: inline-block;
      margin-right: 10px;
    }
  }
  .imgs{
    width:600px;
    height:300px;
    margin-left: 50px;
  }
  .down-word{
    text-align: right;
    margin-right: 30px;
    font-size: 14px;
    color: #999999;
    cursor: pointer;
  }
}
.shdaow{
  width:100%;
  height:100%;
  background:rgba(204,204,204,.5);
  position:fixed;
  top:0;
  left:0;
  z-index:10;
}
</style>


