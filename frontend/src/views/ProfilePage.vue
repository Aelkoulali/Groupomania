<template>
  <div class="container">
    <HeaderConnect />
    <!-- Display All Personnal User Data -->
    <div class="jumbotron">
      <h2 class="text-center mb-5"> 
        {{ userData.data.lastName }} {{ userData.data.firstName }}
      </h2>
      <div class="profile justify-content-between">
        <div class="modif_avatar_image d-flex flex-column">
          <img
            class="user_avatar mr-2" alt="user profile picture"
            v-if="userData.data.avatar != null"
            :src="
              require(`../../../backend/images/users/${userData.data.avatar}`)
            "
           />
          <img class="user_avatar mr-2" v-else src="../assets/avatar.png "/>
          <div class="btn_modify_avatar d-flex justify-content-center">
            <button class="btn btn-info mt-2" @click="avatarForm = !avatarForm">
              Modifier votre avatar
            </button>
          </div>
        </div>
        <div class="infos_perso text-center">
          <ul>
            
            <li>{{ userData.data.email }}</li>
            <li>
              Profil crée le:
              {{
                userData.data.createdAt
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")
              }}
            </li>
              <div class="btn_modify_infos d-flex justify-content-center">
              <button class="btn btn-info mt-3" @click="infosForm = !infosForm">
                Modifier vos données personnelles
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div class="btn_dataAccount">
      <button
        class="displayPasswordForm btn btn-info mr-3 mb-3"
        @click="passwordForm = !passwordForm"
      >
        Modifier votre mot de passe
      </button>

      <button
        class="deleteAccount btn btn-danger mb-3"
        @click="deleteAccount()"
      >
        Supprimer votre compte
      </button>
    </div>
    <!-- Modify Password Form -->

    <div v-show="avatarForm" class="passwordForm jumbotron">
      <form>
        <label for="avatar" class="input-file"></label>
        <input
          id="avatar"
          class="input-file"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          @change="onFileSelected"
        />
        <button 
          class="btn btn-info modif_avatar_btn"
          @click.prevent="modifyAvatar()"
        >
          Valider
        </button>
      </form>
    </div>

    <div v-show="passwordForm" class="passwordForm jumbotron">
      <form>
        <div class="form-group mb-0">
          <label for="oldPassword">Mot de passe actuel :</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            class="form-control"
            minlength="8"
            v-model="oldPassword"
            required
          />
          <p id="passwordError"></p>
        </div>
        <div class="form-group mb-0">
          <label for="newPassword">Nouveau mot de passe :</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            class="form-control"
            minlength="8"
            v-model="newPassword"
            required
            v-on:input="checkDataPassword()"
          />
          <p v-if="newPassword == oldPassword" class="errorMsg">
            Votre nouveau mot de passe ne peut pas être identique à l'ancien !
          </p>
          <p id="newPasswordError"></p>
        </div>
        <div class="form-group mb-0">
          <label for="newPasswordConfirm">
            Confirmer votre nouveau mot de passe :</label
          >
          <input
            type="password"
            name="newPasswordConfirm"
            id="newPasswordConfirm"
            class="form-control"
            minlength="8"
            v-model="newPasswordConfirm"
            required
            v-on:input="checkDataPassword()"
          />
          <p v-if="newPasswordConfirm != newPassword" class="errorMsg">
            Merci d'entrer un mot de passe identique !
          </p>
        </div>
        <button class="btn btn-info" @click.prevent="changePassword()">
          Valider
        </button>
      </form>
    </div>
    <!-- Modify Personnal Data Form -->
    <div v-show="infosForm" class="infosForm jumbotron">
      <form>
        <div class="form-group mb-0">
          <label for="lastName">Nom :</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            class="form-control"
            v-model="userModified.lastName"
          />
        </div>
        <div class="form-group mb-0">
          <label for="firstName">Prénom :</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            class="form-control"
            v-model="userModified.firstName"
          />
        </div>
        <div class="form-group mb-0">
          <label for="email"> email :</label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            pattern=".+@groupomania\.com"
            v-model="userModified.email"
          />
        </div>
        <button
          class="btn btn-info"
          @click="modifyInfos()"
          :disabled="checkDataInfos()"
        >
          Valider
        </button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import HeaderConnect from "../components/HeaderConnect.vue";
