<template>

  <div class="sider1">
     <el-menu
      :default-active="actMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :unique-opened = true
      background-color="#2E314E"
      text-color="#fff"
      active-text-color='red'
      
      >

      <el-submenu index="image">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>图片管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="bannerList">banner图片</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="tags">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>标签与分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="centerService">核心服务标签</el-menu-item>
          <el-menu-item index="menuManage">菜单管理</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="media">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>媒体管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="acticleList">文章列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="video">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>流媒体管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="videoList">视频列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
     
    </el-menu>
  </div>
   
</template>

<script>
import * as _ from "../../utils/tool";
export default {
  name: "sidebar",
  props: ["isCollapse", "menuLists"],
  data() {
    return {
      iconList: {},
      actMenu:'bannerList',
    };
  },
  computed: {

  },
  mounted() {
    if(sessionStorage.getItem('actMenu')){
      this.actMenu = sessionStorage.getItem('actMenu');
    }
    
  },
  methods: {
    menuOpen(id) {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index,indexPath){
      console.log(index,indexPath);
      if(index != indexPath[0]){
        sessionStorage.setItem('actMenu',index)
        this.$router.push('/'+index);
      }
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
.sider1 {
 .el-menu-item-group__title{
   padding: 0;
 }
 .el-submenu .el-menu-item{
   min-width:199px;
 }
  .is-opened {
    .el-submenu__title {
      // background-color: #ebebeb;
    }
  }
  .el-submenu__title .el-submenu__icon-arrow {
    transform: rotateZ(-90deg);
  }

  .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
    transform: rotateZ(0deg);
  }
  .el-submenu__title {
    font-size: 15px !important;
    font-weight: 700;
    color: #333333;
    .el-submenu__icon-arrow {
      font-size: 20px;
    }
  }
}
.el-submenu {
  border-bottom: 1px solid #ececec;
  // background-color: #f9f9f9;
}

</style>

<style scoped lang="scss" scoped>
a {
  text-decoration: none;
}
.micon {
  vertical-align: middle;
  margin: 0 10px 0 5px;
}
</style>
