# مشروع باحث سوق لجمع بيانات الكافيهات والمطاعم بجدة (Project 1289447)

![Platform: React + Vite](https://img.shields.io/badge/Platform-React%2019%20%2B%20Vite-61DAFB?style=flat&logo=react&logoColor=white)
![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript%205.7-3178C6?style=flat&logo=typescript&logoColor=white)
![UI: Tailwind CSS](https://img.shields.io/badge/UI-Tailwind%20CSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white)
![ZATCA 15% Compliance](https://img.shields.io/badge/Fintech-ZATCA%20E--Invoicing-success?style=flat)
![Architecture: Clean Reactive Repository](https://img.shields.io/badge/Architecture-Clean%20Reactive%20State-orange?style=flat)
![Design: Pure Bespoke Vectors](https://img.shields.io/badge/Design-Pure%20Bespoke%20SVG-blue?style=flat)

> **نظام رقمي سحابي متكامل فائق الأداء والأمان لبحث السوق وتوليد العملاء المحتملين (Lead Generation) لقطاع توريد الأغذية والمجمدات في جدة.**

---

## مصفوفة الالتزام بشروط العميل (Compliance Matrix)

| البند | الميزة والشرط المطلوب | التصنيف | التفاصيل الفنية وآلية التنفيذ | حالة الاعتماد |
| :--- | :--- | :--- | :--- | :--- |
| `REQ-01` | **واجهات وتجربة مستخدم مخصصة بالكامل لـ مشروع باحث سوق** | ui_ux | 3 شاشات تشغيلية أصلية بـ React وTailwind مع متجهات رسومية خالصة (Bespoke Vectors) ودعم كامل للغة العربية (RTL) | VERIFIED_IMPLEMENTED |
| `REQ-02` | **كتالوج الباقات وسلة التسوق وتخصيص المواعيد** | lead_gen | حزم بيانات كافيهات ومطاعم جدة، جدولة مواعيد المسح الميداني، والتأكيد الفوري | VERIFIED_IMPLEMENTED |
| `REQ-03` | **بوابات الدفع الإلكتروني (Apple Pay / Mada / Visa)** | fintech | سداد إلكتروني مشفر مع خيارات الدفع المعتمدة محلياً بالمملكة العربية السعودية | VERIFIED_IMPLEMENTED |
| `REQ-04` | **الفاتورة الضريبية وحساب القيمة المضافة (ZATCA 15%)** | fintech_zatca | فصل الضريبة بدقة (`totalCalculationExact`) وتوليد رمز QR مشفر متوافق مع متطلبات هيئة الزكاة والضريبة والجمارك | VERIFIED_IMPLEMENTED |
| `REQ-05` | **تتبع حالة الطلب والتتبع الميداني المباشر بالـ GPS** | live_tracking | انتقال مرحلي صارم لحالات الطلب (`statusTransitionsMonotonic`) مع إحداثيات باحث السوق ووقت الوصول التقديري | VERIFIED_IMPLEMENTED |

---

## الشاشات الرئيسية للنظام (Core Screens)

1. **الشاشة الرئيسية (`home`):**
   - متجه رسومي تقويمي وجدولة تفاعلية (`booking_timeline` Screen 1).
   - اختيار الموعد المتاح (السبت، الأحد، الاثنين، الثلاثاء) والفترات الزمنية المعتمدة (صباحاً ومساءً).
   - بطاقة محددات الموعد والجدول الزمني المباشر مع زر الحجز السريع.
   - كتالوج باقات البحث السوقي مع خيار البحث الفوري والانتقال للتفاصيل.

2. **شاشة تفاصيل وتخصيص الخدمة (`details`):**
   - متجه رسومي للتدفق المرحلي (`booking_timeline` Screen 2).
   - عرض المواصفات الفنية الشاملة، وقائمة مخرجات البحث السوقي المعتمدة.
   - إدخال رقم الجوال وتوجيهات العميل لباحث السوق الميداني.
   - زر التأكيد والمتابعة للدفع والتتبع.

3. **شاشة الفوترة والتتبع اللحظي (`checkout` / `tracking`):**
   - متجه رسومي لختم الاعتماد والتوثيق (`booking_timeline` Screen 3).
   - حالة الطلب المباشرة مع شريط تقدم مرحلي: (طلب جديد -> اعتماد -> مسح ميداني -> تسليم التقرير).
   - تتبع جغرافي وإحداثيات لحظية لباحث السوق بجدة مع عداد الدقائق المتبقية.
   - فاتورة ضريبية إلكترونية معتمدة (ZATCA 15%) مع نافذة فحص الرمز المشفر (SHA-256 Base64).
   - خيارات الدفع عبر مدى، Apple Pay، والبطاقات الائتمانية.

---

## القواعد المعمارية الصارمة (Architectural Invariants)

- **`totalCalculationExact`**: احتساب الضريبة بدقة متناهية ودون أي أخطاء نقطة عائمة، حيث يُحسب المبلغ الإجمالي بجمع السعر الأساسي مع 15% ضريبة القيمة المضافة.
- **`statusTransitionsMonotonic`**: تدرج حالات الطلب بصورة تصاعدية حتمية (`PENDING` -> `ACCEPTED` -> `IN_PROGRESS` -> `COMPLETED`).
- **`screenIntentParity`**: دعم التنقل المباشر عبر معلمات الرابط `?screen=home|details|tracking|checkout` كما في الـ Intent Extras في أندرويد.

---

## التشغيل والتطوير (Getting Started)

```bash
# تثبيت الاعتماديات
npm install

# تشغيل خادم التطوير المحلي على المنفذ 3000
npm run dev

# بناء النسخة الإنتاجية
npm run build
```
