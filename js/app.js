/**
 * =========================================================
 * PAWARTA.ID - APP LOGIC & INTERACTIVE CONTROLLER
 * FULL VERSION - BEBAS BUG & SIAP DEPLOY
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Validasi Keberadaan Configuration Data
  if (typeof CONFIG === "undefined") {
    console.error("Error: File js/data.js belum dimuat dengan benar.");
    return;
  }

  // 2. Set Nama Brand di Header & Footer Secara Otomatis
  const brandLogoText = document.getElementById("brand-logo-text");
  const footerBrandName = document.getElementById("footer-brand-name");
  
  if (brandLogoText) brandLogoText.innerText = CONFIG.brandName || "Pawarta.id";
  if (footerBrandName) footerBrandName.innerText = CONFIG.brandName || "Pawarta.id";

  // 3. Render Seluruh Komponen Halaman
  renderStats(CONFIG.stats || []);
  renderTemplates(CONFIG.templates || []);
  renderPortfolios(CONFIG.portfolios || []);
  renderPackages(CONFIG.packages || []);
  renderFaqs(CONFIG.faqs || []);
  initCalculator();

  // 4. Inisialisasi Feather Icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // 5. Jalankan Simulasi Toast Sales Notifikasi
  startSalesToast();
});

/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

// Mengonversi format harga string ("Rp 149.000" atau "149K") menjadi angka murni (149000)
function parsePrice(priceStr) {
  if (typeof priceStr === 'number') return priceStr;
  if (!priceStr) return 0;
  let cleanStr = priceStr.toString().replace(/[^0-9kK]/g, '');
  if (cleanStr.toLowerCase().endsWith('k')) {
    return parseInt(cleanStr) * 1000;
  }
  return parseInt(cleanStr) || 0;
}

// Scroll Mulus ke Elemen Formulir Pemesanan (#order-box)
function scrollToOrderBox() {
  const orderBox = document.getElementById("order-box");
  if (orderBox) {
    orderBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* =========================================================
   RENDER SECTION FUNCTIONS
   ========================================================= */

// 1. Render Stat Counter Hero
function renderStats(stats) {
  const container = document.getElementById("stats-container");
  if (!container) return;
  container.innerHTML = stats.map(s => `
    <div>
      <div class="text-2xl sm:text-3xl font-black text-slate-900 mb-1">${s.value}</div>
      <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">${s.label}</div>
    </div>
  `).join('');
}

// 2. Render Kartu Template Undangan
function renderTemplates(templates) {
  const container = document.getElementById("template-grid");
  if (!container) return;

  if (!templates || templates.length === 0) {
    container.innerHTML = `<p class="col-span-3 text-center py-10 text-xs text-slate-400">Template tidak ditemukan.</p>`;
    return;
  }

  container.innerHTML = templates.map(tpl => `
    <div class="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
      <div>
        <div class="relative overflow-hidden aspect-[4/3] bg-slate-100">
          <img src="${tpl.image}" alt="${tpl.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            ${tpl.badge || 'Popular'}
          </span>
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-base text-slate-900">${tpl.title}</h3>
            <span class="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">${tpl.price}</span>
          </div>
          <p class="text-xs text-slate-500 mb-4 leading-relaxed font-medium">${tpl.description}</p>
          
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${tpl.features ? tpl.features.map(f => `<span class="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-slate-500 font-medium">✓ ${f}</span>`).join('') : ''}
          </div>
        </div>
      </div>

      <div class="p-6 pt-0 flex gap-2">
        <button onclick="openDemoModal('${tpl.id}', '${tpl.title}', '${tpl.demoUrl}', '${tpl.categoryLabel}')" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-full text-xs font-bold transition">
          Live Demo
        </button>
        <button onclick="selectTemplateForOrder('${tpl.id}')" class="flex-1 text-center bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-full text-xs font-bold transition">
          Pilih Template
        </button>
      </div>
    </div>
  `).join('');
}

// Filter Kategori Template
function filterTemplates(category, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('bg-slate-900', 'text-white');
      btn.classList.add('bg-slate-100', 'text-slate-600');
    });
    btnElement.classList.remove('bg-slate-100', 'text-slate-600');
    btnElement.classList.add('bg-slate-900', 'text-white');
  }

  if (category === 'all') {
    renderTemplates(CONFIG.templates);
  } else {
    const filtered = CONFIG.templates.filter(t => t.category === category);
    renderTemplates(filtered);
  }
}

// Pencarian Template Real-time
function handleSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase();
  const filtered = CONFIG.templates.filter(t => 
    t.title.toLowerCase().includes(query) || 
    t.description.toLowerCase().includes(query)
  );
  renderTemplates(filtered);
}

