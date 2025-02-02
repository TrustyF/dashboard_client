<script setup>
import {computed, inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);
let curr_api = inject('curr_api')

let weather = ref({})
let weather_icon = ref('')
let weather_title = ref('')

let code_map = {
  0: ["Clear sky", "sunny"],
  1: ["Mainly clear", "sunny_cloudy"],
  2: ["Partly cloudy", "partly_cloudy"],
  3: ["Overcast", "cloudy"],
  45: ["Fog", "fog"],
  48: ["Rime fog", "fog"],
  51: ["Light drizzle", "rain_light"],
  53: ["Moderate drizzle", "rain_light"],
  55: ["Dense drizzle", "rain_light"],
  56: ["Light freezing drizzle", "rain_light"],
  57: ["Dense freezing drizzle", "rain_light"],
  61: ["Slight rain", "rain_light"],
  63: ["Moderate rain", "rain"],
  65: ["Heavy rain", "rain_heavy"],
  66: ["Light freezing rain", "rain_s_snow"],
  67: ["Heavy freezing rain", "rain_s_snow"],
  71: ["Slight snow fall", "snow_light"],
  73: ["Moderate snow fall", "snow"],
  75: ["Heavy snow fall", "snow_heavy"],
  77: ["Snow grains", "snow"],
  80: ["Slight rain showers", "rain_light"],
  81: ["Moderate rain showers", "rain"],
  82: ["Violent rain showers", "rain_heavy"],
  85: ["Slight snow showers", "snow_light"],
  86: ["Heavy snow showers", "snow_heavy"],
  95: ["Slight thunderstorm", "thunderstorms"],
}

async function fetch_weather() {
  const url = `${curr_api}/weather/get`

  const result = await axios.get(url)
    .then(response => response.data)

  console.log(result)
  weather.value = result
  map_info()
}

function map_info(){
  weather_icon.value = `/assets/weather/icons/v1/${code_map[weather.value.current.weather_code][1]}.png`
  weather_title.value = code_map[weather.value.current.weather_code][0]
}

onMounted(() => {
  fetch_weather()
})
</script>

<template>
  <div class="weather_wrapper" v-if="weather.current">

    <div class="header">
      <img class="weather_icon" :src="weather_icon" alt="weather_icon">
      <h1>{{Math.round(weather['current']['temperature_2m'])}}</h1>
      <h1 style="margin-bottom: auto;margin-top:3px;font-size: 1.5em;margin-left: -3px">°</h1>
    </div>

    <div class="sub_title">
      <h1>{{weather_title}}</h1>
      <h1>Feels {{weather['current']['apparent_temperature']}}</h1>

    </div>

    <div class="daily">
      <h1>{{code_map[weather['daily']['weather_code']][0]}}</h1>
      <h1>Feels {{ weather['daily']['apparent_temperature']}}</h1>

    </div>



  </div>
</template>

<style scoped>
.weather_wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 20px;

  line-height: 1;
}
.header {
  height: 3em;
  display: flex;
  flex-flow: row;
  gap: 5px;

  .weather_icon {
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  h1 {
    font-size: 3em;
  }
}

.sub_title {
  display: flex;
  flex-flow: column;

  gap: 5px;

  h1 {
    font-size: 1em;
  }
}

.daily {
  display: flex;
  flex-flow: column;

  gap: 5px;

  h1 {
    font-size: 1em;
  }
}

</style>
