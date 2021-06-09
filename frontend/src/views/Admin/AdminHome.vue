<template>
  <div class="applicantProfile">
    <nav-bar-app />
    <v-container>
      <v-row no-gutters>
        <v-flex md3 lg1>
          <side-bar-app />
        </v-flex>
        <v-flex md9 lg11>
          <PieChart />
        </v-flex>
      </v-row>
    </v-container>
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



<style scoped>
.applicantProfile {
  background-color: rgba(0, 0, 255, 0.6);
  height: 100%;
}
</style>
