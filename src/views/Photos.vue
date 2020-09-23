<template>
  <ListOfPhoto
    method="flickr.people.getPublicPhotos"
    extras="&extras=url_n,o_dims"
    idName="user_id"
    :objectId="this.$userId"
    objectName="photos"
  />
</template>

<script>
import ListOfPhoto from "@/components/ListOfPhoto";

export default {
  data: () => ({}),
  name: "Photos",
  components: {
    ListOfPhoto,
  },
  created() {
    document.title = "ArtFolio - Photos";
  },
};
</script>
