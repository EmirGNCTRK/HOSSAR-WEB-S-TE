// ==========================================================================
// HOSSAR TACTICAL - NİHAİ UNIFIED APPLICATION SCRIPT (DÜZELTİLMİŞ)
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. GELİŞMİŞ SAYFA GEÇİŞ VE PRELOADER OTOMASYONU ---
    const preloader = document.getElementById('preloader');
    
    // Sayfa tamamen yüklendiğinde preloader'ı kapat
    window.addEventListener('load', function() {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    });

    // Her ihtimale karşı load gecikirse diye 1.5 saniyelik yedek kapatıcı
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    }, 1500);

    // Çıkış Animasyonu: Bir iç linke tıklandığında preloader'ı aç
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript') && this.target !== '_blank') {
                e.preventDefault();
                if (preloader) {
                    preloader.style.display = 'flex';
                    setTimeout(() => { preloader.classList.remove('fade-out'); }, 10);
                }
                setTimeout(() => { window.location.href = href; }, 250);
            }
        });
    });


    // --- 2. MOBİL HAMBURGER VE AKORDEON MENÜ OTOMASYONU ---
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            if (!mainNav.classList.contains('active') && dropdown) {
                dropdown.classList.remove('open');
            }
        });
    }

    // Hem Masaüstü hem Mobilde "Ürünlerimiz" Tıklama Kontrolü
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
    }

    // Menü açıkken ekranda boş bir yere tıklanırsa kapatma güvenliği
    document.addEventListener('click', function() {
        if (mainNav && mainNav.classList.contains('active')) {
            if (menuToggle) menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            if (dropdown) dropdown.classList.remove('open');
        }
    });


    // --- 3. ANA SAYFA HERO SLIDER ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // 5 saniyede bir değişim (Önceki 500ms çok hızlıydı, 5000ms yaptık)
    }


    // --- 4. ÜRÜN DETAY GALERİ, OKLAR, BÜYÜTEÇ VE LIGHTBOX SİSTEMİ ---
    const zoomContainer = document.querySelector('.zoom-container');
    const mainImg = document.getElementById('current-product-img');
    const thumbnails = document.querySelectorAll('.thumb-box');
    const prevBtn = document.getElementById('prev-img-btn');
    const nextBtn = document.getElementById('next-img-btn');
    const lightbox = document.getElementById('mobile-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox-btn');

    if (mainImg && thumbnails.length > 0) {
        const imgList = Array.from(thumbnails).map(thumb => thumb.querySelector('img').getAttribute('src'));
        let currentIndex = 0;

        function updateGallery(index) {
            currentIndex = index;
            mainImg.setAttribute('src', imgList[currentIndex]);
            thumbnails.forEach((box, i) => {
                if (i === currentIndex) box.classList.add('active');
                else box.classList.remove('active');
            });
        }

        // Milimetrik Fare Zoom Takibi (PC)
        if (zoomContainer) {
            zoomContainer.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 992) {
                    const rect = zoomContainer.getBoundingClientRect();
                    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
                    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
                    mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                }
            });
            zoomContainer.addEventListener('mouseleave', function() {
                mainImg.style.transformOrigin = 'center center';
            });
        }

        // Ok Tuşları (VS Code Hatasına Sebep Olan Parantez Burada Düzeltildi)
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                updateGallery((currentIndex + 1) % imgList.length);
            });
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                updateGallery((currentIndex - 1 + imgList.length) % imgList.length);
            });
        }

        // Thumbnail Tıklamaları
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() { updateGallery(index); });
        });

        // Mobil Lightbox Açılışı
        mainImg.addEventListener('click', function() {
            if (window.innerWidth <= 992 && lightbox && lightboxImg) {
                lightboxImg.setAttribute('src', this.getAttribute('src'));
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });

        // Lightbox Kapatma
        if (closeLightbox && lightbox) {
            closeLightbox.addEventListener('click', function() {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    // --- 5. HEADER SCROLL GÖLGE EFEKTİ ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.site-header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    });

});