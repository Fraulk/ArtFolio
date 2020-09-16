<template>
  <v-container>
    <h1>Photos list</h1>
    <br />
    <!-- <v-row :v-if="isFetched" class="mb-6" align="center" justify="center">
      <v-col
        v-for="photo in photos.photo"
        :key="photo.id"
        md="auto"
        justify="center"
        align="center"
      >
        <Photo
          :farmId="photo.farm"
          :serverId="photo.server"
          :photoId="photo.id"
          :secret="photo.secret"
          :title="photo.title"
          @fullscreen="fullscreen()"
        />
      </v-col>
    </v-row>-->
    <div class="jg">
      <Photo
        v-for="photo in photos.photo"
        :key="photo.id"
        :farmId="photo.farm"
        :serverId="photo.server"
        :photoId="photo.id"
        :secret="photo.secret"
        :title="photo.title"
        :width="photo.width_n"
        :height="photo.height_n"
      />
    </div>
    <div v-if="more" class="loadMoreBtn">
      <v-btn @click="loadMorePhotos()" :loading="loading" x-large color="accent">Load more photos</v-btn>
    </div>
  </v-container>
</template>

<script>
import Photo from "@/components/Photo";

export default {
  data: () => ({
    photos: {},
    isFetched: false,
    show: false,
    page: 1,
    more: false,
    loading: false,
  }),
  created() {
    document.title = "ArtFolio - Photos";
    this.$http
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${this.$apiKey}&user_id=${this.$userId}&extras=url_n,o_dims&format=json&nojsoncallback=1`
      )
      .then((result) => {
        this.photos = result.data.photos;
        this.isFetched = true;
        if (this.photos.page < this.photos.pages) this.more = true;
        console.log(this.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    loadMorePhotos() {
      if (this.photos.page >= this.photos.pages) return;
      this.loading = true;
      this.page += 1;
      this.$http
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${this.$apiKey}&user_id=${this.$userId}&page=${this.page}&extras=url_n,o_dims&format=json&nojsoncallback=1`
        )
        .then((result) => {
          this.photos.photo = this.photos.photo.concat(
            result.data.photos.photo
          );
          this.photos.page = result.data.photos.page;
          if (this.photos.page >= this.photos.pages) this.more = false;
          this.isFetched = true;
          this.loading = false;
          console.log(this.photos);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  name: "Photos",
  components: {
    Photo,
  },
};
</script>

<style scoped>
.jg {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.jg > a,
.jg::after {
  --ratio: calc(var(--w) / var(--h));
  --row-height: 15rem;
  flex-basis: calc(var(--ratio) * var(--row-height));
}

.jg > a {
  margin: 0.25rem;
  flex-grow: calc(var(--ratio) * 100);
}

.jg::after {
  --w: 2;
  --h: 1;
  content: "";
  flex-grow: 1000000;
}

.loadMoreBtn {
  display: flex;
  justify-content: center;
  margin: 50px 0;
}
</style>
