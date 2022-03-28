<template>
  <div class="row">
    <div v-bind:key="timer.id" v-for="(timer, number) in timers"
         class="col col-sm-12 col-md-4 col-lg-3"
    >

      <Timer v-if="!timer.showSettings" v-bind:timer="timer" v-bind:timerNumber="number + 1" v-on:del-timer="$emit('del-timer', timer.id)"/>
      <TimerSettings v-else v-bind:timer="timer" v-bind:timerNumber="number + 1"></TimerSettings>

    </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';
import TimerSettings from "@/components/TimerSettings";

export default {
  name: "timers",
  components: {
    Timer,
    TimerSettings
  },
  props: ["timers"]
}
</script>
