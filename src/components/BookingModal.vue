<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  car: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close", "confirm"]);

const customerName = ref("");
const phone = ref("");
const durationDays = ref(1);

const totalPrice = computed(() => {
  if (!props.car) return 0;
  return props.car.pricePerDay * (durationDays.value || 1);
});

const handleSubmit = () => {
  if (!customerName.value || !phone.value) return;
  emit("confirm", {
    carId: props.car.id,
    customerName: customerName.value,
    phone: phone.value,
    duration: durationDays.value,
    total: totalPrice.value,
  });
  customerName.value = "";
  phone.value = "";
  durationDays.value = 1;
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
      <h3 class="text-xl font-bold text-slate-800 mb-1">
        Konfirmasi Penyewaan
      </h3>
      <p class="text-sm text-slate-500 mb-4">Unit: {{ car?.name }}</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label
            class="block text-xs font-semibold text-slate-600 uppercase mb-1"
            >Nama Lengkap</label
          >
          <input
            v-model="customerName"
            required
            type="text"
            class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label
            class="block text-xs font-semibold text-slate-600 uppercase mb-1"
            >Nomor WhatsApp</label
          >
          <input
            v-model="phone"
            required
            type="tel"
            class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label
            class="block text-xs font-semibold text-slate-600 uppercase mb-1"
            >Durasi Sewa (Hari)</label
          >
          <input
            v-model.number="durationDays"
            min="1"
            max="30"
            type="number"
            class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div
          class="p-3 bg-slate-50 rounded-lg flex justify-between items-center text-sm font-semibold"
        >
          <span>Total Tagihan:</span>
          <span class="text-indigo-600 text-base"
            >Rp {{ totalPrice.toLocaleString("id-ID") }}</span
          >
        </div>

        <div class="flex gap-2 pt-2">
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 py-2 border rounded-lg text-sm text-slate-600 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg"
          >
            Proses Sewa
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
