<template>
  <div>
    <nav-bar-app />
    <crud-table />
  </div>
</template>
<script>
import NavBar from "../../components/Admin/sidebar.vue";
import Crud from "../../components/Admin/CrudTable.vue";
export default {
  name: "Skills",
  components: {
    "nav-bar-app": NavBar,
    "crud-table": Crud,
  },
};
</script>
