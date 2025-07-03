# Dr.J Dental Clinic - Multi-Page Website

## وصف المشروع | Project Description

موقع ويب متعدد الصفحات لعيادة د. جوستينا لطب الأسنان، يقدم خدمات طب الأسنان بأعلى معايير الجودة والاحترافية. الموقع ثنائي اللغة (العربية والإنجليزية) ويوفر معلومات شاملة عن العيادة وخدماتها وساعات العمل ومعرض الأعمال والمدونة الطبية.

A multi-page website for Dr. Justina's Dental Clinic, offering dental services with the highest standards of quality and professionalism. The site is bilingual (Arabic and English) and provides comprehensive information about the clinic, its services, working hours, work gallery, and medical blog.

## بنية المشروع | Project Structure

```
dr.joss/
├── pages/                      # صفحات الموقع | Website Pages
│   ├── index.html             # الصفحة الرئيسية | Home Page
│   ├── about.html             # صفحة من نحن | About Us Page
│   ├── services.html          # صفحة الخدمات | Services Page
│   ├── hours.html             # صفحة ساعات العمل | Working Hours Page
│   ├── contact.html           # صفحة التواصل والحجز | Contact & Booking Page
│   ├── gallery.html           # صفحة المعرض | Gallery Page
│   └── blog.html              # صفحة المدونة | Blog Page
├── assets/                     # الملفات المساعدة | Assets
│   ├── css/                   # ملفات التنسيق | CSS Files
│   │   ├── style.css          # التنسيق الرئيسي | Main Styles
│   │   └── responsive.css     # التنسيق المتجاوب | Responsive Styles
│   ├── js/                    # ملفات JavaScript
│   │   ├── main.js            # الوظائف الرئيسية | Main Functions
│   │   └── gallery.js         # وظائف المعرض | Gallery Functions
│   └── images/                # الصور | Images
│       ├── الصورة الشخصية.jpg
│       ├── طب أسنان الأطفال.jpg
│       ├── تنظيف و تقليح .jpg
│       ├── معالجات لبية.jpg
│       ├── قلع الأسنان.jpg
│       ├── ترميمات تجميلية.jpg
│       ├── جراحة و زرع الأسنان .jpg
│       └── تقويم الأسنان .jpg
├── index.html                  # الملف الأصلي (للمرجع)
└── README.md                   # ملف التوثيق
```

## المميزات | Features

### 🌐 **متعدد الصفحات | Multi-Page**
- صفحات منفصلة لكل قسم مع URLs مخصصة
- تنقل سهل وسريع بين الصفحات
- بنية احترافية ومنظمة

### 🌍 **ثنائي اللغة | Bilingual**
- دعم كامل للعربية والإنجليزية
- تبديل سهل بين اللغات
- اتجاه النص التلقائي (RTL/LTR)

### 📱 **تصميم متجاوب | Responsive Design**
- يعمل بشكل مثالي على جميع الأجهزة
- تحسين خاص للهواتف المحمولة
- قوائم تنقل متكيفة

### 🎨 **تصميم حديث | Modern Design**
- واجهة مستخدم جذابة وعصرية
- ألوان طبية مهدئة
- تأثيرات بصرية ناعمة

### 📋 **صفحات متخصصة | Specialized Pages**

#### 🏠 **الصفحة الرئيسية | Home Page**
- مقدمة ترحيبية
- نظرة عامة على الخدمات
- معاينة سريعة للطبيبة

#### 👩‍⚕️ **صفحة من نحن | About Page**
- معلومات مفصلة عن د. جوستينا
- المؤهلات والخبرات
- قيم ومبادئ العيادة

#### 🦷 **صفحة الخدمات | Services Page**
- قائمة شاملة بجميع الخدمات
- تفاصيل كل خدمة
- خدمات الطوارئ

#### ⏰ **صفحة ساعات العمل | Hours Page**
- جدول أسبوعي مفصل
- معلومات الحجز
- نصائح للمرضى

#### 📞 **صفحة التواصل | Contact Page**
- نموذج حجز تفاعلي
- معلومات التواصل
- الأسئلة الشائعة

#### 🖼️ **صفحة المعرض | Gallery Page**
- معرض أعمال مصنف
- صور قبل وبعد العلاج
- معرض الأجهزة والمعدات

#### 📝 **صفحة المدونة | Blog Page**
- مقالات طبية تثقيفية
- نصائح للعناية بالأسنان
- اشتراك في النشرة الطبية

### 🔧 **وظائف متقدمة | Advanced Features**

#### 📱 **تكامل WhatsApp**
- حجز المواعيد عبر WhatsApp
- تواصل سريع ومباشر
- رسائل تلقائية منسقة

#### 🖼️ **معرض تفاعلي**
- عرض الصور بحجم كامل
- تصفية حسب نوع العلاج
- تنقل بالكيبورد والإيماءات

#### ✅ **نماذج ذكية**
- التحقق من صحة البيانات
- رسائل خطأ واضحة
- تجربة مستخدم محسنة

#### 🎯 **تحسين الأداء**
- تحميل الصور التدريجي
- ضغط وتحسين الملفات
- سرعة تحميل عالية

## كيفية الاستخدام | How to Use

### 🚀 **التشغيل المحلي | Local Development**

1. **تحميل المشروع | Download Project**
   ```bash
   git clone [repository-url]
   cd dr.joss
   ```

2. **فتح الموقع | Open Website**
   - افتح `pages/index.html` في المتصفح
   - أو استخدم خادم محلي:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

3. **الوصول للموقع | Access Website**
   - افتح المتصفح وانتقل إلى `http://localhost:8000/pages/`


## التخصيص | Customization

### 🎨 **تعديل الألوان | Color Customization**
```css
/* في ملف assets/css/style.css */
:root {
    --primary-color: #2c5aa0;
    --secondary-color: #4a90e2;
    --accent-color: #ff6b6b;
    --text-color: #333;
    --background-color: #f8f9fa;
}
```


## المتطلبات التقنية | Technical Requirements

### 🌐 **المتصفحات المدعومة | Supported Browsers**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 📱 **الأجهزة المدعومة | Supported Devices**
- أجهزة الكمبيوتر المكتبية
- الأجهزة اللوحية
- الهواتف الذكية
- شاشات عالية الدقة

### ⚡ **الأداء | Performance**
- سرعة تحميل أقل من 3 ثوانٍ
- نقاط Core Web Vitals ممتازة
- تحسين SEO كامل

## الترخيص | License

هذ�� المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## المطور | Developer

**Habeeb Andraws**
- الموقع الشخصي | Portfolio: [habeebandraws.vercel.app](https://habeebandraws.vercel.app/)
- البريد الإلكتروني | Email: [contact@habeebandraws.com](mailto:contact@habeebandrew4.com)

---

## إصدارات المشروع | Project Versions

### v2.0.1 (الحالي | Current)
- ✅ تحويل إلى موقع متعدد الصفحات
- ✅ بنية ملفات محسنة
- ✅ تحسين الأداء والسرعة
- ✅ إضافة وظائف جديدة
- ✅ تحديث صفحة المعرض: تم تعليق قسم "قبل وبعد العلاج"

### v2.0.0 (السابق | Previous)
- ✅ موقع صفحة واحدة
- ✅ تصميم أساسي
- ✅ وظائف أساسية

---

**تم التصميم والتطوير بعناية لتقديم أفضل تجربة للمرضى والزوار**

**Carefully designed and developed to provide the best experience for patients and visitors**