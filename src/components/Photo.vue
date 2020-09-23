<template>
  <a
    v-if="serverId != 0"
    @click="$router.push(`/photo/${photoId}`)"
    :style="`--w: ${width}; --h: ${height}; position: relative;`"
    ondragstart="return false;"
  >
    <img
      height="249"
      :src="`https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_z.jpg`"
      loading="lazy"
    />
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
  object-fit: cover;
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
