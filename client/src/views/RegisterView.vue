<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      imageUrl: '',
    };
  },
  methods: {
    ...mapActions(useMainStore, ['register']),
    handleRegister() {
      const body = {
        username: this.username,
        email: this.email,
        password: this.password,
        imageUrl: this.imageUrl,
      };
      this.register(body);
    },
    toLogin() {
      this.$router.push({ name: 'login' });
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
      <div class="bototes"></div>
      <li class="ou">
        <hr role="presentation" class="linha1" />
        <span style="color: aliceblue">REGISTER</span>
        <hr role="presentation" class="linha2" />
      </li>
      <li class="login2">
        <form @submit.prevent="handleRegister" class="formlogin">
          <h5 style="color: aliceblue" class="endereso">Username</h5>
          <input v-model="username" type="text" class="username" />
          <br />
          <h5 style="color: aliceblue" class="endereso">Email</h5>
          <input v-model="email" type="email" class="email" />
          <br />
          <h5 style="color: aliceblue" class="senha">Password</h5>
          <input v-model="password" type="password" />
          <br />
          <h5 style="color: aliceblue" class="endereso">ImageUrl</h5>
          <input v-model="imageUrl" type="text" />
          <br />
          <br />
          <div class="entrard">
            <button type="submit" class="entrar">Sign Up</button>
          </div>
          <hr class="hrnap" />
          <h2 class="naotem" style="color: aliceblue">You have account ?</h2>
          <button type="button" class="botaoinscrever" @click="toLogin">Login</button>
        </form>
      </li>
    </ul>
  </div>
</template>
