<template>
  <div id="login">
    <SlideShow/>
    <LoginForm/>
  </div>
</template>

<script>
import { LoginForm, SlideShow } from "../components";

export default {
  name: 'login',
  components: {
    SlideShow,
    LoginForm,
  }
}
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
