<template>
  <div class="sign-up">
    <home-nav-bar />
    <h2>注册</h2>
    <div class="form-content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username" name="validateName" label="用户名" placeholder="用户名"
            :rules="[{ validator: validateName, message: '用户名首位必须为字母且长度在3~16之间！' }]" />
          <van-field v-model="password" type="password" name="validatePwd" label="密码" placeholder="密码"
            :rules="[{ validator: validatePwd, message: '密码必须由大小写字母和数字组成且长度在6~16之间！' }]" />

          <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="sex" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="0">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field v-model="code" name="code" label="验证码" placeholder="请输入验证码"
            :rules="[{ required: true, message: '验证码错误' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <p class="tips">已有账号？ <a @click="signInClick()">登录</a> </p>


    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import homeNavBar from '../home/cpns/home-nav-bar.vue';
  import { ref } from 'vue';
  const username = ref('');
  const password = ref('');
  const sex = ref('')
  const code = ref('')

  const validateName = (val) => /^[a-zA-Z][a-zA-Z0-9]{2,15}$/.test(val)
  const validatePwd = (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(val)

  const router = useRouter()
  const signInClick = () => {
    router.push('/sign-in')
  }
  const onSubmit = (values) => {
    console.log("username", username.value, "password", password.value);
    console.log('submit', values);
  };
</script>

<style lang="less" scoped>
.sign-up {
  .form-content {
    margin-top: 50px;

    .van-form {

      .van-cell-group {
        // border: 1px solid red;

        .van-field {
          background-color: var(--line-color);
          margin-top: 30px;
        }
      }
    }

    .tips {
      margin-top: 30px;
      display: flex;
      justify-content: end;
      margin-right: 30px;
    }
  }
}
</style>