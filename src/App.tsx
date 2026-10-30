import React, { useState, useEffect } from 'react';
import { FnbLead, OrderRequest, CatalogItem } from './types/order';
import { repository } from './data/orderRepository';
import { OrderRequestHomeScreen } from './screens/OrderRequestHomeScreen';
import { OrderRequestDetailsScreen } from './screens/OrderRequestDetailsScreen';
import { OrderRequestCheckoutScreen } from './screens/OrderRequestCheckoutScreen';
import {
  Smartphone,
  Monitor,
  Database,
  SlidersHorizontal,
  Compass,
  FileCheck2,
  ShieldCheck,
  Building2,
  ThermometerSnowflake
} from 'lucide-react';

export function App() {
  const [activeOrder, setActiveOrder] = useState<OrderRequest | null>(() => repository.getActiveRequest());
  const [selectedLead, setSelectedLead] = useState<FnbLead | null>(() => repository.getLeads()[0] || null);

  // Screen routing from query param or default to "home"
  const getInitialScreen = (): string => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryScreen = params.get('screen') || params.get('start_screen');
      if (queryScreen === 'details' || queryScreen === 'checkout' || queryScreen === 'tracking') {
        return queryScreen;
      }
    } catch {
      // fallback
    }
    return 'home';
  };

  const [currentScreen, setCurrentScreen] = useState<string>(getInitialScreen);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false); // default to full desktop dashboard view for B2B

  // Sync screen changes with browser history/URL params without full reload
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', currentScreen);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  }, [currentScreen]);

  const handleInspectLead = (lead: FnbLead) => {
    setSelectedLead(lead);
    setCurrentScreen('details');
  };

  const handleStartCustomCampaign = () => {
    setCurrentScreen('details');
  };

  const handleProceedCheckout = (
    packageId: string,
    companyName: string,
    phone: string,
    selectedDistricts: string[],
    selectedSectors: string[],
    notes: string
  ) => {
    const newOrder = repository.submitNewCampaign(
      packageId,
      companyName,
      phone,
      selectedDistricts,
      selectedSectors,
      notes
    );
    setActiveOrder({ ...newOrder });
    setCurrentScreen('checkout');
  };

  const handleAdvanceStatus = (orderId: string) => {
    const updated = repository.advanceOrderStatus(orderId);
    if (updated) {
      setActiveOrder({ ...updated });
    }
  };

  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 flex flex-col font-['Tajawal',sans-serif]">
      {/* Top Professional Switcher Bar (Mobile Frame / Full Desktop & Screen Tabs) */}
      <nav className="bg-[#0B1120] border-b border-slate-800 px-4 md:px-8 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-extrabold text-white text-sm">رادار توريد جدة</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline font-mono font-medium" dir="ltr">
            Jeddah HORECA Leads Engine
          </span>
        </div>

        {/* 3 Screen Navigation Tabs */}
        <div className="flex items-center bg-[#111827] p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setCurrentScreen('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              currentScreen === 'home'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>1. مستكشف المنشآت</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('details')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              currentScreen === 'details'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>2. تخصيص الحملة والملف</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('checkout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              currentScreen === 'checkout' || currentScreen === 'tracking'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3. المتابعة والفوترة (ZATCA)</span>
          </button>
        </div>

        {/* Responsive Layout Toggle */}
        <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setIsMobileFrame(false)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              !isMobileFrame
                ? 'bg-slate-800 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="عرض لوحة التحكم المتكاملة (Desktop SaaS Dashboard)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">لوحة SaaS كاملة</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileFrame(true)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              isMobileFrame
                ? 'bg-slate-800 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="وضع إطار الموبايل (1080x2400 Phone Preview)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">إطار الجوال</span>
          </button>
        </div>
      </nav>

      {/* Main Viewport Container */}
      <div className={`flex-1 flex justify-center ${isMobileFrame ? 'p-0 md:p-8 items-center bg-[#050811]' : 'p-0'}`}>
        <div
          className={
            isMobileFrame
              ? 'w-full max-w-[430px] min-h-[760px] max-h-[920px] bg-[#0B1120] shadow-2xl rounded-none md:rounded-[40px] border-0 md:border-8 md:border-slate-800 overflow-y-auto overflow-x-hidden relative'
              : 'w-full min-h-screen bg-[#0B1120]'
          }
        >
          {currentScreen === 'home' && (
            <OrderRequestHomeScreen
              onInspectLead={handleInspectLead}
              onStartCustomCampaign={handleStartCustomCampaign}
              onOpenTracking={() => setCurrentScreen('checkout')}
              hasActiveOrder={Boolean(activeOrder)}
            />
          )}

          {currentScreen === 'details' && (
            <OrderRequestDetailsScreen
              activeLead={selectedLead}
              onBack={() => setCurrentScreen('home')}
              onProceedCheckout={handleProceedCheckout}
            />
          )}

          {(currentScreen === 'checkout' || currentScreen === 'tracking') && (
            <OrderRequestCheckoutScreen
              order={activeOrder}
              onBack={() => setCurrentScreen('details')}
              onComplete={() => setCurrentScreen('home')}
              onAdvanceStatus={handleAdvanceStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
