/**
 * DATA KONFIGURASI WEBSITE UNDANGAN DIGITAL (FULL VERSION)
 * Edit file ini untuk mengubah data tanpa perlu menyentuh HTML atau CSS!
 */

const CONFIG = {
  // Informasi Brand & Kontak
  brandName: "Pawarta.Id",
  tagline: "Next-Gen Digital Invitation Platform",
  whatsappNumber: "62859126469320", // Format internasional tanpa angka 0 di depan (contoh: 6281234567890)
  instagramHandle: "@Pawarta.id",
  location: "Banyumas, Indonesia",

  // Stat Counter Section
  stats: [
    { label: "Undangan Terbuat", value: "2,450+" },
    { label: "Tamu Terjangkau", value: "180,000+" },
    { label: "Kepuasan Klien", value: "99.8%" },
    { label: "Respon Support", value: "< 10 Mnt" }
  ],

  // 1. DATA TEMPLATE UNDANGAN
  // Untuk menambah template baru, cukup salin satu objek { ... } di bawah ini
  templates: [
    

    {
      id: "minimalist-slate",
      title: "Minimalist Slate Gold",
      category: "pernikahan",
      categoryLabel: "Pernikahan",
      price: "Rp 169.000",
      badge: "New Release",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
      demoUrl: "/demo/minimalist-slate/",
      description: "Desain dark mode ultra-modern dengan sentuhan emas dan tipografi eksklusif.",
      features: ["Glassmorphism UI", "Dark Mode", "RSVP WhatsApp", "Google Maps"]
    },

    {
      id: "ethereal-pearl",
      title: "Ethereal Pearl Luxury",
      category: "pernikahan",
      categoryLabel: "Pernikahan",
      price: "Rp 179.000",
      badge: "Exclusive",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
      demoUrl: "/demo/ethereal-pearl/",
      description: "Konsep ultra-clean minimalis bernuansa pearl white dengan tipografi klasik Bodoni.",
      features: ["Bodoni Elegance Typography", "Amplop Digital Direct Copy", "Google Maps Sync", "Countdown Timer"]
    }
  ],

  // 2. DATA PORTOFOLIO (KLIEN REAL)
  portfolios: [
    {
      id: "port-01",
      title: "Pernikahan Rian & Maya",
      category: "Pernikahan — Jakarta",
      views: "1,450+ Tamu Membuka",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://example.com/portfolio/rian-maya"
    },
    {
      id: "port-02",
      title: "Syukuran Khitan Fatih",
      category: "Khitanan — Bandung",
      views: "620+ Tamu Membuka",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://example.com/portfolio/fatih"
    },
    {
      id: "port-03",
      title: "Sweet 17th Clarissa",
      category: "Ulang Tahun — Surabaya",
      views: "890+ Tamu Membuka",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://example.com/portfolio/clarissa"
    }
  ],

  // 3. PAKET HARGA
  packages: [
    {
      id: "basic",
      name: "Basic Plan",
      price: 99000,
      priceFormatted: "Rp 99.000",
      description: "Pilihan tepat untuk acara simpel dan cepat.",
      featured: false,
      features: [
        "1 Pilihan Template Standard",
        "Masa Aktif 3 Bulan",
        "Maksimal 5 Foto Galeri",
        "Musik Background Standard",
        "Navigasi Peta Google Maps",
        "RSVP Konfirmasi via WhatsApp"
      ]
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 149000,
      priceFormatted: "Rp 149.000",
      description: "Paling populer dengan fitur paling lengkap.",
      featured: true,
      features: [
        "Semua Fitur Paket Basic",
        "Bebas Pilih Semua Template Premium",
        "Masa Aktif 1 Tahun Penuh",
        "Galeri 15 Foto + Video HD",
        "Amplop Digital & QRIS Direct Transfer",
        "Countdown Timer Live & Google Calendar Sync",
        "Custom Nama Tamu Tanpa Batas (Unlimited)"
      ]
    },
    {
      id: "exclusive",
      name: "Exclusive Plan",
      price: 249000,
      priceFormatted: "Rp 249.000",
      description: "Solusi VIP dengan Custom Domain sendiri.",
      featured: false,
      features: [
        "Semua Fitur Paket Premium",
        "Masa Aktif Selamanya (Lifetime)",
        "Termasuk Custom Domain (.com / .id)",
        "Fitur Story / Love Journey Interactive",
        "Bebas Revisi Data Sampai H-1 Acara",
        "Layanan Input Data Didampingi Tim Admin"
      ]
    }
  ],

  // 4. ADD-ON PILIHAN
  addons: [
    { id: "custom-domain", name: "Custom Domain Sendiri (.com / .id)", price: 75000 },
    { id: "extra-gallery", name: "Tambah Galeri (+10 Foto & Video)", price: 30000 },
    { id: "love-story", name: "Fitur Interactive Story Line / Journey", price: 25000 },
    { id: "wa-broadcast", name: "Sistem Text Generator Broadcast Undangan", price: 35000 }
  ],

  // 5. FAQ (PERTANYAAN UMUM)
  faqs: [
    {
      q: "Berapa lama proses pembuatan undangan digital ini?",
      a: "Proses pembuatan sangat cepat! Setelah Anda mengirimkan data (nama, lokasi, foto, & jadwal), undangan Anda akan jadi dalam waktu 1-3 jam kerja."
    },
    {
      q: "Bagaimana cara menyebarkan undangan ke tamu?",
      a: "Kami menyediakan generator link khusus. Anda bisa membagikan link undangan beserta nama tamu langsung melalui WhatsApp, Instagram, atau SMS hanya dengan satu kali klik."
    },
    {
      q: "Apakah data undangan bisa diubah jika ada perubahan jadwal?",
      a: "Bisa! Anda cukup mengontak admin kami via WhatsApp, dan perubahan jadwal/lokasi akan langsung kami perbarui tanpa biaya tambahan."
    },
    {
      q: "Apakah tamu harus mengunduh aplikasi?",
      a: "Sama sekali tidak. Tamu tinggal mengklik link yang Anda kirimkan, dan undangan langsung terbuka dengan mulus melalui browser HP (Chrome, Safari, dll)."
    }
  ],

  // Simulasi Toast Notifikasi Pembelian Real-Time
  recentSales: [
    { name: "Andi & Siska", city: "Jakarta", item: "Template Elysian Botanical" },
    { name: "Ibu Rahma", city: "Bandung", item: "Khitan Royal Emerald" },
    { name: "Bpk. Hendra", city: "Surabaya", item: "Exclusive Plan (.com)" },
    { name: "Dion & Bella", city: "Medan", item: "Template Minimalist Slate" }
  ]
};