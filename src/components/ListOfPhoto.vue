<template>
  <v-container>
    <h1>Photos list</h1>
    <br />
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
  props: {
    method: String,
    extras: String,
    idName: String,
    objectId: String,
    objectName: String,
  },
  data: () => ({
    photos: {},
    isFetched: false,
    show: false,
    page: 1,
    more: false,
    loading: false,
  }),
  created() {
    this.$http
      .get(
        `https://api.flickr.com/services/rest/?method=${this.method}&api_key=${this.$apiKey}&${this.idName}=${this.objectId}&per_page=100${this.extras}&format=json&nojsoncallback=1`
      )
      .then((result) => {
        this.photos = result.data[this.objectName];
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
          `https://api.flickr.com/services/rest/?method=${this.method}&api_key=${this.$apiKey}&${this.idName}=${this.objectId}&per_page=100&page=${this.page}${this.extras}&format=json&nojsoncallback=1`
        )
        .then((result) => {
          this.photos.photo = this.photos.photo.concat(
            result.data[this.objectName].photo
          );
          this.photos.page = result.data[this.objectName].page;
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
  name: "ListOfPhoto",
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
