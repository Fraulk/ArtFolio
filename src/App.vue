<template>
  <v-app>
    <v-app-bar app color="secondary" dark hide-on-scroll>
      <div class="d-flex align-center">
        <h1>ArtFolio</h1>
      </div>
      <template v-slot:extension>
        <v-tabs color="accent" align-with-title>
          <v-tab to="/">Welcome</v-tab>
          <v-tab to="/about">About</v-tab>
          <v-tab to="/photos">Photos</v-tab>
          <v-tab to="/collections">Collections</v-tab>
          <v-tab v-if="$route.name == 'Photo'" :to="$route.path">Photo</v-tab>
          <v-tab v-if="$route.name == 'Collection'" :to="$route.path">Collection</v-tab>
        </v-tabs>
      </template>

      <v-spacer></v-spacer>

      <!-- <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" color="accent">Light</v-btn> -->
    </v-app-bar>

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  mounted() {},
};
</script>

<style lang="scss">
html {
  font-family: Roboto, Arial, Helvetica, sans-serif;
}
</style>
