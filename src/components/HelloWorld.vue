<template>
  <v-container style="height: 75vh">
    <v-row v-if="isFetched" justify="center" class="text-center">
      <v-col cols="12">
        <a :href="user.profileurl._content" ondragstart="return false;">
          <v-avatar size="150">
            <v-img
              :src="`http://farm${user.iconfarm}.staticflickr.com/${user.iconserver}/buddyicons/${user.nsid}_r.jpg`"
              class="my-3"
              contain
              style="border-radius: 100%"
              height="200"
            />
          </v-avatar>
        </a>
      </v-col>

      <v-col class="mb-4">
        <h1
          class="display-2 font-weight-bold mb-3"
        >Welcome to {{ user.username._content }}'s Artfolio</h1>

        <p v-html="user.description._content.replace(/\n/g, '<br />')"></p>

        <p
          class="subheading font-weight-regular"
        >ArtFolio is a vuejs website using Flickr API to fetch content from a user in particular</p>
        <br />
        <a href="#">Source code</a>
        <br />
        <br />
        <v-btn to="/photos" color="primary">Go to gallerie</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    user: {},
    isFetched: false,
  }),

  created() {
    this.$http
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${this.$apiKey}&user_id=${this.$userId}&format=json&nojsoncallback=1`
      )
      .then((result) => {
        this.user = result.data.person;
        this.isFetched = true;
        console.log(this.user);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
