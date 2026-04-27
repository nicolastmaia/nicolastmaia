/* Focus outline only for keyboard users */
const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

const backToTopButton = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => {
  if (!backToTopButton) return;
  backToTopButton.classList.toggle('is-visible', window.scrollY > 400);
});

const xpStartDate = new Date('06/01/2021');
const yearsOfXp = new Date().getFullYear() - xpStartDate.getFullYear();
const yearsStr = `${yearsOfXp}+`;

const xpYearsEl = document.getElementById('xp-years');
if (xpYearsEl) xpYearsEl.textContent = yearsStr;

const xpYearsStatEl = document.getElementById('xp-years-stat');
if (xpYearsStatEl) xpYearsStatEl.textContent = yearsStr;

const footerYearEl = document.getElementById('footer-year');
if (footerYearEl) footerYearEl.textContent = String(new Date().getFullYear());

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const subject = String(fd.get('subject') || '').trim() || 'Portfolio contact';
    const message = String(fd.get('message') || '').trim();
    const body = [
      name || email ? `From: ${[name, email].filter(Boolean).join(' — ')}` : '',
      '',
      message || '(no message)',
    ]
      .filter((line, i, arr) => !(i === 0 && !line))
      .join('\n');
    const mailto = `mailto:nicolasterramaia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
