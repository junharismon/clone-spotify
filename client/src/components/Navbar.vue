<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  computed: {
    ...mapWritableState(useMainStore, ['buttonLogin', 'dataPlaylist', 'isSubscriber', 'allDataUser', 'dataProfil']),
  },
  methods: {
    ...mapActions(useMainStore, ['logout', 'getPlaylist', 'subscribe', 'profil']),
    toLogout() {
      this.logout();
    },
    toLogin() {
      this.$router.push({ name: 'login' });
    },
    toSignup() {
      this.$router.push({ name: 'register' });
    },
    toHome() {
      this.$router.push({ name: 'dashboard' });
    },
    toFormPlaylist() {
      this.$router.push({ name: 'addPlaylist' });
    },
    toSearchPage() {
      this.$router.push({ name: 'song' });
    },
    goPlaylist(id) {
      this.$router.push({ name: 'playlist' });
    },
    async toSubscribe() {
      if (localStorage.access_token) {
        await this.subscribe();
      } else {
        this.$router.push({ name: 'login' });
      }
    },
    togoProfile() {
      this.$router.push({ name: 'profil' });
    },
  },
  created() {
    if (localStorage.access_token) {
      this.buttonLogin = false;
      this.getPlaylist();
      this.profil();
    } else {
      this.buttonLogin = true;
      this.profil();
    }
  },
};
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <a href="#">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Logo" />
      </a>
    </div>

    <div class="navigation">
      <ul>
        <li>
          <RouterLink to="/dashboard">
            <a href="#">
              <span class="fa fa-home"></span>
              <span>Home</span>
            </a>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/search">
            <a>
              <span class="fa fa-search"></span>
              <span>Search</span>
            </a>
          </RouterLink>
        </li>

        <li v-if="!buttonLogin">
          <RouterLink to="/library">
            <a href="#">
              <span class="fa fas fa-book"></span>
              <span>Your Library</span>
            </a>
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="navigation">
      <ul>
        <li v-if="!buttonLogin">
          <RouterLink to="/addplaylist">
            <span class="fa fas fa-plus-square"></span>
            <span>Create Playlist</span>
          </RouterLink>
        </li>

        <li v-if="!buttonLogin">
          <RouterLink to="/liked-song">
            <a href="#">
              <span class="fa fas fa-heart"></span>
              <span>Liked Songs</span>
            </a>
          </RouterLink>
        </li>
      </ul>
      <div class="border-b border-b-gray-700"></div>
      <ul>
        <li v-if="!buttonLogin" v-for="playlist in dataPlaylist" class="font-semibold text-[13px] mt-0 p-0 text-gray-300 hover:text-white">
          <a href="#" @click.prevent="goPlaylist(playlist.id)"> {{ playlist.playlistName }} </a>
        </li>
      </ul>
    </div>

    <div class="policies">
      <ul>
        <li>
          <a href="#">Cookies</a>
        </li>
        <li>
          <a href="#">Privacy</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="topbar">
    <div class="prev-next-buttons">
      <button type="button" class="fa fas fa-chevron-left"></button>
      <button type="button" class="fa fas fa-chevron-right"></button>
    </div>

    <div class="navbar">
      <ul>
        <li>
          <a href="#" v-if="isSubscriber === true">Premium</a>
          <a href="#" v-if="isSubscriber === false" @click.prevent="toSubscribe">Subscribe</a>
        </li>
        <li>
          <RouterLink to="/profil">
            <a href="#" v-if="!buttonLogin">Profile</a>
          </RouterLink>
          <a href="#" v-if="buttonLogin" @click.prevent="toSignup">Sign Up</a>
        </li>
        <li class="divider">|</li>
        <li>
          <a v-if="!buttonLogin" href="#" @click.prevent="toLogout">Log Out</a>
          <a href="#" v-if="buttonLogin" @click.prevent="toLogin">Log In</a>
        </li>
      </ul>
    </div>
  </div>
</template>