// 3. Render Portofolio Klien Real
function renderPortfolios(portfolios) {
  const container = document.getElementById("portfolio-grid");
  if (!container) return;
  container.innerHTML = portfolios.map(port => `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition">
      <img src="${port.image}" alt="${port.title}" class="w-full h-48 object-cover">
      <div class="p-6">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">${port.category}</span>
        <h3 class="font-bold text-base mb-1 text-slate-900">${port.title}</h3>
        <p class="text-xs text-slate-500 mb-4 font-medium">${port.views}</p>
        <a href="${port.demoUrl}" target="_blank" class="text-xs font-bold text-slate-900 hover:underline inline-flex items-center gap-1">
          Lihat Hasil Undangan →
        </a>
      </div>
    </div>
  `).join('');
}

// 4. Render Paket Layanan & Harga
function renderPackages(packages) {
  const container = document.getElementById("package-grid");
  if (!container) return;
  container.innerHTML = packages.map(pkg => `
    <div class="bg-white rounded-3xl p-8 border ${pkg.featured ? 'border-2 border-slate-900 shadow-xl relative' : 'border-slate-200'} flex flex-col justify-between">
      ${pkg.featured ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">Paling Populer</span>' : ''}
      <div>
        <h3 class="text-xl font-bold mb-1 text-slate-900">${pkg.name}</h3>
        <p class="text-xs text-slate-400 mb-4 font-medium">${pkg.description}</p>
        <div class="text-3xl font-black text-slate-900 mb-6">${pkg.priceFormatted}</div>
        <ul class="space-y-3 text-xs text-slate-600 mb-8 font-medium">
          ${pkg.features.map(f => `<li class="flex items-center gap-2">✓ ${f}</li>`).join('')}
        </ul>
      </div>
      <button onclick="scrollToOrderBox()" class="block text-center w-full ${pkg.featured ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} py-3.5 rounded-full text-xs font-bold transition">
        Pilih ${pkg.name}
      </button>
    </div>
  `).join('');
}

// 5. Render Pertanyaan Umum (FAQ Accordion)
function renderFaqs(faqs) {
  const container = document.getElementById("faq-container");
  if (!container) return;
  container.innerHTML = faqs.map((faq, idx) => `
    <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      <button onclick="toggleFaq(${idx})" class="w-full text-left p-5 text-xs font-bold text-slate-900 flex justify-between items-center">
        <span>${faq.q}</span>
        <i data-feather="chevron-down" id="faq-icon-${idx}" class="w-4 h-4 transition-transform"></i>
      </button>
      <div id="faq-ans-${idx}" class="hidden p-5 pt-0 text-xs text-slate-500 leading-relaxed font-medium border-t border-slate-100">
        ${faq.a}
      </div>
    </div>
  `).join('');
  if (typeof feather !== "undefined") feather.replace();
}

