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
      <v-container>
        <v-row justify="start">
          <v-col cols="2">
            <v-btn icon v-on:click="$router.push({path: '/signup'})">
              <v-icon>mdi-login</v-icon>
              Join Us Now!
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn icon v-on:click="$router.push({path: '/login'})">
              <v-icon>mdi-login</v-icon>
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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