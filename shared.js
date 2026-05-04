/* ============================================================
   shared.js — Zaiairie Auto Sales data layer
   ------------------------------------------------------------
   This file abstracts ALL data access behind a small API.
   Today: backed by localStorage (demo mode).
   Tomorrow: swap the body of these functions to call Supabase.
   The rest of the site does not need to change.
   ============================================================ */

const STORAGE_KEY = 'zaiairie_inventory_v1';

// ---------- Seed data (used on first load) ----------
const SEED_INVENTORY = [
  {
    id: 1, year: 2019, make: 'Honda', model: 'Civic', trim: 'LX',
    price: 16995, mileage: 42300, body: 'Sedan', transmission: 'Automatic',
    drivetrain: 'FWD', fuel: 'Gasoline', color: 'Silver', vin: '',
    description: 'Clean Carfax, well-maintained, fresh oil change. Great commuter car.',
    status: 'available',
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    featured: true,
  },
  {
    id: 2, year: 2018, make: 'Toyota', model: 'RAV4', trim: 'XLE',
    price: 19500, mileage: 58100, body: 'SUV', transmission: 'Automatic',
    drivetrain: 'AWD', fuel: 'Gasoline', color: 'White', vin: '',
    description: 'AWD, perfect for Hudson Valley winters. New tires.',
    status: 'available',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    featured: true,
  },
  {
    id: 3, year: 2017, make: 'Ford', model: 'F-150', trim: 'XLT',
    price: 24900, mileage: 71200, body: 'Truck', transmission: 'Automatic',
    drivetrain: '4WD', fuel: 'Gasoline', color: 'Blue', vin: '',
    description: 'Crew cab, tow package, bed liner. Ready to work.',
    status: 'available',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80'],
    featured: true,
  },
  {
    id: 4, year: 2016, make: 'Chevrolet', model: 'Malibu', trim: 'LT',
    price: 11200, mileage: 88400, body: 'Sedan', transmission: 'Automatic',
    drivetrain: 'FWD', fuel: 'Gasoline', color: 'Black', vin: '',
    description: 'Affordable and reliable. Recently inspected.',
    status: 'available',
    images: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80'],
    featured: false,
  },
  {
    id: 5, year: 2020, make: 'Honda', model: 'CR-V', trim: 'EX',
    price: 22400, mileage: 34600, body: 'SUV', transmission: 'Automatic',
    drivetrain: 'AWD', fuel: 'Gasoline', color: 'Gray', vin: '',
    description: 'Low miles, sunroof, backup camera, AWD.',
    status: 'available',
    images: ['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&q=80'],
    featured: false,
  },
  {
    id: 6, year: 2015, make: 'Toyota', model: 'Camry', trim: 'SE',
    price: 9995, mileage: 104500, body: 'Sedan', transmission: 'Automatic',
    drivetrain: 'FWD', fuel: 'Gasoline', color: 'Red', vin: '',
    description: 'Budget-friendly, well-maintained, runs great.',
    status: 'available',
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80'],
    featured: false,
  },
];

// ---------- Public API ----------
const InventoryAPI = {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_INVENTORY));
      return [...SEED_INVENTORY];
    }
    try { return JSON.parse(raw); }
    catch { return [...SEED_INVENTORY]; }
  },

  getById(id) {
    return this.getAll().find(v => v.id === Number(id)) || null;
  },

  add(vehicle) {
    const all = this.getAll();
    const id = all.length ? Math.max(...all.map(v => v.id)) + 1 : 1;
    const newVehicle = { ...vehicle, id };
    all.push(newVehicle);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return newVehicle;
  },

  update(id, updates) {
    const all = this.getAll();
    const idx = all.findIndex(v => v.id === Number(id));
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...updates, id: Number(id) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[idx];
  },

  remove(id) {
    const all = this.getAll().filter(v => v.id !== Number(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    return this.getAll();
  },
};

// ---------- Helpers used by both pages ----------
const fmt = (n) => '$' + Number(n).toLocaleString();
const miles = (n) => Number(n).toLocaleString() + ' mi';
const titleOf = (v) => `${v.year} ${v.make} ${v.model}${v.trim ? ' ' + v.trim : ''}`;

// Convert uploaded File to base64 data URL (so it can live in localStorage for the demo).
// In production (Supabase), this gets replaced with a real upload to storage.
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
