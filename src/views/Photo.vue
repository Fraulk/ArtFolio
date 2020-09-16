<template>
  <v-container v-if="isFetched">
    <v-row style="display: grid" align="center" justify="center">
      <v-img
        v-if="photo.size.length <= 12"
        :src="photo.size[photo.size.length - size].source"
        :width="photo.size[photo.size.length - widthHeight].width"
        :height="photo.size[photo.size.length - widthHeight].height"
      />
      <v-img
        v-else
        :src="(size == 1) ? photo.size[photo.size.length - 1].source : photo.size[10].source"
        :width="photo.size[10].width"
        :height="photo.size[10].height"
      />
    </v-row>
    <v-row align="center" justify="center">
      <h2>{{ photoInfo.title._content }}</h2>
    </v-row>
    <v-row align="center" justify="center">
      <span v-html="photoInfo.description._content.replace(/\n/g, '<br />')"></span>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
        text
        color="accent"
        :href="photoInfo.urls.url[0]._content"
        target="_blank"
      >See on flickr</v-btn>
    </v-row>
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
    photoInfo: {},
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
    getPhotoInfo() {
      this.$http
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${this.$apiKey}&photo_id=${this.photoId}&format=json&nojsoncallback=1`
        )
        .then((result) => {
          this.photoInfo = result.data.photo;
          this.isFetched = true;
          console.log(this.photoInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  created() {
    document.title = "ArtFolio - Photo";
    this.$http
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${this.$apiKey}&photo_id=${this.photoId}&format=json&nojsoncallback=1`
      )
      .then((result) => {
        this.photo = result.data.sizes;
        this.getPhotoInfo();
        console.log(this.photo);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
