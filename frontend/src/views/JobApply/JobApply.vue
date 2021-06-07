<template>
  <div>
    <nav-bar-app/>
    <job-content-app :job_id="id"/>
  </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue';
import JobApplyContent from '../../components/JobApply/JobApplyContent.vue'
export default {
  name: "JobApply",
  data () {
      return {
          id: this.$route.params.id,
      }
  },
  components: {
    "nav-bar-app":NavBar,
    "job-content-app": JobApplyContent  
  },
};
</script>

