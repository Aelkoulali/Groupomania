<template>
  <div class="container">
    <Header />
    <main>
      <p class="row d-flex justify-content-center text-center">
        Bienvenue sur votre réseau social<br> 
        Groupomania
      </p>

      <div class="row d-flex justify-content-center">
        <form class="connexion jumbotron">
          <div class="form-group">
            <label for="email">Adresse E-mail</label>
            <input
              v-model="dataLogin.email"
              type="email"
              class="form-control"
              id="email"
              aria-describedby="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              v-model="dataLogin.password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>

          <button
            @keydown.enter="login()"
            @click="login()"
            type="button"
            class="col btn btn-success"
            :disable="checkDataLogin()"
          >
            Connexion
          </button>
          <p id="loginError" class="mt-2 text-danger text-center"></p>
          <div class="text-center mb-2">Pas encore inscrit ?</div>
          <router-link class="col btn btn-primary" to="/Signup"
            >S'inscrire
          </router-link>
        </form>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/HeaderPage.vue";
import Footer from "../components/FooterPage.vue";
import axios from "axios";

export default {
  name: "LoginPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    checkDataLogin: function () {
      if (!this.dataLogin.email || !this.dataLogin.password) {
        return true;
      } else if (this.dataLogin.email && this.dataLogin.password) {
        return false;
      }
    },

    login: function () {
      axios
        .post("http://localhost:3000/api/auth/login", this.dataLogin)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response));
          console.log(response);
          this.$router.push("/Feed");
        })
        .catch((error) => {
          console.log(error);
          const errorMsg = document.getElementById("loginError");
          errorMsg.textContent =
            "Votre email ou votre mot de passe est incorrect";
        });
    },
  },
};
</script>

<style scoped>
main {
  margin-top: 10px;
}

.connexion {
  width: 50%;
}
.btn-success,
.btn-primary {
  display: block;
  margin: auto;
  width: 100%;
  margin: 0;
  
}

.jumbotron {
  border-radius: 25px;
}

.row  {
  font-weight: bold;
}
main {
  background-image: url('/public/background.jpg');
  border-radius: 25px;
}

@media screen and (max-width: 768px) {
  p.welcome {
    margin-left: 2px;
  }
  .nav {
    margin-left: -30px;
    margin-right: -30px;
  }
  .connexion {
    width: 100%;
  }
  .btn-success,
  .btn-primary {
    width: 100%;
  }
  main {
    background-image: none;
  }
}

</style>
