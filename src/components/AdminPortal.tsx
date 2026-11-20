import React, { useState } from 'react';
import { VillageConfig, WasteRecord, saveStoredConfig, saveStoredWasteRecords } from '../lib/config';
import { calculateWasteTotals, formatNumber } from '../lib/data';
import { Settings, PlusCircle, Database, Edit3, CheckCircle, AlertCircle, Calendar, Trash2, Filter } from 'lucide-react';

interface AdminPortalProps {
  config: VillageConfig;
  setConfig: React.Dispatch<React.SetStateAction<VillageConfig>>;
  wasteRecords: WasteRecord[];
  setWasteRecords: React.Dispatch<React.SetStateAction<WasteRecord[]>>;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  config,
  setConfig,
  wasteRecords,
  setWasteRecords,
}) => {
  // Tab within admin: 'waste' | 'village'
  const [adminSubTab, setAdminSubTab] = useState<'waste' | 'village'>('waste');

  // Waste form state
  const todayStr = new Date().toISOString().split('T')[0];
  const [formDate, setFormDate] = useState(todayStr);
  const [wetKg, setWetKg] = useState<number>(50);
  const [dryKg, setDryKg] = useState<number>(30);
  const [plasticKg, setPlasticKg] = useState<number>(15);
  const [wasteSuccessMsg, setWasteSuccessMsg] = useState('');
  const [wasteErrorMsg, setWasteErrorMsg] = useState('');

  // Village edit form state
  const [editPopulation, setEditPopulation] = useState(config.population);
  const [editHouses, setEditHouses] = useState(config.houses);
  const [editMale, setEditMale] = useState(config.maleCount);
  const [editFemale, setEditFemale] = useState(config.femaleCount);
  const [editSarpanch, setEditSarpanch] = useState(config.sarpanchName);
  const [editSevak, setEditSevak] = useState(config.gramSevakName);
  const [villageSuccessMsg, setVillageSuccessMsg] = useState('');
  const [villageErrorMsg, setVillageErrorMsg] = useState('');

  // Search/Filter for records
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Waste Form Submit
  const handleSaveWaste = (e: React.FormEvent) => {
    e.preventDefault();
    setWasteSuccessMsg('');
    setWasteErrorMsg('');

    // Date validation: not in future
    if (formDate > todayStr) {
      setWasteErrorMsg('Error: Waste collection date cannot be in the future.');
      return;
    }

    if (wetKg < 0 || dryKg < 0 || plasticKg < 0) {
      setWasteErrorMsg('Error: Waste quantities cannot be negative.');
      return;
    }

    const newRecord: WasteRecord = {
      date: formDate,
      wetKg: Number(wetKg),
      dryKg: Number(dryKg),
      plasticKg: Number(plasticKg),
      hazardousKg: 0,
    };

    // Update or replace existing date record
    const existingIndex = wasteRecords.findIndex(r => r.date === formDate);
    let updatedRecords: WasteRecord[];
    if (existingIndex >= 0) {
      updatedRecords = [...wasteRecords];
      updatedRecords[existingIndex] = newRecord;
    } else {
      updatedRecords = [newRecord, ...wasteRecords].sort((a, b) => b.date.localeCompare(a.date));
    }

    setWasteRecords(updatedRecords);
    saveStoredWasteRecords(updatedRecords);
    setWasteSuccessMsg(`Successfully saved waste log for ${formDate}!`);
    setTimeout(() => setWasteSuccessMsg(''), 4000);
  };

  // Handle Delete Waste Record
  const handleDeleteRecord = (date: string) => {
    if (confirm(`Are you sure you want to delete waste record for ${date}?`)) {
      const updated = wasteRecords.filter(r => r.date !== date);
      setWasteRecords(updated);
      saveStoredWasteRecords(updated);
    }
  };

  // Handle Village Info Submit
  const handleSaveVillageInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setVillageSuccessMsg('');
    setVillageErrorMsg('');

    // Validation: male + female === population
    if (Number(editMale) + Number(editFemale) !== Number(editPopulation)) {
      setVillageErrorMsg(`Validation Error: Male count (${editMale}) + Female count (${editFemale}) must equal Total Population (${editPopulation}). Sum is ${Number(editMale) + Number(editFemale)}.`);
      return;
    }

    const updatedConfig: VillageConfig = {
      ...config,
      population: Number(editPopulation),
      houses: Number(editHouses),
      maleCount: Number(editMale),
      femaleCount: Number(editFemale),
      sarpanchName: editSarpanch,
      gramSevakName: editSevak,
      lastUpdated: todayStr,
    };

    setConfig(updatedConfig);
    saveStoredConfig(updatedConfig);
    setVillageSuccessMsg('Village demographic records and leadership info successfully updated!');
    setTimeout(() => setVillageSuccessMsg(''), 4000);
  };

  const totals = calculateWasteTotals(wasteRecords);
  const filteredRecords = wasteRecords.filter(r => r.date.includes(searchTerm));

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-md flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-emerald-100 text-xs font-semibold mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Gram Sevak & Panchayat Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mukta">Daily Waste Logging & Village Administration</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Manage daily waste collection logs and update official village statistics for Morgaon Digras.
            </p>
          </div>

          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setAdminSubTab('waste')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${adminSubTab === 'waste' ? 'bg-forest text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Daily Waste Logger
            </button>
            <button
              onClick={() => setAdminSubTab('village')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${adminSubTab === 'village' ? 'bg-forest text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Village Statistics
            </button>
          </div>
        </div>

        {/* SUBTAB 1: DAILY WASTE LOGGER */}
        {adminSubTab === 'waste' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Logger Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold font-mukta text-slate-900 mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-forest" />
                <span>Log Daily Waste (kg)</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Saving a date automatically updates or replaces existing data for that date.
              </p>

              {wasteSuccessMsg && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{wasteSuccessMsg}</span>
                </div>
              )}

              {wasteErrorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{wasteErrorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveWaste} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Collection Date</label>
                  <input
                    type="date"
                    value={formDate}
                    max={todayStr}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Wet Waste (Biodegradable) [kg]</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={wetKg}
                    onChange={(e) => setWetKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dry Recyclable Waste [kg]</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={dryKg}
                    onChange={(e) => setDryKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Plastic Waste [kg]</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={plasticKg}
                    onChange={(e) => setPlasticKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>



                <button
                  type="submit"
                  className="w-full py-3 bg-forest text-white font-semibold rounded-xl text-sm hover:bg-emerald-800 transition-colors shadow-sm"
                >
                  Save Daily Waste Log
                </button>
              </form>
            </div>

            {/* Right: Records Table & Filter */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-mukta text-slate-900">Logged Waste Records</h3>
                    <p className="text-xs text-slate-500">Showing {filteredRecords.length} recorded dates</p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Filter by date (YYYY-MM-DD)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-1.5 pl-9 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-forest w-60"
                    />
                    <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 bg-cream">
                        <th className="p-3">Date</th>
                        <th className="p-3 text-right">Wet (kg)</th>
                        <th className="p-3 text-right">Dry (kg)</th>
                        <th className="p-3 text-right">Plastic (kg)</th>
                        <th className="p-3 text-right">Haz (kg)</th>
                        <th className="p-3 text-right">Total (kg)</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {filteredRecords.map((rec) => {
                        const dayTotal = rec.wetKg + rec.dryKg + rec.plasticKg + rec.hazardousKg;
                        return (
                          <tr key={rec.date} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-semibold text-slate-900">{rec.date}</td>
                            <td className="p-3 text-right text-forest">{rec.wetKg}</td>
                            <td className="p-3 text-right text-blue-700">{rec.dryKg}</td>
                            <td className="p-3 text-right text-terracotta font-bold">{rec.plasticKg}</td>
                            <td className="p-3 text-right text-red-700">{rec.hazardousKg}</td>
                            <td className="p-3 text-right font-bold text-slate-900">{dayTotal}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleDeleteRecord(rec.date)}
                                title="Delete record"
                                className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredRecords.length === 0 && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400 text-xs">
                            No waste records found matching filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Summary Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs font-semibold text-slate-700 bg-emerald-50/50 p-4 rounded-xl">
                <span>Grand Total Tracked: <strong className="text-slate-900 font-mukta text-base">{totals.grandTotal} kg</strong></span>
                <span className="text-terracotta">Total Plastic: {totals.totalPlastic} kg</span>
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 2: VILLAGE STATISTICS & LEADERSHIP EDIT */}
        {adminSubTab === 'village' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-bold font-mukta text-slate-900 mb-2 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-forest" />
              <span>Update Village Demographics & Leadership</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Modify official population numbers, household count, and representative names. Note: Male + Female count must equal Total Population.
            </p>

            {villageSuccessMsg && (
              <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{villageSuccessMsg}</span>
              </div>
            )}

            {villageErrorMsg && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{villageErrorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveVillageInfo} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Total Population</label>
                  <input
                    type="number"
                    value={editPopulation}
                    onChange={(e) => setEditPopulation(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Total Households</label>
                  <input
                    type="number"
                    value={editHouses}
                    onChange={(e) => setEditHouses(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Male Count</label>
                  <input
                    type="number"
                    value={editMale}
                    onChange={(e) => setEditMale(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Female Count</label>
                  <input
                    type="number"
                    value={editFemale}
                    onChange={(e) => setEditFemale(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sarpanch Name</label>
                  <input
                    type="text"
                    value={editSarpanch}
                    onChange={(e) => setEditSarpanch(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gram Sevak Name</label>
                  <input
                    type="text"
                    value={editSevak}
                    onChange={(e) => setEditSevak(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-forest text-white font-semibold rounded-xl text-sm hover:bg-emerald-800 transition-colors shadow-sm"
              >
                Update Village Statistics
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
