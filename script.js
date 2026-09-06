// ====== i18n (3 Languages: AR/FR/EN) ======
let currentLang = localStorage.getItem('lang') || 'ar';
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
}
function applyTranslations() {
  const t = translations[currentLang];
  if (!t) return;
  // ترجمة النصوص العادية (data-i18n)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  // ترجمة أوصاف المشاريع (data-i18n-project)
  document.querySelectorAll('[data-i18n-project]').forEach(el => {
    const key = el.getAttribute('data-i18n-project');
    if (t.projects && t.projects[key]) el.textContent = t.projects[key];
  });
  // RTL للعربية، LTR لغيرها
  document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  // تمييز الزر الفعّال
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}
// طبّق الترجمة عند تحميل الصفحة
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTranslations);
} else {
  applyTranslations();
}
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
// Add fade-in animation on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.project-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
