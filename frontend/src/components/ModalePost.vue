<template>
  <div class="bloc-modale" v-if="revelePost">
    <div class="overlay" v-on:click="toggleModalePost"></div>

    <div class="modale card">
      <div v-on:click="toggleModalePost" class="btn-modale btn btn-danger">
        X
      </div>
      <h2 class="text-center">Modification de votre publication</h2>
      <div class="d-flex">
        <p class="mr-5">Texte d'origine :</p>
        <p v-if="post.content">{{ post.content }}</p>
        <p v-else>Votre publication ne contenait pas de texte</p>
      </div>
      <div class="form-group">
        <label for="content"></label>
        <textarea
          rows="5"
          class="form-control"
          v-model="postModified.content"
        ></textarea>
      </div>
      <div class="d-flex flex-row align-items-center mb-3">
        <p class="mr-5">Image d'origine :</p>
        <img
          class="preview"
          v-if="post.image != null"
          :src="require(`../../../backend/images/posts/${post.image}`)"
        />
        <p v-else>Votre publication ne contenait pas d'image</p>
      </div>
      <div class="form-control">
        <label for="image"></label>
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          class="form-class"
          @change="onFileSelected"
        />
      </div>
      <div class="submit_new_post d-flex justify-content-end mt-2">
        <button
          class="btn btn-info"
          @click="editPost(post.id)"
          v-on:click="toggleModalePost"
        >
          <fa icon="paper-plane" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModalePost",
  props: ["revelePost", "toggleModalePost", "post"],
  data() {
    return {
      userData: { data: {} },
      postData: { data: {} },
      allPosts: [],
      postModified: {},
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
            console.log(response);
          } else {
            console.log("Il n'y a pas encore de publication.");
          }
        })
        .catch((error) =>
          console.log(error + "Echec lors de la récupération des publications.")
        );
    },
    createUserData() {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (user) {
        try {
          this.userData = JSON.parse(user);
          this.userData.token = token;
        } catch (e) {
          localStorage.removeItem("user");
          console.log("Données corrompues");
        }
      }
    },
    onFileSelected(event) {
      console.log(event);
      this.postModified.image =
        event.target.files[0] || event.dataTransfer.files;
      console.log(this.postModified.image);
    },
    editPost(postId) {
      console.log(postId);
      let formData = new FormData();
      if (this.postModified.content) {
        formData.append("content", this.postModified.content);
      }
      if (this.postModified.image) {
        formData.append("image", this.postModified.image);
      }
      console.log("test", formData.get("content"));
      console.log("test", formData.get("image"));
      axios
        .put("post/" + postId, formData, {
          headers: {
            authorization: `Bearer: ${this.token}`,
          },
        })
        .then(() => {
          this.postModified = "";
          this.getAllPosts();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(51, 51, 51, 0.5);

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  width: 60%;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}

.preview{
  width: 15%;
}
.btn-info{
  background-color: #034E6F;
}
</style>
