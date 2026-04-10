const mobileBtn = document.getElementById('mobileBtn');
const nav = document.querySelector('nav');

if (mobileBtn) {
    mobileBtn.addEventListener('click', function() {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '80px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(15, 10, 30, 0.95)';
            nav.style.backdropFilter = 'blur(12px)';
            nav.style.padding = '20px';
            nav.style.gap = '15px';
            nav.style.zIndex = '99';
        }
    });
}

// Анимация цифр в статистике
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
        const target = stat.getAttribute('data-count');
        if (!target) return;
        
        let current = 0;
        const increment = target.replace('+', '') / 50;
        const isStringWithPlus = target.includes('+');
        const numericTarget = parseInt(target);
        
        const updateNumber = () => {
            if (current < numericTarget) {
                current += increment;
                stat.textContent = Math.floor(current) + (isStringWithPlus ? '+' : '');
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        updateNumber();
    });
    animated = true;
}

// Запускаем анимацию при появлении секции в поле зрения
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(statsSection);
}