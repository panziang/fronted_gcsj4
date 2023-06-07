<template>
  <van-nav-bar title="更改信息" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="user-edit">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="userInfo.name" name="name" label="用户名" placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />

        <van-field v-model="userInfo.old_pwd" name="old_pwd" label="旧密码" placeholder="请输入旧密码" type="password"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="userInfo.new_pwd" name="new_pwd" label="新密码" placeholder="请输入新密码" type="password"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="userInfo.slogan" name="slogan" label="个性签名" placeholder="请输入个性签名"
          :rules="[{ required: true, message: '请填写个性签名' }]" />

        <van-field name="sex" label="单选框">
          <template #input>
            <van-radio-group v-model="userInfo.sex" direction="horizontal">
              <van-radio :name=0>男</van-radio>
              <van-radio :name=1>女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getUserDetail, editUserInfo } from '@/request/user'
  import { onMounted } from 'vue';
  import { Toast } from 'vant';

  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  const userInfo = reactive({
    user_id: '',
    name: '',
    old_pwd: '',
    new_pwd: '',
    slogan: '',
    sex: 0,
  })

  const getUserInfo = () => {
    getUserDetail(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("获取用户信息成功");
          userInfo.user_id = data.data.id
          userInfo.name = data.data.name
          userInfo.slogan = data.data.slogan
          userInfo.sex = data.data.sex
          // userInfo.mail = data.data.mail
          console.log("userInfo", userInfo);

        } else {
          // PromptMessage.messageBoxError('登录失败', data.msg)
          console.log("获取用户信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("登录失败");
      }
    )
  }

  const onSubmit = () => {
    // console.log("email", email.value, "password", password.value);
    // console.log('submit', values);
    editUserInfo(
      {
        user_id: userInfo.user_id,
        name: userInfo.name,
        old_pwd: userInfo.old_pwd,
        new_pwd: userInfo.new_pwd,
        slogan: userInfo.slogan,
        sex: userInfo.sex,
        is_admins: 0
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("修改成功");
          Toast.success('修改成功');
          setTimeout(() => {
            router.push('/user')
          }, 1500)


        } else {
          // PromptMessage.messageBoxError('登录失败', data.msg)
          console.log("修改失败");
          Toast.fail('修改失败');
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("修改失败");
        Toast.fail('修改失败');
      }
    )
  };

  onMounted(() => {
    getUserInfo()
  })


</script>

<style lang="less" scoped></style>