<template>
  <v-container v-if="isFetched">
    <v-row style="display: grid" align="center" justify="center">
      <v-img
        :src="photo.size[photo.size.length - size].source"
        :width="photo.size[photo.size.length - widthHeight].width"
        :height="photo.size[photo.size.length - widthHeight].height"
      />
    </v-row>
    <v-row align="center" justify="center">aaaaaaaaaaaaaaaaaaaaaaaaaaaa</v-row>
    <v-row align="center" justify="center">
      <v-btn text color="accent" @click="size = 1; widthHeight = 4">Original resolution</v-btn>
      <v-btn text color="accent" @click="goBack()">Go back</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    photo: {},
    size: 4,
    widthHeight: 4,
    isFetched: false,
  }),
  computed: {
    photoId() {
      return this.$route.params.id;
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  created() {
    this.$http
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${this.$apiKey}&photo_id=${this.photoId}&format=json&nojsoncallback=1`
      )
      .then((result) => {
        this.photo = result.data.sizes;
        this.isFetched = true;
        console.log(this.photo);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
