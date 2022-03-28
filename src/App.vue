<template>
  <div id="app" @click="startFullscreen">
    <navbar v-if="!isfullscreen"></navbar>
    <div v-if="updateExists" class="alert alert-light m-3" role="alert">
      <h4 class="alert-heading">Update verfügbar!</h4>
      <p><strong>ACHUTUNG!! - Beim Aktualisieren werden alle Timer gestoppt!</strong></p>
      <button class="btn btn-dark m-1" type="button" @click="refreshApp">
        Aktualisieren
      </button>
    </div>
    <router-view/>
    <div v-if="!isKiosk">
      <button v-if="isfullscreen" class="btn btn-outline-secondary btn-sm m-1" type="button" @click="toggleFullscreen">
        Vollbild benden
      </button>
      <button v-else class="btn btn-secondary m-1" type="button" @click="toggleFullscreen" ref="toFullscreen">Vollbild
        starten
      </button>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "./components/Footer";
import update from './mixins/update'


export default {
  mixins: [update],
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      isKiosk: false,
      userNotClicked: false,
      isfullscreen: false,
      publicPath: process.env.BASE_URL,
    };
  },

  created: function () {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("kiosk")) {
      this.isKiosk = true
    }
  },

  methods: {
    startFullscreen() {
      if (this.isKiosk) {
        if (!this.userNotClicked) {
          this.userNotClicked = true
        }
      }
      if (!this.isKiosk) {
        if (!this.userNotClicked) {
          this.toggleFullscreen()
          this.userNotClicked = true
        }
      }
    },

    toggleFullscreen: function () {

      if (!this.isfullscreen) {
        this.go_full_screen()
        this.isfullscreen = true
      } else {
        this.exit_full_screen()
        this.isfullscreen = false
      }

    },


    go_full_screen() {
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else {
        console.log('Fullscreen API is not supported.')
      }
    },

    exit_full_screen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else {
        console.log('Fullscreen API is not supported.')
      }
    }
  }
}

</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  #color: #f8f9fa;
  #background-color: #2c3034;

  min-height: 100vh;
  overflow: hidden;

  color: #f8f9fa !important;
  background-color: #2c3034 !important;
}

</style>
