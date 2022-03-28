<template>
  <div>
    <div class="p-4">
      <div class="shadow p-3 mb-5 rounded text-center timerSettings">
        <h3>
          {{ timer.name }} - {{ timerNumber }}
        </h3>
        <h6>Einstellungen</h6>

        <div class="input-group mb-3">
          <span class="input-group-text">Timer läuft:</span>
          <input v-model.number="timer.sec" type="number" class="form-control" required
                 :class="{ 'is-invalid' : errorSec }"/>
          <span class="input-group-text">s</span>
          <div v-if="errorSec" class="invalid-feedback">
            Bitte Zeit richtig eingeben! (=> 1)
          </div>
        </div>

        <h6>Ist Timer unter 0s dann:</h6>
        <form @submit.prevent="saveSettings">
          <div class="input-group mb-3">
            <span class="input-group-text">2. Beep alle</span>
            <input v-model.number="timer.sec0" type="number" class="form-control"/>
            <span class="input-group-text">s</span>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Reset bei</span>
            <input v-model.number="timer.secReset" type="number" class="form-control"/>
            <span class="input-group-text">s</span>
          </div>

          <button class="btn btn-light btn-lg" type="submit">
            <font-awesome-icon :icon="['fad', 'circle-check']"/>
            Speichern
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimerSettings",
  props: ["timer", "timerNumber"],

  data() {
    return {
      errorSec: false
    }
  },

  methods: {
    saveSettings() {
      if (this.timer.sec > 0) {
        this.errorSec = false
        this.timer.timeLeft = this.timer.sec
        this.timer.timeLeftSecond = this.timer.sec0
        this.timer.showSettings = false
      } else {
        this.errorSec = true

      }
    }
  }
}
</script>

<style scoped>
.timerSettings {
  color: #f8f9fa;
  background-color: #212529;
}
</style>
