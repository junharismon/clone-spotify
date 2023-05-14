import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
// const BASE_URL = `https://discreet-spade-production.up.railway.app/`
const BASE_URL = `http://localhost:3000/`

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      buttonLogin: true,
      dataMusic: [],
      dataAlbum: [],
      dataPlaylist: [],
      isSubscriber: false,
      dataProfil: {},
      allDataUser: [],
      dataDetailAlbum: {},
      dataDetailArtist: {},
      dataLikedSong: []
    }
  },
  actions: {
    async login(body) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}users/login`,
          method: "POST",
          data: body
        })
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("username", data.username)
        localStorage.setItem("email", data.email)
        localStorage.setItem("id", data.id)
        this.isSubscriber = data.isSubscribe
        this.buttonLogin = false
        $toast.success(`Welcome ${data.username}`, {
          autoClose: 500,
          position: 'top-right',
        });
        this.getAlbum()
        this.router.push({ name: 'dashboard' })
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async profil() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}users/profil`,
          method: "GET",
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.dataProfil = data
        this.isSubscriber = data.isSubscribe
      } catch (error) {
        console.log(error);
      }
    },
    async register(body) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}users/register`,
          method: "POST",
          data: body
        })
        $toast.success(`Success register`, {
          autoClose: 500,
          position: 'top-right',
        });
        this.router.push({ name: "login" })
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async logout() {
      localStorage.removeItem("access_token")
      localStorage.removeItem("email")
      localStorage.removeItem("id")
      this.buttonLogin = true
      this.isSubscriber = false
      this.getPlaylist()
      $toast.success(`Good bye ${localStorage.username}`, {
        autoClose: 500,
        position: 'top-right',
      });
      localStorage.removeItem("username")
      this.router.push({ name: 'dashboard' })
    },
    async getMusic(search) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `https://deezerdevs-deezer.p.rapidapi.com/search`,
          params: { q: `${search}` },
          headers: {
            'X-RapidAPI-Key': '159f5e6cafmshce3552094cff361p1dda56jsndb8406552046',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        })
        this.dataMusic = data.data
      } catch (error) {
        console.log(err)
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async getAlbum() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}albums`,
          method: "GET",
        })
        this.dataAlbum = data
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async toAddPlaylist(dataPlaylist) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}playlist`,
          method: "POST",
          data: {
            UserId: localStorage.id,
            playlistName: dataPlaylist
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        $toast.success(`Succes add ${dataPlaylist} to playlist`, {
          autoClose: 500,
          position: 'top-right',
        });
        this.getPlaylist()
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async getPlaylist() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}playlist`,
          method: "GET",
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.dataPlaylist = data
      } catch (error) {
        console.log(error);
      }
    },
    async getAllUser() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}users`,
          method: "GET"
        })
        this.allDataUser = data
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async subscribe() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}users/generate-token-midtrans`,
          method: "POST",
          headers: {
            access_token: localStorage.access_token
          }
        })
        const changeSubscribe = this.changeIsSubscribe
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            changeSubscribe()
          },
        })
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async changeIsSubscribe() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}users/subscribe`,
          method: "PATCH",
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.profil()
      } catch (error) {
        console.log();
      }
    },
    async toDetailAlbum(id) {
      try {
        console.log(id);
        const { data } = await axios({
          method: 'GET',
          url: `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`,
          headers: {
            'X-RapidAPI-Key': '159f5e6cafmshce3552094cff361p1dda56jsndb8406552046',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        })
        this.dataDetailAlbum = data
        this.router.push({ name: "albumDetail" })
      } catch (error) {
        console.log();
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async toDetailArtist(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`,
          headers: {
            'X-RapidAPI-Key': '159f5e6cafmshce3552094cff361p1dda56jsndb8406552046',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        })
        this.dataDetailArtist = data
        this.router.push({ name: "artistDetail" })
      } catch (error) {
        console.log(error);
      }
    },
    async addLikedMusic(music) {
      try {
        // console.log(music);
        const { data } = await axios({
          url: `${BASE_URL}songs/${music.id}`,
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          },
          data: music
        })
        $toast.success(`Success liked song`, {
          autoClose: 500,
          position: 'top-right',
        });
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async getLikeSong() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}songs/likedsong`,
          method: "GET",
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.dataLikedSong = data
        console.log(data);
        console.log('masuk');
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLikedSong(id) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}songs/${id}`,
          method: "DELETE",
          headers: {
            access_token: localStorage.access_token
          }
        })
        $toast.success(`Success remove song`, {
          autoClose: 500,
          position: 'top-right',
        });
        this.getLikeSong()
      } catch (error) {
        console.log(error);
        $toast.warning(`${error.response.data.message}`, {
          autoClose: 500,
          position: 'top-right',
        });
      }
    },
    async googleLogin(response) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}users/sign-google`,
          method: 'POST',
          headers: {
            googletoken: response.credential,
          },
        });
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("username", data.username)
        localStorage.setItem("email", data.email)
        localStorage.setItem("id", data.id)
        this.isSubscriber = data.isSubscribe
        this.buttonLogin = false
        $toast.success(`Welcome ${data.username}`, {
          autoClose: 500,
          position: 'top-right',
        });
        this.getAlbum()
        this.router.push({ name: 'dashboard' })
      } catch (error) {
        console.log(error);
        console.log(response.credential);
      }
    },
  }
})
