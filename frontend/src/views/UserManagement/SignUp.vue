<template>
  <div class="signup">
    <sign-up-form />
  </div>
</template>

<script>
import SignUpForm from "../../components/UserManagement/SignUpFrom";

export default {
  components: {
    SignUpForm,
  },
};
</script>

<style>
.signup {
  background: #eee;
}
</style>