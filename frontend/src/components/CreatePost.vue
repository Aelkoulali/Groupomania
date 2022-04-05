<template>
  <div class="createPost jumbotron pb-0">
    <form>
      <h2>Bienvenue {{ userData.data.firstName }} </h2>
      <div class="form-group">
        <label for="content" aria-label="Texte du post"></label>
        <textarea
          id="content"
          rows="5"
          v-model="post.content"
          class="form-control"
          placeholder="Quoi de neuf ?"
        />
      </div>

      <div class="form-group">
        <label for="image" aria-label="Ajouter une image"></label>
        <input
          name="image"
          type="file"
          class="form-control"
          id="image"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          @change="onFileSelected"
        />
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-info"
          type="submit"
          aria-label="Publier post"
          title="Publier post"
          @click.prevent="createPost"
        >
          <fa icon="paper-plane" />
        </button>
      </div>
      <span id="msgError" class="mx-3 text-danger">{{ msgError }}</span>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreatePost",
  data() {
    return {
      userData: { data: {} },
      post: {
        content: "",
        image: "",
      },
      msgError: "",
      msgWelcome: "",
    };
  },

  mounted() {
    this.createUserData(), this.getAllPosts();
  },

  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/post/")
        .then((response) => {
          if (response.data.length > 0) {
            this.allPosts = response.data;
            console.log(this.allPosts);
          } else {
            console.log("Il n'y a pas encore de publication.");
          }
        })
        .catch((error) =>
          console.log(error + "Echec lors de la récupération des publications.")
        );
    },
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
      this.post.image = event.target.files[0] || event.dataTransfer.files;
      console.log(this.post.image);
    },
    createPost() {
      console.log(this.post);
      const fd = new FormData();
      fd.append("content", this.post.content);
      fd.append("image", this.post.image);
      console.log("test", fd.get("content"));
      console.log("test", fd.get("image"));
      if (
        (fd.get("content") == null && fd.get("image") == null) ||
        (fd.get("content") == "" && fd.get("image") == "")
      ) {
        let msgReturn = document.getElementById("msgError");
        msgReturn.classList.add("text-danger");
        this.msgError = "Rien à publier";
      } else {
        axios
          .post("http://localhost:3000/api/post/", fd, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.post.content = "";
            this.post.image = "";
            location.reload();
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
<style scoped>
.btn-info {
  background-color: #034e6f;
}
</style>
