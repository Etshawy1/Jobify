<template>
  <v-navigation-drawer
    expand-on-hover
    absolute
    dark
    hide-overlay
    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    permanent
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../../assets/admin.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link @click="$router.push('/admin')">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/skills')">
        <v-list-item-icon>
          <v-icon>mdi-diamond</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Skills</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/categories')">
        <v-list-item-icon>
          <v-icon>mdi-dots-grid</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Job Categories</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/languages')">
        <v-list-item-icon>
          <v-icon>mdi-translate</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Languages</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/job-titles')">
        <v-list-item-icon>
          <v-icon>mdi-card-account-details-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Job Title</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/recruiters')">
        <v-list-item-icon>
          <v-icon>mdi-check-decagram</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Recruiter Applications</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="logOut">
        <v-list-item-icon> <v-icon>mdi-export</v-icon> </v-list-item-icon>
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
};
</script>
