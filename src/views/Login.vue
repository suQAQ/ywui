<template>
    <div>
        <!-- 登录表单, 加":"是绑定data里的数据, rules是验证规则, ref是定位, model是表单数据 -->
        <el-form :rules="loginRules" ref="loginFormRef" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">云涡系统</h3>
            <!-- 表单项, prop是定义的item属性, 对应下面校验规则的名称 -->
            <el-form-item prop="username">
                <!-- 输入框, type是类型, auto是自动填充, v-model是表单项的数据 -->
                <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input class="loginCaptcha" type="text" auto-complete="false"
                v-model="loginForm.code" placeholder="点击图片更换验证码"></el-input>
                <img :src="captchaUrl">
            </el-form-item>
            <el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>
            <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>
<script>
//导出组件
export default {
    //组件名称可省略
    name: "Login",
    //数据
    data() {
        return {
            //验证码图片地址
            captchaUrl: "",
            //表单数据
            loginForm: {
                username: "",
                password: "",
                code: "",
            },
            //记住我的选中状态
            checked: true,
            //表单校验规则
            loginRules: {
                username: [
                    //blur失去焦点
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
            },
        }
    },
    //方法
    methods: {
        //登录提交
        submitLogin() {
            //验证用this.$refs.loginFormRef来定位
            this.$refs.loginFormRef.validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    this.$message.error("请输入必填字段!")
                    return false;
                }
            });
        },
    },
    
}
</script>
<style scoped>
    /* 登录容器 */
    .loginContainer{
        /* 圆角边框 */
        border-radius: 15px;
        /* 确定背景的裁剪区域 */
        background-clip: padding-box;
        /* 外边距 */
        margin: 180px auto;
        /* 宽度 */
        width: 350px;
        /* 内边距 */
        padding: 15px 35px 15px 35px;
        background-color: #fff;
        /* 边框 */
        border: 1px solid #eaeaea;
        /* 边框阴影 */
        box-shadow: 0 0 25px #cac6c6;
    }
    /* 登录标题 */
    .loginTitle{
        margin: 0 auto 30px auto;
        /* 水平对齐方式 */
        text-align: center;
    }
    .loginCaptcha{
        width: 250px;
        /* 右外边距 */
        margin-right: 5px;
    }
    .loginRemember{
        text-align: left;
        margin: 0 0 15px 0;
    }
</style>