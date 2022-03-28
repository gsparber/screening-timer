<template>
  <div>
    <div class="p-4">
      <div class="shadow p-3 mb-5 rounded text-center"
           :class="{ 'timer' : timer.state === 0, 'bg-danger' : timer.state === 1, 'bg-success-flash':  timer.state ===2}"
           @click="clickHandler"
      >
        <div class="action-buttons">
          <h3>
            {{ timer.name }} - {{ timerNumber }}
            <button v-if="timer.state === 0" class="btn btm-sm btn-outline-light btn-left"
                    @click.stop="askDeleteTimer">
              <font-awesome-icon :icon="['fad', 'trash']"/>
            </button>
            <button v-if="timer.state === 0" class="btn btm-sm btn-outline-light btn-right"
                    @click.stop="timer.showSettings = true">
              <font-awesome-icon :icon="['fad', 'gear']"/>
            </button>
          </h3>
        </div>
        <h6>{{ timer.sec }} Sekunden</h6>
        <div v-if="timer.state === 0" class="btn btn-light btn-lg">
          <font-awesome-icon :icon="['fad', 'circle-play']"/>
          Starten
        </div>
        <div v-if="timer.state === 1" class="btn btn-outline-light btn-lg">
          <font-awesome-icon :icon="['fad', 'circle-stop']"/>
          Stoppen
        </div>
        <div v-if="timer.state === 2" class="btn btn-light btn-lg">
          <font-awesome-icon :icon="['fad', 'circle-left']"/>
          Reset
        </div>
        <div class="mt-4">
          <h1 class="display-4 timeLeft">{{ timer.timeLeft }}</h1>
          <h4>Sekunden</h4>
        </div>
        <small v-if="timer.sec0">2. Beep alle {{ timer.sec0 }}s</small>
        <small v-if="timer.sec0 & timer.secReset"> - </small>
        <small v-if="timer.secReset">Reset bei {{ timer.secReset }}s</small>
      </div>
    </div>
  </div>
</template>

<script>
const soundObjectBeep = new Audio(require("./beep.mp3"));
const soundObjectSecondBeep = new Audio(require("./beep0.mp3"))

export default {
  name: "Timer",
  props: ["timer", "timerNumber"],

  methods: {
    clickHandler() {
      if (this.timer.state === 0) { // Start
        this.startTimer();
        return
      }

      if (this.timer.state === 1) { // Stop
        return this.askStopTimer()
      }

      if (this.timer.state === 2) { // Reset
        return this.stopTimer()
      }
    },

    startTimer() {
      this.timer.state = 1
      this.timerInterval = setInterval(() => {
        this.timer.timeLeft -= 1
        this.currentTimeLeft(this.timer.timeLeft)
      }, 1000);
    },

    startTimerSecondBeep() {
      this.timerIntervalSecond = setInterval(() => {
        this.timer.timeLeftSecond -= 1
        this.currentTimeLeftSecond(this.timer.timeLeftSecond)
      }, 1000);
    },

    askStopTimer() {
      this.$swal.fire({
        title: 'Sind Sie sicher?',
        text: "Sie können dies nicht rückgängig machen!",
        icon: 'error',
        position: 'top',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#198754',
        cancelButtonText: 'Abbrechen',
        confirmButtonText: 'Timer ' + this.timerNumber + ' - STOPPEN'
      }).then((result) => {
        if (result.isConfirmed) {
          this.stopTimer()
        }
      })
    },

    stopTimer() {
      clearInterval(this.timerInterval);
      clearInterval(this.timerIntervalSecond);
      this.timer.state = 0
      this.timer.timeLeft = this.timer.sec
      this.timer.timeLeftSecond = this.timer.sec0

    },

    currentTimeLeft(seconds) {
      if (seconds === 0) {
        this.playBeepSound()
        this.startTimerSecondBeep()
      }
      if (seconds < 0) {
        this.timer.state = 2
      }

      if (seconds < this.timer.secReset) {
        this.stopTimer()
      }
    },

    currentTimeLeftSecond(seconds) {
      if (seconds === 0) {
        this.playSecondBeepSound()
        this.timer.timeLeftSecond = this.timer.sec0
      }
    },

    playBeepSound() {
      soundObjectBeep.play();

    },

    playSecondBeepSound() {
      soundObjectSecondBeep.play();
    },

    askDeleteTimer() {
      this.$swal.fire({
        title: 'Sind Sie sicher?',
        text: "Sie können dies nicht rückgängig machen!",
        icon: 'error',
        position: 'top',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#198754',
        cancelButtonText: 'Abbrechen',
        confirmButtonText: 'Timer ' + this.timerNumber + ' - LÖSCHEN'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTimer()
        }
      })
    },

    deleteTimer() {
      this.$emit('del-timer', this.timer.id)
    }
  },

  destroyed() {
    this.stopTimer()
  }
}
</script>

<style scoped>

.timer:hover {
  cursor: pointer;
  background-color: #495057 !important;
}

.bg-danger:hover {
  cursor: pointer;
  background-color: #842029 !important;
}

.bg-success-flash:hover {
  cursor: pointer;
  background-color: #0f5132 !important;
}

.timer {
  color: #f8f9fa;
  background-color: #212529;
}

.bg-success-flash {
  background-color: #198754;
  -webkit-animation: success-flash linear 1s infinite;
  animation: success-flash linear 1s infinite;
}

@-webkit-keyframes success-flash {
  0% {
    background-color: #198754;;
  }
  50% {
    background-color: #2c3034;;
  }
  100% {
    background-color: #198754;;
  }
}

@keyframes success-flash {
  0% {
    background-color: #198754;;
  }
  50% {
    background-color: #2c3034;;
  }
  100% {
    background-color: #198754;;
  }
}

.timeLeft {
  margin-bottom: 0;
  font-weight: bold !important;
}

.action-buttons {
  display: flex;
  justify-content: center;
  position: relative;
}

.btn-left {
  position: absolute;
  left: 0;
}

.btn-right {
  position: absolute;
  right: 0;
}

.timeLeft {
  margin-bottom: 0;
  font-weight: bold !important;
}

h3 {
  font-weight: bold !important;
}
</style>
