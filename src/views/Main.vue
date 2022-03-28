<template>
  <div class="main">
    <TimeDate></TimeDate>
    <div class="btn btn-outline-light btn-lg m-1" @click="addTimer(60, 30)">
      Neuer Timer <strong>60s</strong>
    </div>
    <div class="btn btn-outline-light btn-lg m-1" @click="addTimer(120, 30)">
      Neuer Timer <strong>120s</strong>
    </div>


    <Timers v-bind:timers="timers" v-on:del-timer="deleteTimer"/>
    <div class="btn btn-outline-danger btn-sm m-1" @click="removeAll">
      Alle Timer löschen!
    </div>
  </div>
</template>

<script>
import TimeDate from "@/components/TimeDate";
import Timers from "@/components/Timers.vue";

export default {
  name: 'Main',
  components: {
    TimeDate,
    Timers,
  },

  data() {
    return {
      timers: [
        {id: 1, name: "Timer", sec: 60, sec0: 30, secReset: -300, state: 0, timeLeft: 60, timeLeftSecond:30, showSettings: false},
        {id: 2, name: "Timer", sec: 60, sec0: 30, secReset: -300, state: 0, timeLeft: 60, timeLeftSecond:30, showSettings: false},
        {id: 3, name: "Timer", sec: 60, sec0: 30, secReset: -300, state: 0, timeLeft: 60, timeLeftSecond:30, showSettings: false},
        {id: 4, name: "Timer", sec: 60, sec0: 30, secReset: -300, state: 0, timeLeft: 60, timeLeftSecond:30, showSettings: false}
      ],
      nextTimerID: 5
    };
  },

  created: function () {
    document.title = "Screening Timer"
  },

  methods: {
    addTimer(seconds, sec0) {
      this.timers.push({
        id: this.nextTimerID++,
        name: "Timer",
        sec: seconds,
        sec0: sec0,
        secReset: -300,
        state: 0,
        timeLeft: seconds,
        timeLeftSecond: sec0,
        showSettings: false
      });

    },
    removeAll() {
      this.$swal.fire({
        title: 'Sind Sie sicher? ',
        text: "Alle Timer werden Gestoppt! Sie können dies nicht rückgängig machen!",
        icon: 'error',
        position: 'top',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#198754',
        cancelButtonText: 'Abbrechen',
        confirmButtonText: 'ALLE TIMER - STOPPEN & LÖSCHEN'
      }).then((result) => {
        if (result.isConfirmed) {
          this.timers = [];
         }
      })
    },

    deleteTimer(id) {
      console.log("Delete timer " + id)
      this.timers = this.timers.filter(timer => timer.id !== id)
    }
  }
}
</script>
