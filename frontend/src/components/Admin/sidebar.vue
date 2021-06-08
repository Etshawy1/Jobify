<template>
  <div>
    <div>
      <v-toolbar
        app
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-spacer></v-spacer>
        <v-toolbar-title>Vuetify</v-toolbar-title>
      </v-toolbar>
    </div>
    <div>
      <v-navigation-drawer
        expand-on-hover
        absolute
        dark
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
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-diamond</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Skills</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-dots-grid</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Job Categories</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-alphabet-latin</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Job Titles</v-list-item-title>
          </v-list-item>
          <v-list-item link>
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
    </div>
  </div>
</template>
<script>
export default {};
</script>
