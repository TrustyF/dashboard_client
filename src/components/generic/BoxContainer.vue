<script setup>

let props = defineProps(['test']);
let emits = defineEmits(["test"]);

</script>

<template>
  <div class="box_container">
    <slot/>
  </div>
</template>

<style scoped>
.box_container {
  /*width: 3fr;*/
  /*height: 1fr;*/
  background-color: #2c3e50;

  padding: 10px;
  border-radius: 8px;
}
</style>
