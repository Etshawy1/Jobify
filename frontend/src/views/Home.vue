<template>
  <div>
    <nav-bar-app></nav-bar-app>
  </div>
</template>
<script>
import NavBar from '../components/HomePage/NavBar.vue';

export default {
  name: "Home",
    components: {
      "nav-bar-app":NavBar        
  },
};
</script>

