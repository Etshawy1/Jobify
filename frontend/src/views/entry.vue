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
    <v-container fluid>
      <v-row class="mt-15">
        <v-col class="ml-12">
          <v-img
            src="../assets/jobifyHome.png"
            max-width="250px"
          >

          </v-img>
        </v-col>
      </v-row>
      <v-row class="mt-2 ml-12">
          <v-img
            src="../assets/seek.png"
            max-width="400px">
          </v-img>
      </v-row>
    </v-container>

  </div>
</template>

<style scoped>
.main-containter{
  background: url('../assets/home.jpg');
  background-size: cover;
  height: 93vh;
  width: 100%;
}
</style>