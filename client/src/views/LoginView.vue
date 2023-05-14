<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';
import GoogleView from './GoogleView.vue';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  components: { GoogleView },
  methods: {
    ...mapActions(useMainStore, ['login']),
    handleLogin() {
      const body = {
        email: this.email,
        password: this.password,
      };
      this.login(body);
    },
    toRegister() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<template>
  <div class="spotifyheader">
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify Logo" />
  </div>
  <div class="logindiv">
    <ul class="login">
      <div class="bototes">
        <li class="facebook">
          <button type="button" class="facebookb"><i class="fa-brands fa-square-facebook"></i> <span>Continue With Facebook</span></button>
        </li>
        <li class="text-center fa-brands fa-square-google googleb">
          <GoogleView />
        </li>
      </div>
      <li class="ou">
        <hr role="presentation" class="linha1" />
        <span>ou</span>
        <hr role="presentation" class="linha2" />
      </li>
      <li class="login2">
        <form @submit.prevent="handleLogin" class="formlogin">
          <h5 style="color: aliceblue" class="endereso">Email</h5>
          <input v-model="email" type="email" class="email" />
          <br />
          <h5 style="color: aliceblue" class="senha">Password</h5>
          <input v-model="password" type="password" />
          <br />
          <br />
          <a href="/" style="color: aliceblue" class="esqueceusenha">Forgot password ?</a>
          <br />
          <br />
          <input type="checkbox" name="Lembrar de mim" id="lembrar" /><span class="lembrar" style="color: aliceblue">Remember me</span>
          <br />
          <div class="entrard">
            <button type="submit" class="entrar">Sign In</button>
          </div>
          <hr class="hrnap" />
          <h2 class="naotem" style="color: aliceblue">You not have account ?</h2>
          <button type="button" class="botaoinscrever" @click="toRegister">Register</button>
        </form>
      </li>
    </ul>
  </div>
</template>

<style></style>
