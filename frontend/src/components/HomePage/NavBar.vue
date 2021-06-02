<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title large style="cursor: pointer" @click="$router.push('/home')" >Jobify</v-toolbar-title>
      <v-spacer></v-spacer>
          
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            v-bind="attrs"
            v-on="on"
            icon id="user-img">
          <v-avatar>
            <img
              src="../../assets/man.png"
              alt="John">
          </v-avatar>
          </v-btn>           
        </template>
        <v-list width="300">
          <v-list-item-group>
            <v-list-item row wrap align-center>
              <v-flex md3>
                <v-avatar size="35">
                <img
                  width="35" height="35"
                  src="../../assets/man.png"
                  alt="John">
                </v-avatar>
              </v-flex>
                <v-flex md9> 
                <span>View Profile</span>
              </v-flex>
            </v-list-item>
            
            <v-list-item row wrap align-center v-show="!type" @click="$router.push('/jobs/' + profile_id)">
              <v-flex md3>
                <v-icon class="icons_menu">mdi-briefcase</v-icon>
              </v-flex>
              <v-flex md9>
                <span class="spans-menu">My Jobs</span>
              </v-flex>  
            </v-list-item>
            
            <v-list-item row wrap align-center>
              <v-flex md3>
                <v-icon class="icons_menu">mdi-wrench</v-icon>
              </v-flex>
              <v-flex md9>
                <span class="spans-menu">Settings</span>
              </v-flex>  
            </v-list-item>
            <v-list-item row wrap align-center>
              <v-flex md3>
                <v-icon class="icons_menu">mdi-export</v-icon>
              </v-flex>
              <v-flex md9>  
                <span class="spans-menu">Logout</span>
              </v-flex>  
            </v-list-item>
            <router-link to="/about">
              <v-list-item row wrap align-center>
                  <v-flex md3>
                      <v-icon class="icons_menu">mdi-information</v-icon>
                  </v-flex>
                  <v-flex md9>  
                    <span class="spans-menu">About</span>
                  </v-flex>  
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data(){
    return{
      type: false,
      profile_id: 7
    }
  }
};
</script>

<style>
a{
    text-decoration: none;
    color: black;
}
.spans-menu{
  color: black;
}

#user-img{
  margin: 5px;
}
</style>
