<template>
  <div>
    <nav-bar-app />
  </div>
</template>
<script>
import NavBar from '../../components/Admin/sidebar.vue'
export default {
  name: 'Home',
  components: {
    'nav-bar-app': NavBar,
  }
}
</script>
