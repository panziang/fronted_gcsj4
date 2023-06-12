<template>
  <div class="sign-in">
    <!-- <home-nav-bar /> -->
    <van-nav-bar title="用户登录" />
    <div class="form-content">
      <van-tabs v-model:active="active">
        <van-tab title="密码登录">
          <van-form @submit="onSubmit1">
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
        </van-tab>
        <van-tab title="验证码登录">
          <van-form @submit="onSubmit2">
            <van-cell-group inset>
              <van-field v-model="email" name="validateName" label="邮箱" placeholder="请输入邮箱号"
                :rules="[{ validator: validateEmail, message: '邮箱格式不正确！' }]" />

              <van-field v-model="code" name="code" label="验证码" placeholder="请输入验证码"
                :rules="[{ required: true, message: '验证码错误' }]">
                <template #button>
                  <van-button size="small" type="primary" @click="getKaptcha()">刷新验证码</van-button>
                </template></van-field>
              <van-image width="200" height="60" :src=kaptcha />

              <van-field v-model="emailCode" name="验证码" label="邮箱验证码" placeholder="请输入邮箱验证码"
                :rules="[{ required: true, message: '请填写验证码' }]">
                <template #button>
                  <van-button size="small" type="primary" @click="getEmailCode">发送验证码</van-button>
                </template></van-field>
            </van-cell-group>
            <div style="margin: 16px;">
              <van-button round block type="primary" native-type="submit">
                登录
              </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>

      <p class="tips">没有账号？ <a @click="signUpClick()">注册</a> </p>


    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { getSignInByPwd, getLoginCode, sendKaptcha, getLoginByCode } from '../../request/user'
  import { Toast } from 'vant';
  import { onMounted } from 'vue';

  const email = ref('');
  const password = ref('');
  const code = ref('');
  const emailCode = ref('');

  const validateEmail = (val) => /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(val)
  const validatePwd = (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(val)

  const router = useRouter()
  const signUpClick = () => {
    router.push('/sign-up')
  }

  //提交密码登录
  const onSubmit1 = (values) => {
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
          Toast.success('登录成功')
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

  //获取图形验证码
  const kaptcha = ref({})
  const getKaptcha = () => {
    sendKaptcha(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        // const imgurl = URL.createObjectURL(data)
        kaptcha.value = URL.createObjectURL(data)

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("发送失败");
      }
    )
  }
  const getEmailCode = () => {
    getLoginCode(
      {
        kaptcha: code.value,
        to: email.value
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        if (data.code == '0') {
          Toast.success('发送成功')
        } else {
          Toast.fail('发送失败 ' + data.msg);
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("发送失败");
        Toast.fail('发送失败', msg)
      }
    )
  }
  //提交验证码登录
  const onSubmit2 = (values) => {
    console.log("email", email.value, "code", code.value);
    console.log('submit', values);
    getLoginByCode(
      {
        mail: email.value,
        code: emailCode.value,
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("登录成功");
          Toast.success('登录成功')
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

  onMounted(() => {
    getKaptcha()
  })
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