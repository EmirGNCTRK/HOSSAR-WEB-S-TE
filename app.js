// Header Kaydırma Efekti (Mevcut kodun)
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
});

// Arka Plan Fotoğraf Değişim Otomasyonu (Slider)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 4000; // 4 saniyede bir değişir (milisaniye cinsinden)

function nextSlide() {
    // Aktif olan slidedan 'active' sınıfını kaldır
    slides[currentSlide].classList.remove('active');
    
    // Bir sonraki slayda geç (Son slayda gelindiyse başa dön)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Yeni slayda 'active' sınıfını ekle
    slides[currentSlide].classList.add('active');
}

// Döngüyü başlatıyoruz
setInterval(nextSlide, slideInterval);

// --- ÜRÜN DETAY SAYFASI GALERİ OTOMASYONU ---
// Sayfada galeri elementleri var mı kontrol et (Hata vermemesi için)
const mainImg = document.getElementById('current-product-img');
const thumbnails = document.querySelectorAll('.thumb-box');

if (mainImg && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // 1. Tıklanan kutunun içindeki resmin yolunu (src) al
            const targetSrc = this.querySelector('img').getAttribute('src');
            
            // 2. Ana resmin yolunu bu yeni yolla değiştir
            mainImg.setAttribute('src', targetSrc);
            
            // 3. Diğer tüm kutulardan 'active' sınıfını kaldır
            thumbnails.forEach(box => box.classList.remove('active'));
            
            // 4. Sadece tıklanan kutuya 'active' sınıfını ekle
            this.classList.add('active');
        });
    });
}

// ==========================================================================
// --- ÜRÜN DETAY ENTEGRE GALERİ, OKLAR, BÜYÜTEÇ VEYA LIGHTBOX MİMARİSİ ---
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    const zoomContainer = document.querySelector('.zoom-container');
    const mainImg = document.getElementById('current-product-img');
    const thumbnails = document.querySelectorAll('.thumb-box');
    const prevBtn = document.getElementById('prev-img-btn');
    const nextBtn = document.getElementById('next-img-btn');
    const lightbox = document.getElementById('mobile-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox-btn');

    if (!mainImg || thumbnails.length === 0) return;

    // Küçük resimlerin yollarını bir diziye (array) aktarıyoruz
    const imgList = Array.from(thumbnails).map(thumb => thumb.querySelector('img').getAttribute('src'));
    let currentIndex = 0;

    // Resmi ve aktif kutuyu güncelleyen ortak fonksiyon
    function updateGallery(index) {
        currentIndex = index;
        mainImg.setAttribute('src', imgList[currentIndex]);
        
        thumbnails.forEach((box, i) => {
            if (i === currentIndex) box.classList.add('active');
            else box.classList.remove('active');
        });
    }

    // ----------------------------------------------------------------------
    // 1. MOUSE ZOOM (BÜYÜTEÇ) KODLARI (Milimetrik Koordinat Takibi)
    // ----------------------------------------------------------------------
    if (zoomContainer && mainImg) {
        zoomContainer.addEventListener('mousemove', function(e) {
            // Sadece bilgisayar ekranlarındayken (992px üstü) büyüteç çalışsnsın
            if (window.innerWidth > 992) {
                const rect = zoomContainer.getBoundingClientRect();
                
                // Sayfa kaydırılsa bile farenin kutu içindeki tam yerini hesaplar
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Koordinatları yüzdeye (0% - 100% arası) çeviriyoruz
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;
                
                // Büyüme odağını farenin milimetrik olarak durduğu yere eşitliyoruz
                mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            }
        });

        // Fare kutudan çıkınca resmi eski normal merkezine döndür
        zoomContainer.addEventListener('mouseleave', function() {
            mainImg.style.transformOrigin = 'center center';
        });
    }

    // ----------------------------------------------------------------------
    // 2. SAĞ VE SOL OK TUŞLARI TETİKLEYİCİLERİ
    // ----------------------------------------------------------------------
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Tıklamanın arkadaki Lightbox'ı açmasını engeller
            let nextIndex = (currentIndex + 1) % imgList.length;
            updateGallery(nextIndex);
        });

        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Tıklamanın arkadaki Lightbox'ı açmasını engeller
            let prevIndex = (currentIndex - 1 + imgList.length) % imgList.length;
            updateGallery(prevIndex);
        });
    }

    // Küçük resimlere (thumbnails) tıklayınca değişim
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            updateGallery(index);
        });
    });

    // ----------------------------------------------------------------------
    // 3. MOBİL LIGHTBOX (TAM EKRAN PENCERE)
    // ----------------------------------------------------------------------
    mainImg.addEventListener('click', function() {
        // Eğer ekran mobil boyuttaysa (992px ve altı) lightbox'ı aç
        if (window.innerWidth <= 992) {
            lightboxImg.setAttribute('src', this.getAttribute('src'));
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Arka plan kaymasını engelle
        }
    });

    if (closeLightbox && lightbox) {
        // X butonuna basınca kapat
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Kaymayı geri aç
        });

        // Siyah arka plana basınca da kapat
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
// --- MOBİL HAMBURGER MENÜ OTOMASYONU ---
const menuToggle = document.getElementById('mobile-menu');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        // Butonu ve menüyü aktif/pasif yap (Sağdan içeri kaydırır)
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}

// Mobilde "Ürünlerimiz" yazısına tıklayınca alt menünün açılması
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', function(e) {
        // Eğer ekran mobil boyuttaysa normal link gitmesini engelle, alt menüyü aç
        if (window.innerWidth <= 992) {
            e.preventDefault();
            dropdown.classList.toggle('open');
        }
    });
}
// Header'ın kaydırma esnasında gölge kazanması efekti
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
});
// --- PRELOADER (YÜKLEME EKRANI) OTOMASYONU ---
// --- GELİŞMİŞ SAYFA GEÇİŞ VE PRELOADER OTOMASYONU ---

// 1. Sayfa İlk Açıldığında Yükleme Ekranını Kapatma (Giriş)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// 2. Bir Linke Tıklandığında Sayfadan Ayrılmadan Önce Yükleme Ekranını Açma (Çıkış)
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    
    // Sitedeki tüm iç linkleri buluyoruz
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Eğer tıklandığında sayfa dışına giden gerçek bir linkse ve sayfa içi pencerelere (#) gitmiyorsa
            if (href && !href.startsWith('#') && !href.startsWith('javascript') && this.target !== '_blank') {
                
                // Varsayılan sayfa geçişini saliseliğine durdur
                e.preventDefault();
                
                // Yükleme ekranını tekrar görünür yap ve beyazlığı aç
                preloader.style.display = 'flex';
                // Küçük bir gecikmeyle görünürlük efektini (opacity) tetikle
                setTimeout(() => {
                    preloader.classList.remove('fade-out');
                }, 10);
                
                // Çeyrek saniye (250ms) sonra yeni sayfaya yönlendir (Bu sırada kullanıcı halkanın döndüğünü görecek)
                setTimeout(() => {
                    window.location.href = href;
                }, 250); 
            }
        });
    });
});