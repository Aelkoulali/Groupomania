<template>
  <div class="container">
    <Header />
    <main>
      <p class="welcome row d-flex justify-content-center text-center">
        Veuillez compléter le formulaire suivant
        
      </p>

      <div class="row d-flex justify-content-center">
        <div class="connexion jumbotron">
          <form>
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input
                v-model="dataSignup.lastName"
                type="text"
                class="form-control"
                id="lastName"
                placeholder="White"
                aria-describedby="lastName"
                required
                aria-required="true"
              />
            </div>
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input
                v-model="dataSignup.firstName"
                type="text"
                class="form-control"
                id="firstName"
                placeholder="Tom"
                required
                aria-describedby="firstName"
              />
            </div>
            <div class="form-group">
              <label for="email">Adresse e-mail</label>
              <input
                v-model="dataSignup.email"
                type="email"
                class="form-control"
                id="email"
                pattern=".+@groupomania\.com"
                placeholder="twhite@groupomania.com"
                aria-describedby="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input
                v-model="dataSignup.password"
                type="password"
                class="form-control"
                id="password"
                required
                minlength="8"
                placeholder="********"
              />
            </div>
            <div class="form-group">
              <label for="passwordConfirmation"
                >Validation</label
              >
              <input
                v-model="dataSignup.passwordConfirmation"
                type="password"
                class="form-control"
                id="passwordConfirmation"
                required
                minlength="8"
                placeholder="********"
              />
              <p
                v-if="dataSignup.password !== dataSignup.passwordConfirmation"
                class="errorMsg"
              >
                Confirmation
              </p>
            </div>

            <button
              @click.prevent="signup()"
              :disabled="checkDataSignup()"
              type="submit"
              class="col btn btn-success mt-5"
            >
              S'inscrire
            </button>
          </form>
          <div class="text-center mt-5 mb-2">Déjà inscrit ?</div>
          <router-link class="col btn btn-primary" to="/"
            >Se connecter
          </router-link>
        </div>
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
  name: "SignupPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      dataSignup: {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    checkDataSignup() {
      const regexEmail = /[a-z0-9]+@groupomania.com/g;
      const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g;
      const regexAlpha =
        /^[a-zA-Zçñàéèêëïîôüù][a-zA-Zçñàéèêëïîôüù\- '\\.]{2,25}$/g;
      if (
        (this.dataSignup.email !== null ||
          this.dataSignup.lastName !== null ||
          this.dataSignup.firstName !== null ||
          this.dataSignup.password !== null) &&
        regexPassword.test(this.dataSignup.password) &&
        regexEmail.test(this.dataSignup.email) &&
        regexAlpha.test(this.dataSignup.lastName) &&
        regexAlpha.test(this.dataSignup.firstName)
      )
        return true;
    },

    signup() {
      axios
        .post("http://localhost:3000/api/auth/signup", this.dataSignup)
        .then((response) => {
          console.log(response);
          alert("Inscription validée !")
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.connexion {
  width: 50%;
}
.errorMsg {
  color: black;
  margin-bottom: 0;
}

.jumbotron {
  border-radius: 25px;
}
.connexion.jumbotron {
  padding: 40px;

}
p.welcome {
  margin-bottom : 15px;
  margin-top: 15px;
}

main {
  background-image: url('/public/background.jpg');
  border-radius: 25px;
}
.row {
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .container {
    margin-left: 0px;
  }
  p.welcome {
    margin-left: 14px;
    margin-top: 10px;
  }
  .connexion {
  width: 100%;
}
  main {
  background-image: none;
 ;
}
}
</style>
