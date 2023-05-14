import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FormPlaylist from '../components/FormPlaylist.vue'
import Search from '../components/Search.vue'
import Library from '../components/Library.vue'
import CardAlbum from '../components/CardAlbum.vue'
import Playlist from '../components/Playlist.vue'
import Profil from '../components/ProfilDetail.vue'
import AlbumDetail from '../components/AlbumDetail.vue'
import ArtistDetail from '../components/ArtistDetail.vue'
import LikedSong from '../components/LikedSong.vue'
import GoogleView from '../views/GoogleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: CardAlbum
        },
        {
          path: '/addplaylist',
          name: 'add',
          component: FormPlaylist
        },
        {
          path: '/search',
          name: 'song',
          component: Search
        },
        {
          path: '/library',
          name: 'library',
          component: Library
        },
        {
          path: '/myplaylist',
          name: 'myplaylist',
          component: Playlist
        },
        {
          path: '/profil',
          name: 'profil',
          component: Profil
        },
        {
          path: '/album-detail/:id',
          name: 'albumDetail',
          component: AlbumDetail
        },
        {
          path: '/artist-detail/:id',
          name: 'artistDetail',
          component: ArtistDetail
        },
        {
          path: '/liked-song',
          name: 'likeSong',
          component: LikedSong
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/google-sign',
      name: 'google',
      component: GoogleView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == 'login' && localStorage.access_token) {
    next({ name: 'home' })
  } else if (to.name == 'add' && !localStorage.access_token) {
    next({ name: 'home' })
  } else {
    next()
  }
})
export default router
