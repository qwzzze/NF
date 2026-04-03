// Мобильное меню
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
            nav.style.background = 'white';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            nav.style.gap = '15px';
        }
    });
}

// Анимация цифр на главной странице
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        updateNumber();
    });
}

// Запуск анимации при появлении в поле зрения
if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        });
    });
    observer.observe(document.querySelector('.stats-section'));
}

// Анимация скилл-баров
const skillBars = document.querySelectorAll('.skill-progress');

if (skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillsObserver.disconnect();
            }
        });
    });
    skillsObserver.observe(document.querySelector('.skills-section'));
}

// Отправка формы (простое оповещение)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Добавление класса при скролле для header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});