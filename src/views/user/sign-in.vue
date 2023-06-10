<template>
  <div class="sign-in">
    <!-- <home-nav-bar /> -->
    <h2>登录</h2>
    <div class="form-content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="email" name="validateName" label="邮箱" placeholder="请输入邮箱号"
            :rules="[{ validator: validateEmail, message: '邮箱格式不正确！' }]" />
          <!-- <van-field v-model="password" type="password" name="validatePwd" label="密码" placeholder="密码"
            :rules="[{ validator: validatePwd, message: '密码必须由大小写字母和数字组成且长度在6~16之间！' }]" /> -->
          <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <p class="tips">没有账号？ <a @click="signUpClick()">注册</a> </p>


    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import homeNavBar from '../home/cpns/home-nav-bar.vue';
  import { ref } from 'vue';
  import { getSignInByPwd } from '../../request/user'
  import { Toast } from 'vant';

  const email = ref('');
  const password = ref('');

  const validateEmail = (val) => /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(val)
  const validatePwd = (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(val)

  const router = useRouter()
  const signUpClick = () => {
    router.push('/sign-up')
  }


  const onSubmit = (values) => {
    console.log("email", email.value, "password", password.value);
    console.log('submit', values);
    getSignInByPwd(
      {
        mail: email.value,
        pwd: password.value,
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("登录成功");
          localStorage.setItem("1024token", data.data)
          router.push('/home')

        } else {
          Toast.fail("登录失败 " + data.msg)
          // PromptMessage.messageBoxError('登录失败', data.msg)
          console.log("登录失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("登录失败");
        Toast.fail("登录失败 " + msg)
      }
    )
  };
</script>

<style lang="less" scoped>
.sign-in {
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