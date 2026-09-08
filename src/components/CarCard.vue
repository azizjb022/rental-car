<script setup>
defineProps({
  car: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["rent"]);
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 flex flex-col justify-between"
  >
    <div class="relative h-48 w-full overflow-hidden bg-slate-100">
      <img
        :src="car.image"
        :alt="car.name"
        class="w-full h-full object-cover"
      />
      <span
        class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow"
        :class="
          car.status === 'Tersedia'
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-rose-100 text-rose-800'
        "
      >
        {{ car.status }}
      </span>
    </div>

    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <div
          class="text-xs font-semibold text-indigo-600 uppercase tracking-wider"
        >
          {{ car.type }}
        </div>
        <h3 class="text-lg font-bold text-slate-800 mt-1">{{ car.name }}</h3>

        <div class="flex items-center gap-4 text-xs text-slate-500 mt-3">
          <span>👥 {{ car.capacity }} Penumpang</span>
          <span>⚙️ {{ car.transmission }}</span>
        </div>
      </div>

      <div
        class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"
      >
        <div>
          <span class="text-xs text-slate-400">Tarif / hari</span>
          <p class="text-base font-bold text-slate-900">
            Rp {{ car.pricePerDay.toLocaleString("id-ID") }}
          </p>
        </div>

        <button
          :disabled="car.status !== 'Tersedia'"
          @click="emit('rent', car)"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-sm font-medium rounded-lg transition"
        >
          Sewa Sekarang
        </button>
      </div>
    </div>
  </div>
</template>
