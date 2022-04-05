<template>
  <div class="bloc-modale" v-if="reveleComment">
    <div class="overlay" v-on:click="toggleModaleComment"></div>

    <div class="modale card">
      <div v-on:click="toggleModaleComment" class="btn-modale btn btn-danger">
        X
      </div>
      <h2 class="text-center">Modification de votre commentaire</h2>
      <div class="d-flex">
        <p class="mr-5">Texte d'origine :</p>
        <p v-if="comment.content">{{ comment.content }}</p>
        <p v-else>Votre commentaire ne contenait pas de texte</p>
      </div>
      <div class="form-group">
        <label for="content"></label>
        <textarea
          rows="5"
          class="form-control"
          v-model="commentModified.content"
        ></textarea>
      </div>
      <div class="d-flex flex-row align-items-center mb-3">
        <p class="mr-5">Image d'origine :</p>
        <img
          class="preview"
          v-if="comment.image != null"
          :src="require(`../../../backend/images/comments/${comment.image}`)"
        />
        <p v-else>Votre commentaire ne contenait pas d'image</p>
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
      <div class="submit_new_comment d-flex justify-content-end mt-2">
        <button
          class="btn btn-info"
          @click="editComment(comment.id)"
          v-on:click="toggleModaleComment"
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
  name: "ModaleComment",
  props: ["reveleComment", "toggleModaleComment", "post", "comment"],
  data() {
    return {
      userData: { data: {} },
      postData: { data: {} },
      commentData: { data: {} },
      commentModified: {},
      allPosts: [],
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
      this.commentModified.image =
        event.target.files[0] || event.dataTransfer.files;
      console.log(this.commentModified.image);
    },

    editComment(commentId) {
      console.log(commentId);
      let formData = new FormData();
      if (this.commentModified.content) {
        formData.append("content", this.commentModified.content);
      }
      if (this.commentModified.image) {
        formData.append("image", this.commentModified.image);
      }
      console.log("test", formData.get("content"));
      console.log("test", formData.get("image"));
      axios
        .put("http://localhost:3000/api/comment/" + commentId, formData, {
          headers: {
            authorization: `Bearer: ${this.userData.data.token}`,
          },
        })
        .then(() => {
          this.commentModified = "";
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

.preview {
  width: 15%;
}

.btn-info {
  background-color: #034e6f;
  border-color: #034e6f;
}
</style>
