export interface VillageConfig {
  name: string;
  district: string;
  state: string;
  pincode: string;
  population: number;
  houses: number;
  maleCount: number;
  femaleCount: number;
  sarpanchName: string;
  gramSevakName: string;
  latitude: number;
  longitude: number;
  lastUpdated: string;
}

export interface WasteRecord {
  date: string; // YYYY-MM-DD
  wetKg: number;
  dryKg: number;
  plasticKg: number;
  hazardousKg: number;
}

export const DEFAULT_VILLAGE_CONFIG: VillageConfig = {
  name: "Morgaon Digras",
  district: "Buldhana",
  state: "Maharashtra",
  pincode: "444312",
  population: 3420,
  houses: 780,
  maleCount: 1765,
  femaleCount: 1655,
  sarpanchName: "Smt. Shantabai R. Deshmukh",
  gramSevakName: "Shri. Vijay K. Jadhav",
  latitude: 20.811684,
  longitude: 76.557083,
  lastUpdated: "2026-11-20",
};

export const DEFAULT_WASTE_RECORDS: WasteRecord[] = [];

export const MONTHLY_PLASTIC_TREND: { month: string; plasticKg: number }[] = [];

export const HOUSING_TECH_DETAILS = [
  {
    title: "Stabilised Earth Blocks (CSEB)",
    description: "Locally sourced black cotton soil blended with 5% cement/lime and compressed using hydraulic presses. Reduces carbon footprint by 70% compared to traditional red fired bricks.",
    icon: "Layers",
  },
  {
    title: "Treated Bamboo Framing & Trusses",
    description: "Boron-treated native bamboo poles utilized for roof trusses and lintels. Provides high tensile strength, earthquake resilience, and zero deforestation impact.",
    icon: "TreePine",
  },
  {
    title: "Thermal Insulation & Natural Plaster",
    description: "Lime-mud exterior plaster breathes naturally, keeping indoor temperatures 4-6°C cooler during peak Vidarbha summer heat while preventing moisture seepage.",
    icon: "Sun",
  },
  {
    title: "Rainwater Harvesting Integration",
    description: "Every sustainable low-cost model home features integrated rooftop rainwater recharge wells, securing independent water resilience for households.",
    icon: "Droplets",
  },
];

// LocalStorage Persistence Helpers
const CONFIG_KEY = 'ecogram_village_config_v1';
const WASTE_KEY = 'ecogram_waste_records_v1';

export function getStoredConfig(): VillageConfig {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      const parsed: VillageConfig = JSON.parse(saved);
      if (parsed.pincode === "443201" || !parsed.pincode || parsed.latitude === 20.5350) {
        parsed.pincode = "444312";
        parsed.latitude = 20.811684;
        parsed.longitude = 76.557083;
        localStorage.setItem(CONFIG_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.error("Error loading config from localStorage", e);
  }
  return DEFAULT_VILLAGE_CONFIG;
}

export function saveStoredConfig(config: VillageConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Error saving config to localStorage", e);
  }
}

export function getStoredWasteRecords(): WasteRecord[] {
  try {
    const saved = localStorage.getItem(WASTE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error loading waste records from localStorage", e);
  }
  return DEFAULT_WASTE_RECORDS;
}

export function saveStoredWasteRecords(records: WasteRecord[]): void {
  try {
    localStorage.setItem(WASTE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error("Error saving waste records to localStorage", e);
  }
}
