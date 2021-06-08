<template>
  <div>
    <nav-bar-app />
    <edit-job-app :job_id="job_id"/>
  </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue';
import Editjob from '../../components/Recuiter/Editjob.vue';


export default {
  name: "EditJob",
  data () {
      return {
        job_id: this.$route.params.job_id,
      }
  },
  components: {
    "nav-bar-app":NavBar,
    "edit-job-app": Editjob
   }
};
</script>

