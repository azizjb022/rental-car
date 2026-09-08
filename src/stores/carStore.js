import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCarStore = defineStore('cars', () => {
  const cars = ref([
    {
      id: 1,
      name: 'Toyota Avanza',
      type: 'MPV',
      capacity: 7,
      pricePerDay: 400000,
      transmission: 'Automatic',
      status: 'Tersedia',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500'
    },
    {
      id: 2,
      name: 'Mitsubishi Pajero Sport',
      type: 'SUV',
      capacity: 7,
      pricePerDay: 850000,
      transmission: 'Automatic',
      status: 'Tersedia',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500'
    },
    {
      id: 3,
      name: 'Honda Brio',
      type: 'City Car',
      capacity: 5,
      pricePerDay: 300000,
      transmission: 'Manual',
      status: 'Disewa',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500'
    }
  ]);

  const searchQuery = ref('');
  const selectedType = ref('All');

  const filteredCars = computed(() => {
    return cars.value.filter((car) => {
      const matchName = car.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchType = selectedType.value === 'All' || car.type === selectedType.value;
      return matchName && matchType;
    });
  });

  const updateCarStatus = (id, newStatus) => {
    const car = cars.value.find((c) => c.id === id);
    if (car) car.status = newStatus;
  };

  const addCar = (newCar) => {
    cars.value.push({ ...newCar, id: Date.now(), status: 'Tersedia' });
  };

  return { cars, searchQuery, selectedType, filteredCars, updateCarStatus, addCar };
});