<script setup>
import { ref, computed } from "vue";

// Nomor kontak WhatsApp Admin (format internasional tanpa tanda +)
const adminWhatsApp = "6281234567890";

// Layanan Utama
const services = [
  {
    title: "Lepas Kunci (Self Drive)",
    desc: "Bebas bepergian ke mana saja dengan privasi penuh bersama keluarga.",
    icon: "🔑",
  },
  {
    title: "Mobil + Sopir Berpengalaman",
    desc: "Perjalanan aman, nyaman, santai tanpa lelah menyetir di jalanan kota.",
    icon: "👨‍✈️",
  },
  {
    title: "Antar Jemput Bandara",
    desc: "Layanan tepat waktu tiba di bandara atau dijemput langsung dari terminal.",
    icon: "✈️",
  },
  {
    title: "Carter Wisata & Dinas",
    desc: "Paket rute harian fleksibel untuk kunjungan dinas instansi atau tur wisata.",
    icon: "🗺️",
  },
];

// Data Armada & Paket Tarif
const cars = ref([
  {
    id: 1,
    name: "Toyota All New Avanza",
    type: "MPV",
    transmission: "Manual / Matic",
    capacity: 7,
    priceSelfDrive: 350000,
    priceWithDriver: 550000,
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80",
    status: "Tersedia",
  },
  {
    id: 2,
    name: "Toyota Grand New Innova Reborn",
    type: "MPV Premium",
    transmission: "Automatic Diesel",
    capacity: 7,
    priceSelfDrive: 550000,
    priceWithDriver: 750000,
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&auto=format&fit=crop&q=80",
    status: "Tersedia",
  },
  {
    id: 3,
    name: "Mitsubishi Pajero Sport Dakar",
    type: "SUV",
    transmission: "Automatic 4x2",
    capacity: 7,
    priceSelfDrive: 900000,
    priceWithDriver: 1200000,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80",
    status: "Tersedia",
  },
  {
    id: 4,
    name: "Toyota Fortuner GR Sport",
    type: "SUV",
    transmission: "Automatic Diesel",
    capacity: 7,
    priceSelfDrive: 950000,
    priceWithDriver: 1250000,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    status: "Tersedia",
  },
  {
    id: 5,
    name: "Toyota HiAce Commuter / Premio",
    type: "Minibus Tour",
    transmission: "Manual",
    capacity: 14,
    priceSelfDrive: 0, // Hanya dengan sopir
    priceWithDriver: 1100000,
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80",
    status: "Tersedia",
  },
  {
    id: 6,
    name: "Honda Brio Satya",
    type: "City Car",
    transmission: "Automatic",
    capacity: 5,
    priceSelfDrive: 300000,
    priceWithDriver: 500000,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop&q=80",
    status: "Tersedia",
  },
]);

// Filter & Opsi Tampilan
const activeTab = ref("withDriver"); // 'withDriver' | 'selfDrive'
const selectedCategory = ref("Semua");

const filteredCars = computed(() => {
  return cars.value.filter((car) => {
    const matchCategory =
      selectedCategory.value === "Semua" ||
      car.type.includes(selectedCategory.value);
    // Jika tab Lepas Kunci, sembunyikan mobil yang tidak bisa lepas kunci
    const canSelfDrive =
      activeTab.value === "selfDrive" ? car.priceSelfDrive > 0 : true;
    return matchCategory && canSelfDrive;
  });
});

// Modal & Form Booking WhatsApp
const isModalOpen = ref(false);
const selectedCar = ref(null);
const bookingForm = ref({
  name: "",
  phone: "",
  date: "",
  days: 1,
  serviceType: "Dengan Sopir",
  notes: "",
});

const openBooking = (car) => {
  selectedCar.value = car;
  bookingForm.value.serviceType =
    activeTab.value === "withDriver" ? "Dengan Sopir" : "Lepas Kunci";
  isModalOpen.value = true;
};

