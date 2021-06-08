<template>
  <div>
    <nav-bar-app />
    <side-bar-app />
  </div>
</template>
<script>
import SideBar from "../../components/Admin/sidebar.vue";
import NavBar from "../../components/Admin/navbar.vue";
export default {
  name: "Home",
  components: {
    "nav-bar-app": NavBar,
    "side-bar-app": SideBar,
  },
};
</script>
