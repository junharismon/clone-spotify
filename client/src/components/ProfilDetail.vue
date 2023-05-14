<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  computed: {
    ...mapWritableState(useMainStore, ['dataProfil']),
  },
  methods: {
    ...mapActions(useMainStore, ['subscribe', 'profil']),
    tobeSubscribe() {
      this.subscribe();
    },
  },
  created() {
    this.profil();
  },
};
</script>

<template>
  <div class="container">
    <div class="row profile">
      <div class="col-md-4">
        <div class="profile-content">
          <!-- SIDEBAR USERPIC -->
          <div class="profile-userpic">
            <img :src="dataProfil.imageUrl" class="img-responsive" alt="" />
          </div>
          <!-- END SIDEBAR USERPIC -->
          <!-- SIDEBAR USER TITLE -->
          <div class="profile-usertitle">
            <div class="profile-usertitle-name">{{ dataProfil.username }}</div>
            <div class="profile-usertitle-job">{{ dataProfil.role }}</div>
            <div class="profile-usertitle-job">{{ dataProfil?.createdAt?.split('T')[0] }}</div>
            <div class="profile-usertitle-job">{{ dataProfil.isSubscribe == true ? 'Status Premium' : '' }}</div>
          </div>
          <!-- END SIDEBAR USER TITLE -->
          <!-- SIDEBAR BUTTONS -->
          <div class="profile-userbuttons">
            <button @click="tobeSubscribe" v-if="dataProfil.isSubscribe == false" type="button" class="btn btn-success btn-sm">Subscribe</button>
          </div>
          <!-- END SIDEBAR BUTTONS -->
          <!-- SIDEBAR MENU -->
          <div class="profile-usermenu">
            <ul class="nav">
              <li>
                <a href="#">
                  <i class="glyphicon glyphicon-home"></i>
                  Overview
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="glyphicon glyphicon-user"></i>
                  Account Settings
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="glyphicon glyphicon-flag"></i>
                  Help
                </a>
              </li>
            </ul>
          </div>
          <!-- END MENU -->
        </div>
      </div>
      <!-- <div class="col-md-4">
        <div class="profile-content">Some user related content goes here...</div>
      </div> -->
    </div>
  </div>
  <center>
    <strong>Powered by <a href="#" target="_blank">Spotify Clone</a></strong>
  </center>
  <br />
  <br />
</template>