import Footer from "../components/FooterPage.vue";
export default {
  name: "ProfilePage",
  components: {
    HeaderConnect,
    Footer,
  },
  data() {
    return {
      avatarForm: false,
      infosForm: false,
      userModified: {
        lastName: "",
        firstName: "",
        email: "",
        },
      avatarModified: "",
      passwordForm: false,
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      userData: {
        data: {
          createdAt: "",
        },
      },
      user: {
        userId: "",
      },
      userInfos: [],
    };
  },
  mounted() {
    this.createUserData();
    console.log(this.userData);
  },
  created() {
    this.createUserData();
  },
  methods: {
    createUserData() {
      if (localStorage.getItem("user")) {
        try {
          this.userData = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          localStorage.removeItem("user");
          console.log("Données corrompues");
        }
      }
    },
    onFileSelected(event) {
      console.log(event);
      this.avatarModified = event.target.files[0] || event.dataTransfer.files;
      console.log(this.avatarModified);
    },
    modifyAvatar() {
      const fd = new FormData();
      fd.append("avatar", this.avatarModified);
      console.log("test", fd.get("avatar"));
      axios
        .put(
          "http://localhost:3000/api/auth/update/" + this.userData.data.userId,
          fd,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.avatarModified = "";
          this.createUserData();
        })
        .catch((error) => console.log(error));
    },
    checkDataPassword() {
      const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g;
      if (this.newPassword !== null && regexPassword.test(this.newPassword))
        return true;
      else {
        const errorMsg = document.getElementById("newPasswordError");
        errorMsg.textContent =
          "Le mot de passe ne doit pas contenir d'espace et doit avoir une longueur entre 8 et 20 caractères contenant au minimum 1 chiffre, 1 minuscule et 1 majuscule !";
      }
    },
    changePassword() {
      if (
        this.oldPassword != this.newPassword &&
        this.newPassword == this.newPasswordConfirm &&
        this.oldPassword != "" &&
        this.newPassword != "" &&
        this.newPasswordConfirm != ""
      ) {
        axios
          .put(
            "http://localhost:3000/api/auth/modifyPassword/" +
              this.userData.data.userId,
            { oldPassword: this.oldPassword, password: this.newPassword },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            console.log("password change", response);
            alert("Mot de passe modifié");
            this.oldPassword = "";
            this.newPassword = "";
            this.newPasswordConfirm = "";
            this.createUserData();
          })
          .catch((err) => {
            console.log(err);
            const errorMsg = document.getElementById("passwordError");
            errorMsg.textContent = "Votre mot de passe est incorrect";
          });
      }
    },
    checkDataInfos() {
      const regexEmail = /[a-z0-9]+@groupomania.com/g;
      const regexAlpha =
        /^[a-zA-Zçñàéèêëïîôüù][a-zA-Zçñàéèêëïîôüù\- '\\.]{2,25}$/g;
      if (
        regexEmail.test(this.userModified.email) &&
        regexAlpha.test(this.userModified.lastName) &&
        regexAlpha.test(this.userModified.firstName)
      )
        return true;
    },
    modifyInfos() {
      let formData = new FormData();
      if (
        this.userModified.lastName ||
        this.userModified.firstName ||
        this.userModified.email 
      ) {
        formData.append("lastName", this.userModified.lastName);
        formData.append("firstName", this.userModified.firstName);
        formData.append("email", this.userModified.email);
        }
      axios
        .put(
          "http://localhost:3000/api/auth/update/" + this.userData.data.userId,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.userModified.lastName = "";
          this.userModified.firstName = "";
          this.userModified.email = "";
          alert("Profil modifié !");
        })
        .catch((error) => console.log(error));
    },
    deleteAccount() {
      if (window.confirm("Etes-vous sûr de vouloir supprimer votre compte ?")) {
        axios
          .delete(
            "http://localhost:3000/api/auth/" + this.userData.data.userId,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            localStorage.removeItem("user");
            this.$router.push("/signup");
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
#passwordError,
#newPasswordError {
  color: red;
}
button .btn-info {
  background: #0582ba;
  border-color: #034e6f;
}
.modif_avatar_image {
  position: relative;
}
.modif_avatar_image img {
  width: auto;
  object-fit: cover;
  height: 200px;
}
.profile {
  display: flex;
  flex-direction: row;
}
li {
  list-style-type: none;
}
.btn-info {
  background-color: #034e6f;
  border-color: #034e6f;
}
.btn_dataAccount {
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .profile {
    display: flex;
    flex-direction: column;
  }
  .btn_modify_avatar {
    margin-bottom: 20px;
  }
  ul {
    padding-inline-start: 0px;
  }
  .btn {
    font-size: smaller;
  }
}
</style>