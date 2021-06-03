<template>
  <div>
    <nav-bar-app/>
    <edit-job-app/>
  </div>
</template>

<script>
import NavBar from '../../components/HomePage/NavBar.vue';
import Editjob from '../../components/Recuiter/Editjob.vue';


export default {
  name: "EditJob",
  data () {
      return {
        post_id: this.$route.params.post_id,
      }
  },
  components: {
    "nav-bar-app":NavBar,
    "edit-job-app": Editjob
   }
};
</script>