const sendToWhatsApp = () => {
  const car = selectedCar.value;
  const f = bookingForm.value;
  const tariff =
    f.serviceType === "Lepas Kunci" ? car.priceSelfDrive : car.priceWithDriver;
  const total = tariff * f.days;

  const text =
    `Halo Admin, saya ingin rental mobil via website:%0A%0A` +
    `*Unit:* ${car.name}%0A` +
    `*Paket:* ${f.serviceType}%0A` +
    `*Nama Penyewa:* ${f.name}%0A` +
    `*No. HP/WA:* ${f.phone}%0A` +
    `*Tanggal Mulai:* ${f.date}%0A` +
    `*Durasi:* ${f.days} Hari%0A` +
    `*Estimasi Biaya:* Rp ${total.toLocaleString("id-ID")}%0A` +
    (f.notes ? `*Catatan Khusus:* ${f.notes}%0A` : "") +
    `%0AMohon konfirmasi ketersediaan unitnya. Terima kasih!`;

  window.open(`https://wa.me/${adminWhatsApp}?text=${text}`, "_blank");
  isModalOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans">
    <!-- Topbar Info -->
    <div
      class="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800"
    >
      <div
        class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2"
      >
        <div class="flex items-center gap-4">
          <span>📍 Layanan 24 Jam Antar-Jemput Bandara & Kota</span>
          <span>📞 Hotline: +62 812-3456-7890</span>
        </div>
        <div class="text-amber-400 font-medium">
          Armada Bersih, Nyaman, & Terawat
        </div>
      </div>
    </div>

    <!-- Header Navbar -->
    <header class="bg-white sticky top-0 z-30 shadow-sm">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"
      >
        <div>
          <h1 class="text-2xl font-black tracking-tight text-slate-900">
            SATRIA<span class="text-amber-500">RENT</span>CAR
          </h1>
          <p
            class="text-[10px] tracking-widest text-slate-400 uppercase font-semibold"
          >
            Jasa Rental Mobil Terpercaya
          </p>
        </div>

        <nav
          class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600"
        >
          <a href="#beranda" class="hover:text-amber-500 transition">Beranda</a>
          <a href="#layanan" class="hover:text-amber-500 transition">Layanan</a>
          <a href="#armada" class="hover:text-amber-500 transition"
            >Daftar Harga</a
          >
          <a href="#keunggulan" class="hover:text-amber-500 transition"
            >Tentang Kami</a
          >
        </nav>

        <a
          :href="`https://wa.me/${adminWhatsApp}`"
          target="_blank"
          class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition"
        >
          <span>💬</span> Chat WhatsApp
        </a>
      </div>
    </header>

    <!-- Hero Section -->
    <section
      id="beranda"
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4"
    >
      <div
        class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <div class="max-w-xl">
          <span
            class="text-amber-400 font-semibold tracking-wider text-xs uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30"
          >
            Sewa Mobil Murah & Berkualitas
          </span>
          <h2 class="text-3xl sm:text-5xl font-black mt-4 leading-tight">
            Perjalanan Aman & Nyaman Bersama
            <span class="text-amber-400">Armada Pilihan</span>
          </h2>
          <p class="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
            Menyediakan rental mobil lepas kunci dan paket dengan supir
            profesional untuk area dalam dan luar kota, antar jemput bandara,
            hingga perjalanan dinas.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <a
              href="#armada"
              class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-6 py-3 rounded-lg shadow-lg transition"
            >
              Lihat Daftar Mobil
            </a>
            <a
              :href="`https://wa.me/${adminWhatsApp}?text=Halo%20Admin,%20saya%20ingin%20tanya%20sewa%20mobil`"
              target="_blank"
              class="border border-white/20 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-lg transition"
            >
              Hubungi Admin
            </a>
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80"
            alt="Rental Mobil"
            class="rounded-2xl shadow-2xl border border-slate-700/50 object-cover w-full max-h-80"
          />
        </div>
      </div>
    </section>

    <!-- Pilihan Layanan -->
    <section id="layanan" class="py-16 px-4 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h3 class="text-2xl sm:text-3xl font-bold text-slate-900">
          Layanan Terbaik Kami
        </h3>
        <p class="text-slate-500 text-sm mt-2">
          Solusi transportasi fleksibel sesuai kebutuhan agenda Anda
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="service in services"
          :key="service.title"
          class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
        >
          <div class="text-4xl mb-4">{{ service.icon }}</div>
          <h4 class="font-bold text-slate-800 text-base mb-2">
            {{ service.title }}
          </h4>
          <p class="text-slate-500 text-xs leading-relaxed">
            {{ service.desc }}
          </p>
        </div>
      </div>
    </section>

    <!-- Katalog Armada & Daftar Harga -->
    <section
      id="armada"
      class="py-16 px-4 bg-slate-100 border-t border-slate-200"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-10">
          <h3 class="text-2xl sm:text-3xl font-bold text-slate-900">
            Daftar Tarif Sewa Armada
          </h3>
          <p class="text-slate-500 text-sm mt-2">
            Pilih skema tarif: Lepas Kunci atau Include Sopir
          </p>

          <!-- Toggle Skema Tarif -->
          <div class="inline-flex bg-slate-200 p-1.5 rounded-xl mt-6">
            <button
              @click="activeTab = 'withDriver'"
              class="px-5 py-2 rounded-lg text-xs font-bold transition"
              :class="
                activeTab === 'withDriver'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              "
            >
              Paket + Supir
            </button>
            <button
              @click="activeTab = 'selfDrive'"
              class="px-5 py-2 rounded-lg text-xs font-bold transition"
              :class="
                activeTab === 'selfDrive'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              "
            >
              Lepas Kunci
            </button>
          </div>
        </div>

        <!-- Filter Kategori Mobil -->
        <div class="flex justify-center gap-2 mb-8 flex-wrap">
          <button
            v-for="cat in ['Semua', 'MPV', 'SUV', 'City Car', 'Minibus']"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
            :class="
              selectedCategory === cat
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            "
          >
            {{ cat }}
          </button>
        </div>

        <!-- Grid Mobil -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="car in filteredCars"
            :key="car.id"
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between"
          >
            <div class="relative h-52 bg-slate-200">
              <img
                :src="car.image"
                :alt="car.name"
                class="w-full h-full object-cover"
              />
              <span
                class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-1 rounded"
              >
                {{ car.type }}
              </span>
            </div>

            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="text-lg font-bold text-slate-900">{{ car.name }}</h4>
                <div
                  class="flex items-center gap-4 text-xs text-slate-500 mt-2"
                >
                  <span>👥 {{ car.capacity }} Kursi</span>
                  <span>⚙️ {{ car.transmission }}</span>
                </div>
              </div>

              <div
                class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between"
              >
                <div>
                  <span class="text-[11px] text-slate-400 block font-medium">
                    {{
                      activeTab === "withDriver"
                        ? "Harga Mobil + Supir"
                        : "Harga Lepas Kunci"
                    }}
                  </span>
                  <p class="text-lg font-extrabold text-amber-600">
                    Rp
                    {{
                      (activeTab === "withDriver"
                        ? car.priceWithDriver
                        : car.priceSelfDrive
                      ).toLocaleString("id-ID")
                    }}
                    <span class="text-xs font-normal text-slate-400"
                      >/ hari</span
                    >
                  </p>
                </div>

                <button
                  @click="openBooking(car)"
                  class="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition"
                >
                  Booking Unit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Keunggulan Layanan -->
    <section id="keunggulan" class="py-16 px-4 max-w-7xl mx-auto">
      <div
        class="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white"
      >
        <h3 class="text-2xl sm:text-3xl font-bold text-center mb-10">
          Kenapa Memilih Layanan Kami?
        </h3>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div class="text-3xl mb-3">🧼</div>
            <h5 class="font-bold text-base mb-1">Armada Bersih & Wangi</h5>
            <p class="text-xs text-slate-400">
              Mobil selalu dicuci dan disanitasi sebelum diantar ke penyewa.
            </p>
          </div>
          <div>
            <div class="text-3xl mb-3">🛡️</div>
            <h5 class="font-bold text-base mb-1">Kondisi Mesin Prima</h5>
            <p class="text-xs text-slate-400">
              Servis rutin berkala di bengkel resmi demi keamanan perjalanan.
            </p>
          </div>
          <div>
            <div class="text-3xl mb-3">⏱️</div>
            <h5 class="font-bold text-base mb-1">Jemput Tepat Waktu</h5>
            <p class="text-xs text-slate-400">
              Garansi penjemputan on-time untuk bandara dan jadwal penting Anda.
            </p>
          </div>
          <div>
            <div class="text-3xl mb-3">🤝</div>
            <h5 class="font-bold text-base mb-1">Syarat Mudah & Cepat</h5>
            <p class="text-xs text-slate-400">
              Verifikasi dokumen lepas kunci simpel tanpa proses berbelit.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800 px-4"
    >
      <div
        class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
      >
        <div>
          <p class="text-base font-bold text-white">SATRIA RENT CAR</p>
          <p class="mt-1">Pusat Layanan Sewa Mobil Terpercaya & Terlengkap.</p>
        </div>
        <p>&copy; 2026 Satria Rent Car. Hak Cipta Dilindungi.</p>
      </div>
    </footer>

    <!-- Floating WhatsApp Button -->
    <a
      :href="`https://wa.me/${adminWhatsApp}`"
      target="_blank"
      class="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
      aria-label="Hubungi WhatsApp"
    >
      <span class="text-2xl">💬</span>
    </a>

    <!-- Modal Booking Popup -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <h4 class="text-lg font-bold text-slate-900">
          Formulir Pemesanan Unit
        </h4>
        <p class="text-xs text-slate-500 mb-4">
          Mobil: <strong>{{ selectedCar?.name }}</strong>
        </p>

        <form @submit.prevent="sendToWhatsApp" class="space-y-4">
          <div>
            <label
              class="block text-xs font-semibold text-slate-700 uppercase mb-1"
              >Tipe Layanan</label
            >
            <select
              v-model="bookingForm.serviceType"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option
                v-if="selectedCar?.priceSelfDrive > 0"
                value="Lepas Kunci"
              >
                Lepas Kunci (Tanpa Supir)
              </option>
              <option value="Dengan Sopir">Dengan Sopir Profesional</option>
            </select>
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-700 uppercase mb-1"
              >Nama Lengkap</label
            >
            <input
              v-model="bookingForm.name"
              type="text"
              required
              placeholder="Contoh: Rahmat Hidayat"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                class="block text-xs font-semibold text-slate-700 uppercase mb-1"
                >No. WhatsApp</label
              >
              <input
                v-model="bookingForm.phone"
                type="tel"
                required
                placeholder="081234567890"
                class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label
                class="block text-xs font-semibold text-slate-700 uppercase mb-1"
                >Tanggal Mulai Sewa</label
              >
              <input
                v-model="bookingForm.date"
                type="date"
                required
                class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-700 uppercase mb-1"
              >Durasi Sewa (Hari)</label
            >
            <input
              v-model.number="bookingForm.days"
              type="number"
              min="1"
              max="30"
              required
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-700 uppercase mb-1"
              >Catatan Tambahan (Opsional)</label
            >
            <textarea
              v-model="bookingForm.notes"
              rows="2"
              placeholder="Contoh: Jemput di Bandara Kualanamu jam 10 pagi"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            ></textarea>
          </div>

          <div
            class="p-4 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-sm font-bold"
          >
            <span class="text-slate-700">Estimasi Total:</span>
            <span class="text-amber-700 text-base">
              Rp
              {{
                (
                  (bookingForm.serviceType === "Lepas Kunci"
                    ? selectedCar?.priceSelfDrive
                    : selectedCar?.priceWithDriver) * bookingForm.days
                ).toLocaleString("id-ID")
              }}
            </span>
          </div>

          <div class="flex gap-2 pt-2">
            <button
              type="button"
              @click="isModalOpen = false"
              class="flex-1 py-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition flex items-center justify-center gap-2"
            >
              <span>💬</span> Lanjut ke WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
