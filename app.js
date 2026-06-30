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

// --- ÜRÜN DETAY BÜYÜTEÇ (ZOOM) OTOMASYONU ---
const zoomContainer = document.querySelector('.zoom-container');
const zoomImg = document.getElementById('current-product-img');

if (zoomContainer && zoomImg) {
    // Fare kutunun içinde hareket ettikçe koordinatları hesapla
    zoomContainer.addEventListener('mousemove', function(e) {
        // Kutunun ekrandaki konumunu al
        const rect = e.target.getBoundingClientRect();
        
        // Farenin kutu içindeki X ve Y koordinatlarını yüzdeye çevir
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Resmin büyüme merkezini (orijinini) farenin olduğu yere eşitle
        zoomImg.style.transformOrigin = `${x}% ${y}%`;
    });

    // Fare kutudan çıktığında resmi eski normal merkezine geri döndür
    zoomContainer.addEventListener('mouseleave', function() {
        zoomImg.style.transformOrigin = 'center center';
    });
}
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