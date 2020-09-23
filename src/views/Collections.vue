<template>
  <v-container v-if="isFetched">
    <v-card
      v-for="collection in collections.photoset"
      :key="collection.id"
      :to="`/collection/${collection.id}`"
      class="mx-auto"
      style="margin-bottom: 10px;"
    >
      <v-img
        class="white--text align-end"
        height="400px"
        :src="collection.primary_photo_extras[size]"
      >
        <v-card-title>
          <span v-html="collection.title._content"></span>
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">{{ collection.photos }} photos</v-card-subtitle>

      <v-card-text class="text--primary">
        <span v-html="collection.description._content"></span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    collections: {},
    isFetched: false,
    size: "url_k",
  }),
  created() {
    document.title = "ArtFolio - Collections";
    this.$http
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${this.$apiKey}&user_id=${this.$userId}&primary_photo_extras=url_k,url_o&format=json&nojsoncallback=1`
      )
      .then((result) => {
        this.collections = result.data.photosets;
        this.isFetched = true;
        console.log(this.collections);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>