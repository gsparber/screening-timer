<template>
  <div class="TimeDate mt-3">
    <div class="row">
      <div class="col col-sm-12 col-md-6 col-lg-6">
        <h1 class="display-6 m-0">Aktuell:</h1>
        <h1 class="display-1 time">{{ time }}</h1>
        <h1 class="display-6 date">{{ date }}</h1>
      </div>
      <div class=" col col-sm-12 col-md-6 col-lg-6">
        <h1 class="display-6" @click="setOffset">+ {{ timeOffset }} Min:</h1>
        <h1 class="display-3 time">{{ time_add5 }}</h1>
        <!-- <input v-model.number="timeOffset" class=" form-control-sm" type="number"> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeDate",
  data() {
    return {
      timeOffset: 15,
      time: "",
      time_add5: "",
      date: "",
      timeObj: null,
    };
  },

  created() {
    this.timeObj = setInterval(() => {
      var date = new Date()
      var time_add5 = new Date()

      time_add5.setMinutes(time_add5.getMinutes() + this.timeOffset);

      this.time_add5 = time_add5.toLocaleTimeString()
      this.time = date.toLocaleTimeString();
      this.date = date.toLocaleDateString()
    }, 1000);
  },

  methods: {
    setOffset: function () {
      if (this.timeOffset === 15) {
        this.timeOffset = 5
      } else {
        this.timeOffset = 15
      }
    },
  }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;800&display=swap');

.TimeDate {
  margin-top: 0.25em;
}

.time {

  margin-bottom: 0;
  font-weight: bold !important;
}

.date {
  margin-bottom: 0.5em;
}

.display-1 {

}

</style>
