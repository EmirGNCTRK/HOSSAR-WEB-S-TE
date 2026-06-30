// Header'ın kaydırma esnasında arka planının koyulaşması (UX için)
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