<template>
    <div>
        <nav-bar-app/>
        <review-applicants-app :job_id="job_id"/>
    </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue';
import ReviewApps from '../../components/Recuiter/Review.vue';


export default {
  name: "JobApply",
  data () {
      return {
          job_id: this.$route.params.job_id,
      }
  },
  components: {
    "nav-bar-app": NavBar,
    "review-applicants-app": ReviewApps
   },
};
</script>
