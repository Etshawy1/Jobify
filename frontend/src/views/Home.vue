<template>
  <div>
    <nav-bar-app/>
    <new-feeds-app/>
  </div>
</template>
<script>
import NavBar from '../components/HomePage/NavBar.vue';
import NewFeeds from '../components/HomePage/NewFeeds.vue';

export default {
  name: "Home",
    components: {
      "nav-bar-app":NavBar,
      "new-feeds-app": NewFeeds        
  },
};
</script>