function toggleFaq(idx) {
  const ans = document.getElementById(`faq-ans-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);
  if (ans && icon) {
    ans.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
  }
}

/* =========================================================
   CALCULATOR & ORDER FORM LOGIC
   ========================================================= */

function initCalculator() {
  const tplSelect = document.getElementById("calc-template");
  const addonList = document.getElementById("addon-list");
  if (!tplSelect || !addonList) return;

  // Render Pilihan Template Dropdown
  tplSelect.innerHTML = CONFIG.templates.map(t => {
    const numericPrice = parsePrice(t.price);
    return `<option value="${t.id}" data-price="${numericPrice}">${t.title} (${t.categoryLabel}) - ${t.price}</option>`;
  }).join('');

  // Render Checklist Add-On
  addonList.innerHTML = CONFIG.addons.map(a => `
    <label class="flex items-center gap-2.5 p-3.5 bg-white rounded-xl border border-slate-200 text-xs cursor-pointer hover:border-slate-900 transition">
      <input type="checkbox" value="${a.id}" data-price="${a.price}" onchange="updateCalculator()" class="rounded border-slate-300">
      <span class="font-semibold text-slate-700">${a.name} (+Rp ${a.price.toLocaleString('id-ID')})</span>
    </label>
  `).join('');

  updateCalculator();
}

// Fungsi Pemicu Utama Saat Tombol "Pilih Template" Diklik
function selectTemplateForOrder(templateIdentifier) {
  const tplSelect = document.getElementById("calc-template");
  if (!tplSelect) return;

  // Cari berdasarkan ID atau Nama Template
  const targetTpl = CONFIG.templates.find(t => 
    t.id === templateIdentifier || t.title.toLowerCase() === templateIdentifier.toLowerCase()
  );

  if (targetTpl) {
    tplSelect.value = targetTpl.id;
  } else if (templateIdentifier) {
    tplSelect.value = templateIdentifier;
  }

  // Perbarui total harga secara instan
  updateCalculator();

  // Scroll halus ke form order
  scrollToOrderBox();
}

// Perhitungan Harga Real-time (Harga Template + Total Addons)
function updateCalculator() {
  const tplSelect = document.getElementById("calc-template");
  if (!tplSelect) return;

  const selectedTplOpt = tplSelect.options[tplSelect.selectedIndex];
  const tplPrice = parseInt(selectedTplOpt ? selectedTplOpt.getAttribute('data-price') : 0) || 0;

  let addonTotal = 0;
  document.querySelectorAll('#addon-list input[type="checkbox"]:checked').forEach(cb => {
    addonTotal += parseInt(cb.getAttribute('data-price')) || 0;
  });

  const total = tplPrice + addonTotal;

  const totalElem = document.getElementById("total-price");
  if (totalElem) {
    totalElem.innerText = `Rp ${total.toLocaleString('id-ID')}`;
  }
}

// Mengompilasi Pesan Rapi dan Mengirimkan ke WhatsApp Admin
function orderViaWhatsApp() {
  const tplSelect = document.getElementById("calc-template");
  if (!tplSelect) return;

  const selectedTpl = CONFIG.templates.find(t => t.id === tplSelect.value);
  
  let selectedAddons = [];
  document.querySelectorAll('#addon-list input[type="checkbox"]:checked').forEach(cb => {
    const addonObj = CONFIG.addons.find(a => a.id === cb.value);
    if (addonObj) selectedAddons.push(addonObj.name);
  });

  const totalPrice = document.getElementById("total-price") ? document.getElementById("total-price").innerText : "Rp 0";

  let text = `Halo Admin *${CONFIG.brandName || 'Pawarta.id'}*, 👋\n\n`;
  text += `Saya tertarik untuk memesan pembuatan *Undangan Digital*. Berikut detail pesanan saya:\n\n`;
  text += `─────────────────────────\n`;
  text += `📌 *DETAIL PESANAN UNDANGAN*\n`;
  text += `─────────────────────────\n`;
  text += `🎨 *Template:* ${selectedTpl ? selectedTpl.title : '-'} (${selectedTpl ? selectedTpl.categoryLabel : '-'})\n`;
  
  if (selectedAddons.length > 0) {
    text += `➕ *Fitur Tambahan (Add-On):*\n`;
    selectedAddons.forEach(addon => {
      text += `   • ${addon}\n`;
    });
  } else {
    text += `➕ *Fitur Tambahan:* Tidak Ada\n`;
  }
  
  text += `─────────────────────────\n`;
  text += `💰 *TOTAL BIAYA:* ${totalPrice}\n`;
  text += `─────────────────────────\n\n`;
  text += `Mohon info petunjuk pembayaran dan formulir pengisian data undangannya ya. Terima kasih! 🙏`;

  const waNumber = CONFIG.whatsappNumber || "6281234567890";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

/* =========================================================
   MODAL LIVE DEMO SIMULATOR CONTROLLER
   ========================================================= */

let currentModalTemplateId = "";

function openDemoModal(templateId, title, url, categoryLabel) {
  currentModalTemplateId = templateId;
  
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalFullDemo = document.getElementById("modal-full-demo");
  const demoModal = document.getElementById("demo-modal");

  if (modalTitle) modalTitle.innerText = title;
  if (modalCategory) modalCategory.innerText = categoryLabel || "LIVE DEMO";
  if (modalFullDemo) modalFullDemo.href = url || "#";
  if (demoModal) demoModal.classList.remove("hidden");
}

function selectFromModal() {
  closeDemoModal();
  if (currentModalTemplateId) {
    selectTemplateForOrder(currentModalTemplateId);
  }
}

function closeDemoModal() {
  const demoModal = document.getElementById("demo-modal");
  if (demoModal) demoModal.classList.add("hidden");
}

/* =========================================================
   FLOATING WHATSAPP & TOAST NOTIFICATION CONTROLLER
   ========================================================= */

function toggleWaPopup() {
  const waPopup = document.getElementById("wa-popup");
  if (waPopup) waPopup.classList.toggle("hidden");
}

function directWa(customMessage) {
  const waNumber = CONFIG.whatsappNumber || "6281234567890";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(customMessage)}`;
  window.open(waUrl, '_blank');
}

// Simulasi Toast Sales Notifikasi Real-time
function startSalesToast() {
  if (!CONFIG.recentSales || CONFIG.recentSales.length === 0) return;

  setInterval(() => {
    const randomSale = CONFIG.recentSales[Math.floor(Math.random() * CONFIG.recentSales.length)];
    const titleElem = document.getElementById("toast-title");
    const descElem = document.getElementById("toast-desc");
    const toast = document.getElementById("sales-toast");

    if (titleElem && descElem && toast) {
      titleElem.innerText = `${randomSale.name} (${randomSale.city})`;
      descElem.innerText = `Baru saja memesan ${randomSale.item}`;
      
      toast.classList.remove("hidden");
      toast.classList.add("animate-toast");

      setTimeout(() => {
        toast.classList.add("hidden");
        toast.classList.remove("animate-toast");
      }, 5000);
    }
  }, 18000);
}