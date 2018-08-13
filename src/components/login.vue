<template>
  <div class="home">
    <div class="box">
      <div id="login-box">
         <div class="login-header"><img src="/static/images/logo-1.png" alt=""><span>后台管理系统</span></div>
         <div class='form-div-l'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item  prop="managerName" class="inp-phone" >
              <i class='login-jl login-jl-user'></i>
              <el-input v-model="ruleForm.managerName" placeholder="请输入管理员账号"></el-input>
            </el-form-item>

            <el-form-item  prop="managerPass" class="inp-phone">
              <i class='login-jl login-jl-psd'></i>
              <el-input type="password" v-model="ruleForm.managerPass" placeholder="密码6-30位" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item prop="code">
              <i class='login-jl login-jl-code'></i>
              <el-input v-model="ruleForm.code" placeholder="请输入验证码"  class='code' style="width:164px;"></el-input>
              <img class="securityCode" :src="imgCode" />
              <span class='click-code'  @click='securityCode'>换一张</span>
            </el-form-item>
            <el-button type="primary" class="regbtn" @click="login()">登 &nbsp;&nbsp;&nbsp;录</el-button>
          </el-form>
         </div>
      </div>
    </div>
    <div class="bottom-logo">版权所有：中控国建实业有限公司</div>
  </div>
</template>
<script>
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,30}$/;//6-30位数字、字母
          var reg = /^([0-9]|[a-zA-Z]){6,30}$/;
          if(!reg.test(value)){
            callback(new Error('请输入6-30位密码'));
            return false;
          }
          callback();
        }
      };
      var validateImgCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入四位验证码'));
        }else {
          callback();
        }
      };
      return {
        clickFlag: true,
        imgCode: '',
        ruleForm: {
          managerName:'',
          managerPass:'',
          code:''
        },
        rules: {
          managerName: [
            { validator: validateName, trigger: 'blur' }
          ],
          managerPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          code: [
            { validator: validateImgCode, trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      '$route': function () {
      },
      adminInfo: function (newValue){
        if (newValue.id) {
        }
      }
    },
    mounted() {
    //   var self = this;
    //   this.$nextTick(function() {
    //     this.key13();
    //     if (this.adminInfo) {
    //       this.$router.push('/manage');
    //     }
    //     this.securityCode();
         
    //   })
    },
    computed: {
    },
    methods: {
      securityCode() {
        api.valicode(Math.random()).then( (res) => {
           console.log(this.resConfig,"respose.headers");
          this.imgCode = _.ipValue()+'/validImg.html?'+Math.random();
        })
      },
      login(){
        this.$router.push('/')
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '../assets/scss/pages/login.scss'
</style>
