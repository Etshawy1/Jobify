<template>
  <div>
    <nav-bar-app/>
    <jobs-history-app :profile_id="profile_id"/>
  </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue';
import JobsHistory from '../../components/Recuiter/JobsHistory.vue'

export default {
  name: "JobApply",
  data () {
      return {
          profile_id: this.$route.params.profile_id,
      }
  },
  components: {
    "nav-bar-app":NavBar,
    "jobs-history-app": JobsHistory  
   },
};
</script>

