<template>
  <el-container class="body-container">
    <div class="aside-container">
      <div id="asideHeader" class="aside-header">
        <!-- <img src="../../assets/images/u39.png" alt="">
        <span>{{ resConfig.site_name }}</span> -->
        <img src="../../assets/images/惠民管家  logo-21.png" alt="">
      </div>
      <sidebar ></sidebar>
    </div>
    <el-main class="main">
      <el-header class="main-header" height="56px">
        <el-row>
          <el-col :span="19">
           <div style="width:100px;height:10px;"></div>
          </el-col>
          <el-col :span="5" class="header-function">
            <el-dropdown @command="handleCommand">
              <a class="personal-link">
                <!-- <img src="../../assets/images/personal_avatar.png" alt=""> -->
                <span class="username">用户名</span>
              </a>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item> -->
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>              
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <div class="main-content">
        <transition name="fade" mode="out-in">
          
					<router-view></router-view>
				</transition>
          
      </div>
      <Footer></Footer>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer.vue'
import PersonalInfo from '@/components/user/personalInfo'
// import api from "../../fetch/api";
// import * as _ from "../../utils/tool";

export default {
  data() {
    return {
 
    };
  },
  computed: {
  },
  mounted() {
    
    
  },
  methods: {
    handleCommand(command) {
      switch(command) {
        case 'logout':
          sessionStorage.clear();
          this.$router.push('/login')
          // 模拟f5刷新，避免出现Duplicate named routes definition警告。
          this.$router.go(0)
          
          break
        case 'personalInfo':
          this.$refs.personalInfo.$emit('openPersonalInfoDialog')
      }
    },
  },
  components:{Sidebar, PersonalInfo,Footer },
};
</script>
<style>
@import "../../assets/css/common.css";
@import "../../assets/css/reset.css";
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.micon {
  vertical-align: middle;
  margin: -1px 10px 0 5px;
}
.activeItem {
  background-color: #1a1e39;
  color: #ed3751 !important;
}
.body-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .aside-container {
    width: 200px;
    height: 100%;
    background-color: #2e314e;
    margin: 0px;
    padding: 0px;
  }
}

.aside-header {
  background-color: #2e314e;
  color: #fff;
  font-size: 16pt;
  text-align: center;
  margin: 0px auto;
  padding: 0px;
  height: 56px;
  font-weight: bold;
  line-height: 56px;
  width: 200px;
  img {
    margin-top: 5px;
    height: 46px;
  }
  span {
    display: inline-block;
    height: 56px;
    font-weight: bold;
    vertical-align: top;
  }
}

.nav-menu {
  border: none;
}
.nav-menu:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  overflow: auto;
}

.main {
  margin: 0px;
  padding: 0px;
  width: 100%;
  min-width: 1000px;
  .main-header {
    background-color: #2e314e;
    // position: absolute;
    padding-right: 10px;
    // z-index: 100;
    padding-left: 0;
    .main_menu {
      // position: absolute;
      // left: -180px;
      width: 100%;
      height: 50px;
      // top: 90px;
      // background: #305f96;
      // padding-left: 180px;
      .menu-item {
        width: 18%;
        line-height: 56px;
        height: 56px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        float: left;
        cursor: pointer;
      }
      .menu-item:hover {
        background: #1a1e39;
        color: #ed3751;
      }
      .menu-item.active {
        background: #1a1e39;
        color: #ed3751;
      }
    }
    .header-function {
      text-align: right;
      line-height: 54px;
      .personal-link {
        padding: 18px 10px 19px;
        text-decoration: none;
      }
      .personal-link:hover {
        background-color: #1a1e39;
      }
      img {
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        vertical-align: middle;
      }
      .username {
        margin-left: 3px;
        font-size: 10pt;
        color: #fff;
      }
    }
  }
  .main-content {
    margin: 0 10px;
    overflow: auto;
    width: 98%;
    height: calc(100% - 174px);
    // max-width: 1500px;
    min-width: 1000px;
    // min-height: 700px;
  }
  .el-breadcrumb {
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
    border-radius: 0px;
    background-color: #f5f4f4;
    border-bottom: solid 1px #eeeeee;
  }
}

.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
  margin: 20px 0px 0px -10px;
}
.hamburger.is-active {
  transform: rotate(0deg);
}
</style>