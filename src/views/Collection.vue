<template>
  <v-container>
    <v-btn text color="accent" @click="goBack()">Go back</v-btn>
    <ListOfPhoto
      method="flickr.photosets.getPhotos"
      extras="&extras=url_n,o_dims"
      idName="photoset_id"
      :objectId="this.photosetId"
      objectName="photoset"
    />
  </v-container>
</template>

<script>
import ListOfPhoto from "@/components/ListOfPhoto";

export default {
  data: () => ({}),
  name: "Collection",
  components: {
    ListOfPhoto,
  },
  computed: {
    photosetId() {
      return this.$route.params.id;
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  created() {
    document.title = "ArtFolio - Collection";
  },
};
</script>
