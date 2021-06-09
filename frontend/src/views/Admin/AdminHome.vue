<template>
  <div>
    <nav-bar-app />
    <side-bar-app />
    <div>
      <PieChart />
    </div>
  </div>
</template>
<script>
import SideBar from "../../components/Admin/sidebar.vue";
import NavBar from "../../components/Admin/navbar.vue";
import PieChart from "../../components/Admin/PieChart.vue";
export default {
  name: "Home",
  components: {
    "nav-bar-app": NavBar,
    "side-bar-app": SideBar,
    PieChart,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-size: 1rem;
  font-family: Tahoma;
  background-color: #333;
  color: #fefefe;
}
#app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
}
</style>



