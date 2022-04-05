import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/LoginPage.vue"
import Signup from "../views/SignupPage.vue"
import Feed from "../views/FeedPage.vue"
import Profile from "../views/ProfilePage.vue"



const routes = [
   {
    path: '/',
    name: 'LoginPage',
component: Login
  }, 
  
  {
    path: '/signup',
    name: 'SignupPage',
    component: Signup
  },

  {
    path: "/feed",
    name: "FeedPage",
    component: Feed,
  },

  {
    path: "/profile",
    name: "ProfilePage",
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
