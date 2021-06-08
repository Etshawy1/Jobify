<template>
  <div class="main-containter">
    <v-app-bar
      app
      dark 
      fixed
      short
      elevation="3"     
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" 
      dense>
      <v-toolbar-title>About us</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="$router.push({path: '/login'})">
        <v-icon>mdi-login</v-icon>
        Join Us Now!
      </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

  </div>
</template>

<style>
.main-containter{
  background: url('../assets/about.jpg');
  background-size: cover;
  height: 100vh;
  width: 100%;
}
</style>