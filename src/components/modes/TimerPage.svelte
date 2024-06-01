<script lang="ts">
    import { modes } from "../../lib/models/modes";
    import { appState } from "../../lib/stores";

    let mode = modes[1];

    const MAX_DURATION_SECONDS = 30;

    function decrementWateringInterval() {
        if ($appState.timerIntervalHours - 1 > 0) {
            $appState.timerIntervalHours--;
            saveWateringInterval();
        }
    }

    function incrementWateringInterval() {
        $appState.timerIntervalHours++;
        saveWateringInterval();
    }

    function saveWateringInterval() {
        console.log($appState.timerIntervalHours);
    }


    function decrementWateringDuration() {
        if ($appState.timerWateringDurationSeconds - 1 > 0) {
            $appState.timerWateringDurationSeconds--;
            saveWateringDuration();
        }
    }

    function incrementWateringDuration() {
        if ($appState.timerWateringDurationSeconds + 1 <= MAX_DURATION_SECONDS) {
            $appState.timerWateringDurationSeconds++;
            saveWateringDuration();
        }
    }

    function saveWateringDuration() {
        console.log($appState.timerWateringDurationSeconds);
    }

</script>

<div class="flex">
    <div>
        <div class="max-w-xs mx-auto">
            <label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900">
                Interval
                <i class="text-gray-500">in h</i>
            </label>
            <div class="relative flex items-center max-w-[8rem]">
                <button on:click={decrementWateringInterval} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11">
                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                    </svg>
                </button>

                <input min="1" bind:value={$appState.timerIntervalHours} type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" placeholder="999" required />

                <button on:click={incrementWateringInterval} type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11">
                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
            <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500">Recommendation here</p>
        </div>
    </div>
</div>

<div>
    <div class="max-w-xs mx-auto">
        <label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900">
            Duration
            <i class="text-gray-500">in s</i>
        </label>
        <div class="relative flex items-center max-w-[8rem]">
            <button on:click={decrementWateringDuration} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11">
                <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                </svg>
            </button>

            <input min="1" max={MAX_DURATION_SECONDS} bind:value={$appState.timerWateringDurationSeconds} type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" placeholder="999" required />

            <button on:click={incrementWateringDuration} type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11">
                <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
            </button>
        </div>
        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500">Recommendation here</p>
    </div>
</div>
