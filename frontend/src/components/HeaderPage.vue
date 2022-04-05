<template>
  <nav class="d-flex flex-row justify-content-around align-items-center">
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
        <li><router-link to="/"> Se connecter</router-link></li>
        <li class="signup">
          <router-link to="/Signup">S'inscrire</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderPage",
};
</script>

<style scoped>
a {
  color: black;
}

nav {
  background-color: rgb(162, 219, 241);
  height: 50px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}
.logo_navbar {
  width: 50px;
}

.logo_brand {
  margin-right: 8rem;
}

h1 {
  color: BLACK;
  font-size: 25px;
  font-weight: bold;
  padding-top: 10px;
}

ul {
  color: black;
  font-weight: bold;
  list-style: none;
  margin-top: 15px;
}

li {
  margin-left: 40px;
}
@media screen and (max-width: 768px) {
  h1 {
    display: none;
  }
  ul {
    margin-left: -86px;
  }
  li {
    margin-left: 0px;
  }
  .signup {
    margin-left: 20px;
  }
  nav {
    margin-left: -5px;
    margin-right: -30px;
  }
  p.welcome {
    margin-left: 2px;
  }
}
</style>
