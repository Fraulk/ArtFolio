<template>
  <!-- <v-scroll-y-transition mode="out-in">
    <div>
      <v-card>
        <v-responsive>
          <v-img
            max-height="500px"
            :src="`https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_n.jpg`"
            :lazy-src="`https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_q.jpg`"
            style="cursor: pointer"
            @click="$emit('fullscreen', true)"
            alt
            srcset
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title class="name">{{ title }}</v-card-title>
          <v-card-actions>
            <v-btn
              @click="$emit('fullscreen', true)"
              color="accent"
              small
              text
              title="Load in fullscreen"
            >fullscreen</v-btn>
            <v-btn color="accent" small text title="Load in original resolution">original res</v-btn>
          </v-card-actions>
        </v-responsive>
      </v-card>
    </div>
  </v-scroll-y-transition>-->
  <a href="#" :style="`--w: ${width}; --h: ${height}; position: relative;`">
    <img :src="`https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_z.jpg`" />
    <div class="onImgHover" :style="`height: 3rem;`">{{ title }}</div>
  </a>
</template>

<script>
export default {
  props: {
    farmId: Number,
    serverId: String || Number,
    photoId: String || Number,
    secret: String || Number,
    title: String,
    width: Number,
    height: Number,
  },
  name: "Photo",
};
</script>

<style scoped>
.jg > a > img {
  display: block;
  position: relative;
  width: 100%;
  opacity: 0;
  animation: fadeIn 1000ms forwards;
}

.onImgHover {
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: -moz-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  opacity: 0;
  z-index: 1;
  transform: translateY(-3rem);
  transition: 200ms;
}

a {
  text-decoration: none;
  color: #fff;
}

img:hover ~ .onImgHover,
.onImgHover:hover {
  opacity: 1;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
