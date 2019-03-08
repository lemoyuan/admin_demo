<template>
  <el-dialog title="个人信息" :visible.sync="dialogVisible" width="560px" 
    @open="handleDialogOpen()" v-loading="loading">
    <div slot="title" class="dialog-header">个人信息</div>
    <el-form :model="userInfo" :rules="rules" 
      ref="personalInfoForm" label-width="80px" label-position="right" size="small">
      <el-form-item label="用户名" prop="realName">
        <el-col :span="16"><el-input ref="username" :maxlength="32" v-model="userInfo.realName" autofocus></el-input></el-col>
      </el-form-item>
      <el-form-item label="登录名" prop="name">
        <el-col :span="16"><el-input :maxlength="32" v-model="userInfo.name"></el-input></el-col>
      </el-form-item>
      <!-- <el-form-item><el-checkbox v-model="changePassword" @change="handleChangePasswordChanged">修改密码</el-checkbox></el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="16">
          <el-input type="password" ref="password" :disabled="!changePassword" v-model="userInfo.password" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-col :span="16">
          <el-input type="password" v-model="userInfo.checkPassword" :disabled="!changePassword" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>         -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleDialogClose()">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm('personalInfoForm')">确 定</el-button>
    </span>    
  </el-dialog>
</template>

<script>

export default {
  name: "personal-info",
  data() {
    var validatePassword = (rule, value, callback) => {
      if (this.changePassword && (value === "" || value === undefined)) {
        callback(new Error("请输入密码"));
      } else {
        if (this.userModel.checkPassword !== "") {
          this.$refs.personalInfoForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validateCheckPassword = (rule, value, callback) => {
      if (this.changePassword && (value === "" || value === undefined)) {
        callback(new Error("请再次输入密码"));
      } else if (this.changePassword && value !== this.userModel.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      changePassword: false,
      userModel: {
        id: 0,
        name: "",
        loginName: ""
      },
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 32 个字符", trigger: "blur" }
        ],
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 32 个字符", trigger: "blur" }
        ],
        password: [
          {
            required: this.changePassword,
            message: "请输入密码",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "blur" }
        ],
        checkPassword: [
          {
            required: this.changePassword,
            message: "请再次输入密码",
            trigger: "blur"
          },
          { validator: validateCheckPassword, trigger: "blur" }
        ]
      }
    };
  },

  props: {
    userInfo:"",
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doUpdatePersonalInfo();
        } else {
          return false;
        }
      });
    },
    doUpdatePersonalInfo() {
      this.loading = true;
      if (!this.changePassword) {
        this.userModel.password = "";
      }
    },
    handleDialogClose() {
      this.dialogVisible = false;
    },
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs["personalInfoForm"].clearValidate();
        this.$refs["username"].focus();
      });
    },
    handleChangePasswordChanged(val) {
      this.$refs["personalInfoForm"].clearValidate();
      if (val) {
        this.$nextTick(() => {
          this.$refs["password"].focus();
        });
      }
    },
    outputError(error) {
      console.log(error.response ? error.response : error.message);
      this.loading = false;
      this.$message({
        showClose: true,
        message: "系统异常，请联系管理员。",
        type: "error"
      });
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.$on("openPersonalInfoDialog", function() {
        // this.loading = true;
        this.changePassword = false;
            this.dialogVisible = true;

      });
    });
  }
};
</script>

<style lang="scss">
.el-dialog {
  text-align: left;
}
.dialog-header {
  width: 100%;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: solid 1px #eee;
}
</style>



