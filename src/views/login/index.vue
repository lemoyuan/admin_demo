<template>
  <div class="login-container" >
    <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForm" autoComplete="on" label-position="left" @keydown.native.stop="keyLogin">
      <div class="login-body">
        <!-- <img class="profile-img" src="../../assets/images/u39.png" alt="">
        <p class="login-title">后台管理登录</p>  -->
        <el-col :span="12">
          <div class="login-box-left">
            <p>惠民管家</p>
            <p>后台管理系统</p>
          </div> 
        </el-col>
        <el-col :span="12" style="margin-top:20px;">
          <el-form-item prop="username">
            <el-input name="username" size="medium" v-model="loginForm.username" autofocus="autofocus" placeholder="请输入用户名称">
              <div class="login-username" slot="prefix"></div>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" type="password" size="medium" v-model="loginForm.password" placeholder="请输入登录密码" @keyup.enter.native="doLogin">
              <template slot="prefix"><div class="login-password"></div></template>
            </el-input>
          </el-form-item>

          <el-form-item prop="code" style="text-align:left;" >
            <i class='login-jl login-jl-code'></i>
            <el-input v-model="loginForm.code" placeholder="验证码"  class='code' style="width:120px;" ></el-input>
            <img class="securityCode" :src="imgCode" />
            <span class='click-code'  @click='securityCode'>看不清<br> 换一张</span>
          </el-form-item>

          <el-button type="primary" class="logbtn" :loading="showLoading" @click.native.prevent="doLogin">登录</el-button>
        </el-col>
        
      </div>
    </el-form>
    <div class="bottom-logo">
      中商惠民&lt;青岛>金融管家有限公司
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import api from "../../fetch/api";
// import * as _ from "../../utils/tool";

export default {
  data() {
    return {
      displayLoading: false,
      isGeneral:true,
      imgCode: "",
      resConfig:{site_title:""},
      loginForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["showLoading"])
  },
  mounted() {

    
  },
  methods: {
    keyLogin() {
      
   
    },
    doLogin() {
      this.$router.push('/');
    },
    securityCode() {
  
    },
  
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.login-container {
  background: url(../../assets/images/log_bg_03.jpg) no-repeat;
  background-size: 100% 100%;
  .el-form-item.is-success .el-input__inner{
    border: none!important;
  }
  .el-button {
    border-radius: 0;
  }
  .el-input__inner{
    border-radius:0!important;
  }
  .el-input__inner::-webkit-input-placeholder{
    color: #656766;
  }
  .el-input input {
    // width: 300px;
    
    height: 40px;
    font-family: "FontAwesome";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    background-color: #dee1e8 !important;
    border: none!important;
    padding: 0;
    padding-left: 50px;
  }
  .input:-webkit-autofill {
    background-color: #dee1e8 !important;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.bottom-logo {
  position: absolute;
  bottom: 0px;
  width: 100%;
  color:#fff;
  height: 78px;
  text-align: center;
  font-size: 12px;
}
.login-box-left{
  background: url(../../assets/images/log_star_06.png) no-repeat;
  height: 270px;width:270px;
  // background-size: 100% 100%;
  p:nth-child(1){
    font-size: 38px;
    font-family: "Microsoft YaHei";
    color: rgb(255, 255, 255);
    padding-top: 24px;
    margin-bottom:0;
  }
  p:nth-child(2){
      font-size: 24px;
      font-family: "Microsoft YaHei";
      color: rgb(255, 255, 255);
  }
}
.login-jl {
  height: 22px;
  width: 20px;
  line-height: 22px;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: inline-block;
  width: 42px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-right: 1px solid #d9d9d9;
  background: #fff;
  margin: 4px 0;
  margin-left: 6px;
}
.click-code {
  cursor: pointer;
  display: inline-block;
  color:#fff;
  line-height: 20px;
  position: absolute;
  right: 0;
  bottom: 0px;
  margin-left: 5px;
  font-size: 14px;
}
.code {
  input {
    width: 122px;
  }
}
.securityCode {
  width: 80px;
  height: 40px;
  cursor: pointer;
  vertical-align: top;
  margin: 0px 5px;
  // position: absolute;
  // top: 6px;
  // right: 50px;
}
.login-jl-code {
  background: url(../../assets/images/Write.png) center center no-repeat;
}
.logbtn {
  background-color: #D00E31!important;
  border-color:#D00E31!important;
  width: 300px;
  height: 50px;
  font-family: "微软雅黑";
  font-weight: 403;
  font-style: normal;
  font-size: 18px;
  color: #ffffff;
}
.logbtn:hover{
  background-color: #D00E31;
  opacity: 0.8;
}
.login-container {
  height: 100%;
  width: 100%;
  background-color: rgba(227, 232, 238, 1);
  .el-input {
    width: 100%;
  }
  .el-button {
    width: 100%;
  }
  .login-form {
    position: absolute;
     top: 50% !important;
     left: 50% !important;
      transform: translate(-50%,-50%);
    margin: 0 auto;
    // margin-bottom: 20px;
  }
  .login-header {
    padding: 10px 15px;
    border-bottom: 1px solid #d0cdc7;
    background-color: #f6f5f4;
  }
  .login-body {
    width: 520px;
    height: 300px;
    padding: 10px 20px;
    margin:0 auto;
    color: #999999;
    background-color: rgba(57,64,95,0.8);
    box-shadow: -20px -20px 0px #515b74;
    text-align: center;
    .profile-img {
      width: 67px;
      height: 76px;
      margin: 0 auto 10px;
      display: block;
    }
    .login-title {
      font-size: 24px;
      font-weight: bold;
      color: rgba(208, 14, 49, 1);
    }
    .login-username {
      width: 26px;
      height: 26px;
      margin: 8px 15px;
      background-image: url("../../assets/images/user.png");
      background-size: 26px 26px;
    }
    .login-password {
      width: 26px;
      height: 26px;
      margin: 8px 15px;
      background-image: url("../../assets/images/lock.png");
      background-size: 26px 26px;
    }
  }
}
</style>
