<template>
  <div class="sign-up">
    <home-nav-bar />
    <div class="form-content">
      <van-form @submit="onSubmit">
        <van-field name="uploader" label="文件上传" :rules="[{ required: true, message: '请上传头像' }]">
          <template #input>
            <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" />
          </template>
        </van-field>
        <van-cell-group inset>
          <van-field v-model="username" name="validateName" label="用户名" placeholder="用户名"
            :rules="[{ validator: validateName, message: '用户名首位必须为字母且长度在3~16之间！' }]" />

          <van-field v-model="email" name="validateEmail" label="邮箱" placeholder="邮箱"
            :rules="[{ validator: validateEmail, message: '邮箱格式错误！' }]" />

          <van-field v-model="password" type="password" name="validatePwd" label="密码" placeholder="密码"
            :rules="[{ validator: validatePwd, message: '密码必须由大小写字母和数字组成且长度在6~16之间！' }]" />

          <van-field name="radio" label="性别" :rules="[{ required: true, message: '请选择用户性别' }]">
            <template #input>
              <van-radio-group v-model="sex" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="0">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="slogan" rows="1" autosize label="个性签名" type="textarea" placeholder="请输入个性签名"
            :rules="[{ required: true, message: '请填写用户签名' }]" />

          <van-field v-model="code" name="code" label="验证码" placeholder="请输入验证码"
            :rules="[{ required: true, message: '验证码错误' }]">
            <template #button>
              <van-button size="small" type="primary" @click="getKaptcha">发送验证码</van-button>
            </template></van-field>
          <van-image width="200" height="60" :src=kaptcha />
          <van-field v-model="emailCode" name="emailCode" label="邮箱验证码" placeholder="请输入邮箱验证码"
            :rules="[{ required: true, message: '验证码错误' }]">
            <template #button>
              <van-button size="small" type="primary" @click="getEmailCode">发送验证码</van-button>
            </template></van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            注册
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
  import { sendKaptcha, getAvatar, getSignUp, getSignCode } from '../../request/user'
  import { Toast } from 'vant';

  const username = ref('');
  const password = ref('');
  const sex = ref('')
  const code = ref('')
  const head_img = ref('')
  const fileList = ref([])
  const email = ref((''))
  const slogan = ref('')
  const emailCode = ref('')

  const validateName = (val) => /^[a-zA-Z][a-zA-Z0-9]{2,15}$/.test(val)
  const validateEmail = (val) => /^([\w.-]+@[\w.-]+\.[a-zA-Z]{2,6})$/.test(val)
  const validatePwd = (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(val)

  const router = useRouter()
  const signInClick = () => {
    router.push('/sign-in')
  }
  //上传头像
  const afterRead = (myFile) => {
    // fileList.value.push(myFile)
    // 此时可以自行将文件上传至服务器
    console.log("file", myFile)
    getAvatar(
      {
        file: myFile.file
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        head_img.value = data.data

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("发送失败");
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
    getSignCode(
      {
        kaptcha: code.value,
        to: email.value
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("发送失败");
      }
    )

  }

  //发送注册请求
  const signUp = () => {
    getSignUp(
      {
        code: emailCode.value,
        head_img: head_img.value,
        mail: email.value,
        name: username.value,
        pwd: password.value,
        sex: sex.value,
        slogan: slogan.value
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        // console.log("注册成功");
        if (data.code == '0') {
          Toast.success('注册成功');
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("发送失败");
      }
    )
  }

  const onSubmit = (values) => {
    console.log("username", username.value, "password", password.value);
    console.log('submit', values);
    signUp()
  };
</script>

<style lang="less" scoped>
.sign-up {
  .form-content {
    // margin-top: 20px;

    .van-form {

      .van-cell-group {
        // border: 1px solid red;

        .van-field {
          background-color: var(--line-color);
          margin-top: 15px;
        }
      }
    }

    .tips {
      margin-top: 20px;
      display: flex;
      justify-content: end;
      margin-right: 30px;
    }
  }
}
</style>