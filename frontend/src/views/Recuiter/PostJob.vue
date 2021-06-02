<template>
  <div>
    <nav-bar-app/>
    <post-job-app/>
  </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue';
import Postjob from '../../components/Recuiter/Postjob.vue'

export default {
  name: "JobPost",
  data () {
      return {}
  },
  components: {
    "nav-bar-app":NavBar,
    "post-job-app": Postjob
   }
};
</script>

