<template>
  <div class="container">
    <HeaderConnect />
    <Post />
    <Footer />
  </div>
</template>

<script>
import Post from "../components/PostPage.vue";
import HeaderConnect from "../components/HeaderConnect.vue";
import Footer from "../components/FooterPage.vue";

export default {
  name: "FeedPage",
  components: {
    Post,
    HeaderConnect,
    Footer,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped></style>
