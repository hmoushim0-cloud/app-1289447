import React, { useState, useEffect } from 'react';
import { CatalogItem, OrderRequest } from './types/order';
import { repository } from './data/orderRepository';
import { OrderRequestHomeScreen } from './screens/OrderRequestHomeScreen';
import { OrderRequestDetailsScreen } from './screens/OrderRequestDetailsScreen';
import { OrderRequestCheckoutScreen } from './screens/OrderRequestCheckoutScreen';
import { Smartphone, Monitor, Home, FileText, Compass, CheckCircle } from 'lucide-react';

export function App() {
  const catalog = repository.getAvailableCatalog();
  const [activeOrder, setActiveOrder] = useState<OrderRequest | null>(() => repository.getActiveRequest());
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(() => catalog[0] || null);
  const [selectedDay, setSelectedDay] = useState<string>('الأحد 15');
  const [selectedTime, setSelectedTime] = useState<string>('11:30 ص');

  // Determine initial screen from query parameter or default to "home"
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
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // Sync screen changes with browser history/URL params without full page reload
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', currentScreen);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  }, [currentScreen]);

  const handleSelectItem = (item: CatalogItem) => {
    setSelectedItem(item);
    setCurrentScreen('details');
  };

  const handleQuickCheckout = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
    const item = selectedItem || catalog[0];
    const newOrder = repository.submitRequest(item, '0501234567', day, time);
    setActiveOrder(newOrder);
    setCurrentScreen('checkout');
  };

  const handleProceedCheckoutFromDetails = (phone: string, notes: string) => {
    const item = selectedItem || catalog[0];
    const newOrder = repository.submitRequest(item, phone, selectedDay, selectedTime);
    setActiveOrder(newOrder);
    setCurrentScreen('checkout');
  };

  const handleAdvanceStatus = (orderId: string) => {
    const updated = repository.advanceOrderStatus(orderId);
    if (updated) {
      setActiveOrder({ ...updated });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Tajawal',sans-serif]">
      {/* Top Device Bar & Screen Switcher for Developer & User convenience */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
          <span className="font-bold text-slate-200">#1289447</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">
            مشروع باحث سوق لجمع بيانات الكافيهات والمطاعم
          </span>
        </div>

        {/* Screen quick tabs mirroring Android Activity intents */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            type="button"
            onClick={() => setCurrentScreen('home')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              currentScreen === 'home'
                ? 'bg-teal-700 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentScreen('details')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              currentScreen === 'details'
                ? 'bg-teal-700 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>التفاصيل</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentScreen('checkout')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              currentScreen === 'checkout' || currentScreen === 'tracking'
                ? 'bg-teal-700 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>التتبع والفوترة</span>
          </button>
        </div>

        {/* Viewport Frame Toggle */}
        <div className="hidden md:flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
          <button
            type="button"
            onClick={() => setIsMobileFrame(true)}
            className={`p-1.5 rounded transition ${
              isMobileFrame ? 'bg-slate-700 text-teal-400' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="وضع إطار الموبايل (1080x2400)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsMobileFrame(false)}
            className={`p-1.5 rounded transition ${
              !isMobileFrame ? 'bg-slate-700 text-teal-400' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="وضع ملء الشاشة المتجاوب"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 bg-slate-950">
        <div
          className={
            isMobileFrame
              ? 'w-full max-w-[420px] min-h-[750px] max-h-[920px] bg-slate-900 shadow-2xl rounded-none md:rounded-[36px] border-0 md:border-8 md:border-slate-800 overflow-y-auto overflow-x-hidden relative'
              : 'w-full max-w-4xl min-h-[600px] bg-slate-900 shadow-xl rounded-2xl border border-slate-800 overflow-y-auto overflow-x-hidden relative'
          }
        >
          {currentScreen === 'details' && (
            <OrderRequestDetailsScreen
              item={selectedItem}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              onBack={() => setCurrentScreen('home')}
              onProceedCheckout={handleProceedCheckoutFromDetails}
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

          {currentScreen === 'home' && (
            <OrderRequestHomeScreen
              catalog={catalog}
              selectedItem={selectedItem}
              onSelectItem={handleSelectItem}
              onQuickCheckout={handleQuickCheckout}
              onOpenTracking={() => setCurrentScreen('checkout')}
              hasActiveOrder={Boolean(activeOrder)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
