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
      <v-list-item link @click="$router.push('/admin/skills')">
        <v-list-item-icon>
          <v-icon>mdi-diamond</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Skills</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/job-categories')">
        <v-list-item-icon>
          <v-icon>mdi-dots-grid</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Job Categories</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/languages')">
        <v-list-item-icon>
          <v-icon>mdi-alphabet-latin</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Languages</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/job-titles')">
        <v-list-item-icon>
          <v-icon>mdi-account-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Job Title</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon> <v-icon>mdi-export</v-icon> </v-list-item-icon>
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {};
</script>
