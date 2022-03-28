<template>
  <div id="footer" class="font-monospace mt-5 small">
    <p class="mb-0">
      Version: <a class="text-reset" :href="GitRepository + '/commit/' + GitHash">{{ GitVersion }}</a>
    </p>
    <p>
      GitHub: <a class="text-reset" :href="GitRepository">gsparber/screening-timer</a>
    </p>
  </div>
</template>

<script>
import GitHash from "@/assets/hash.json";
import GitVersion from "@/assets/version.json"

export default {
  name: "Footer",
  data() {
    return {
      GitHash: GitHash,
      GitVersion: GitVersion,
      GitRepository: "https://www.github.com/gsparber/screening-timer"
    };
  }
}
</script>

<style scoped>

#footer {
  margin-bottom: 1em;
}

</style>
