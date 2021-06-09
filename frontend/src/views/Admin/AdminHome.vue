<template>
  <div>
    <nav-bar-app />
    <side-bar-app />
    <h2 style="margin:7vw">
      replace this text with the charts in this page
    </h2>
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
