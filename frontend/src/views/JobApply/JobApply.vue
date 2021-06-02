<template>
  <div>
    <nav-bar-app/>
    <job-content-app/>
  </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue';
import JobApplyContent from '../../components/JobApply/JobApplyContent.vue'
export default {
  name: "JobApply",
    components: {
      "nav-bar-app":NavBar,
      "job-content-app": JobApplyContent  
    },
};
</script>

