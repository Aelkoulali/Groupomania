<template>
  <div class="container">
    <nav class="d-flex flex-row justify-content-between align-items-center">
      <div class="logo_brand d-flex flex-row">
        <img
          class="logo_navbar"
          src="../assets/logo.png"
          alt="logo Groupomania"
        />
        <h1>Groupomania</h1>
      </div>
      <div>
        <ul class="d-flex flex-row">
          <li>
            <router-link to="/feed"
              ><fa
                icon="house"
                aria-label="Fil d'actualité"
                title="Fil d'actualité"
            /></router-link>
          </li>
          <li>
            <router-link to="/profile"
              ><fa icon="user" aria-label="Mon profil" title="Mon profil"
            /></router-link>
          </li>
          <li>
            <button class="deconnexion" @click="logout()">
              <fa
                icon="right-from-bracket"
                aria-label="Me déconnecter"
                title="Me déconnecter"
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "HeaderConnect",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.logo_navbar {
  width: 50px;
}

.logo_brand {
  margin-right: 8rem;
}

h1 {
  color: #034e6f;
  font-size: 25px;
  padding-top: 10px;
  
}

nav {
  height: 50px;
  margin-bottom: 10px;
  
}

a {
  color: #034e6f;
  font-size: larger;
}

ul {
  list-style: none;
  margin-top: 15px;
}

li {
  margin-left: 40px;
}

.deconnexion {
  border: none;
  background-color: white;
  color: red;
  font-size: larger;
}

@media screen and (max-width: 768px) {
  h1 {
    display: none;
  }
  ul {
    margin-left: -86px;
  }
}
</style>
