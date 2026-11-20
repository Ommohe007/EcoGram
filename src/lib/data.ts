import { WasteRecord } from './config';

export interface WasteTotals {
  totalWet: number;
  totalDry: number;
  totalPlastic: number;
  totalHazardous: number;
  grandTotal: number;
}

export function calculateWasteTotals(records: WasteRecord[]): WasteTotals {
  return records.reduce(
    (acc, curr) => {
      acc.totalWet += curr.wetKg;
      acc.totalDry += curr.dryKg;
      acc.totalPlastic += curr.plasticKg;
      acc.totalHazardous += curr.hazardousKg;
      acc.grandTotal += curr.wetKg + curr.dryKg + curr.plasticKg + curr.hazardousKg;
      return acc;
    },
    { totalWet: 0, totalDry: 0, totalPlastic: 0, totalHazardous: 0, grandTotal: 0 }
  );
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}
