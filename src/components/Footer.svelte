<script>
    import { findMinMaxAvgValues } from "$lib/models/measurement";
    import { appState } from "$lib/stores";
    import SettingsWindow from "./SettingsWindow.svelte";

    $: minMaxValues = findMinMaxAvgValues($appState.measurements);
</script>

<footer class="mt-auto w-nav px-4 py-2 outline outline-1 rounded-sm mb-4 flex items-center gap-4 shadow-md">
  <div class="flex items-center text-cyan-400 gap-2">
    <i class="ph ph-drop text-2xl"></i>

    <div class="flex items-center justify-center gap-2">
      <div>
        min: 
        <b>{minMaxValues.moisture.min.toFixed(1)} %</b>
      </div>

      <div>
        avg:
        <b>{minMaxValues.moisture.avg.toFixed(1)} %</b>
      </div>

      <div>
        max: 
        <b>{minMaxValues.moisture.max.toFixed(1)} %</b>
      </div>
    </div>
  </div>

  <!-- <div class="flex items-center text-orange-600 gap-2"> -->
  <!--   <i class="ph ph-thermometer text-2xl"></i> -->
  <!---->
  <!--   <div class="grid grid-cols-statistics gap-2"> -->
  <!--     <div> -->
  <!--       max:  -->
  <!--     </div> -->
  <!---->
  <!--     <b>{minMaxValues.temperature.max} °C</b> -->
  <!---->
  <!--     <div> -->
  <!--       avg: -->
  <!--     </div> -->
  <!---->
  <!--     <b>{minMaxValues.temperature.avg} °C</b> -->
  <!---->
  <!--     <div> -->
  <!--       min:  -->
  <!--     </div> -->
  <!---->
  <!--     <b>{minMaxValues.temperature.max} °C</b> -->
  <!--   </div> -->
  <!-- </div> -->

  <div class="ml-auto">
    <SettingsWindow />
  </div>
</footer>
