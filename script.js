// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню с тремя полосками (без цифр)
    initMobileMenu();
    
    // Инициализация карты
    initMap();
    
    // Инициализация анимаций с повторным показом
    initScrollAnimations();
    
    // Плавная прокрутка
    initSmoothScroll();
    
    // Подсветка активного раздела
    initActiveSection();
    
    // Инициализация фона героя
    initHeroBackground();
    
    // Скрыть заголовок "О нас" при загрузке
    initAboutSection();
});

// Мобильное меню с тремя полосками
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navList.classList.toggle('active');
            
            // Анимация полосок при открытии/закрытии
            const menuDots = document.querySelectorAll('.menu-dot');
            if (navList.classList.contains('active')) {
                menuDots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.transform = `rotate(${180 * (index + 1)}deg)`;
                        dot.style.backgroundColor = '#ff6b66';
                    }, index * 100);
                });
            } else {
                menuDots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.transform = 'rotate(0)';
                        dot.style.backgroundColor = '#e10600';
                    }, index * 100);
                });
            }
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const menuDots = document.querySelectorAll('.menu-dot');
                menuDots.forEach(dot => {
                    dot.style.transform = 'rotate(0)';
                    dot.style.backgroundColor = '#e10600';
                });
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(event) {
            if (!navList.contains(event.target) && !menuToggle.contains(event.target)) {
                navList.classList.remove('active');
                const menuDots = document.querySelectorAll('.menu-dot');
                menuDots.forEach(dot => {
                    dot.style.transform = 'rotate(0)';
                    dot.style.backgroundColor = '#e10600';
                });
            }
        });
        
        // Предотвращение закрытия при клике внутри меню
        navList.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Инициализация карты Leaflet
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;
    
    // Координаты парикмахерской
    const barberCoords = [48.55778, 135.112932];
    
    // Инициализация карты с увеличенным zoom
    const map = L.map('map').setView(barberCoords, 17);
    
    // Добавление кастомного слоя карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 19
    }).addTo(map);
    
    // Создание кастомной иконки маркера
    const barberIcon = L.divIcon({
        html: `
            <div style="
                background: linear-gradient(135deg, #e10600, #ff6b66);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 20px;
                border: 4px solid white;
                box-shadow: 0 0 20px rgba(225, 6, 0, 0.5);
                animation: pulse 2s infinite;
            ">
                <i class="fas fa-scissors"></i>
            </div>
            <style>
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(225, 6, 0, 0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(225, 6, 0, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(225, 6, 0, 0); }
                }
            </style>
        `,
        className: 'custom-marker',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });
    
    // Добавление маркера
    const marker = L.marker(barberCoords, { icon: barberIcon }).addTo(map);
    
    // Кастомное всплывающее окно
    const popupContent = `
        <div class="map-popup-content">
            <h3 style="color: #e10600; margin: 0 0 10px 0; font-family: 'Comfortaa', cursive;">
                <i class="fas fa-map-marker-alt"></i> Color Bar
            </h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #333;">
                <strong>ул. Сергеевская, 24а, Хабаровск</strong>
            </p>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
                <i class="fas fa-bus"></i> Ближайшая остановка: «ТК Берёзовка»
            </p>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
                <i class="fas fa-phone" style="color: #e10600;"></i> +7 (962) 503-03-94
            </p>
            <p style="margin: 0 0 15px 0; font-size: 13px; color: #666;">
                <i class="fab fa-whatsapp" style="color: #25D366;"></i> +7 (962) 503-03-94
            </p>
            <a href="https://2gis.ru/khabarovsk/firm/70000001096253812?m=135.112932%2C48.55778%2F16.15" 
               target="_blank" 
               style="
                    display: inline-block;
                    background-color: #2b579a;
                    color: white;
                    padding: 8px 15px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.3s;
                    border: 2px solid #2b579a;
               "
               onmouseover="this.style.backgroundColor='#23447d'; this.style.transform='translateY(-2px)';"
               onmouseout="this.style.backgroundColor='#2b579a'; this.style.transform='translateY(0)';">
               <i class="fas fa-external-link-alt"></i> Открыть в 2ГИС
            </a>
        </div>
    `;
    
    marker.bindPopup(popupContent, {
        className: 'map-overlay',
        maxWidth: 300,
        closeButton: true
    }).openPopup();
    
    // Добавление круга вокруг маркера
    L.circle(barberCoords, {
        color: '#e10600',
        fillColor: '#ff6b66',
        fillOpacity: 0.15,
        radius: 80,
        weight: 2,
        dashArray: '5, 5'
    }).addTo(map);
    
    // Обработчик клика для кнопки "Проложить маршрут"
    document.querySelectorAll('.button-route').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#map-section') {
                e.preventDefault();
                
                // Прокрутка к карте
                const mapSection = document.getElementById('map-section');
                const headerHeight = document.querySelector('.header').offsetHeight;
                const mapPosition = mapSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: mapPosition,
                    behavior: 'smooth'
                });
                
                // Открытие попапа на карте
                setTimeout(() => {
                    marker.openPopup();
                    
                    // Анимация маркера
                    const markerElement = document.querySelector('.custom-marker div');
                    if (markerElement) {
                        markerElement.style.animation = 'none';
                        setTimeout(() => {
                            markerElement.style.animation = 'pulse 0.5s 3';
                        }, 10);
                    }
                }, 800);
            }
        });
    });
    
    // Адаптация карты при изменении размера
    window.addEventListener('resize', function() {
        setTimeout(() => {
            map.invalidateSize();
        }, 150);
    });
}

// Анимации с повторным показом при скролле вверх/вниз
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.hero-title):not(.hero-subtitle):not(.hero-buttons)');
    let lastScrollTop = 0;
    
    // Функция проверки видимости элемента
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Если элемент виден в окне просмотра
            if (elementTop < windowHeight - 100 && elementBottom > 100) {
                if (!element.classList.contains('visible')) {
                    element.classList.add('visible');
                    
                    // Добавляем небольшую задержку для последовательного появления
                    const delay = Array.from(animatedElements).indexOf(element) * 50;
                    setTimeout(() => {
                        element.style.transitionDelay = '0s';
                    }, delay);
                }
            } else {
                // Если скроллим вверх, показываем элементы снова
                if (window.scrollY < lastScrollTop) {
                    if (elementBottom < 0 || elementTop > windowHeight) {
                        element.classList.remove('visible');
                    }
                }
            }
        });
        
        lastScrollTop = window.scrollY <= 0 ? 0 : window.scrollY;
    }
    
    // Проверка при загрузке
    setTimeout(checkVisibility, 300);
    
    // Проверка при скролле с троттлингом
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                checkVisibility();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
    
    // Проверка при изменении размера окна
    window.addEventListener('resize', checkVisibility);
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#map-section') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Подсветка активного раздела
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    function highlightNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('load', highlightNavLink);
    window.addEventListener('scroll', highlightNavLink);
}

// Инициализация фона героя
function initHeroBackground() {
    const heroSection = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (!heroSection || !heroBackground) return;
    
    // Сразу показываем контент
    if (heroContent) {
        setTimeout(() => {
            const title = heroContent.querySelector('.hero-title');
            const subtitle = heroContent.querySelector('.hero-subtitle');
            const buttons = heroContent.querySelector('.hero-buttons');
            
            if (title) title.classList.add('visible');
            if (subtitle) subtitle.classList.add('visible');
            if (buttons) buttons.classList.add('visible');
        }, 300);
    }
    
    // Плавное скрытие фона при скролле
    function handleHeroScroll() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const opacity = Math.max(0, 1 - (scrollPosition / (heroHeight * 0.7)));
        
        heroBackground.style.opacity = opacity;
        
        // Если проскроллили достаточно, полностью скрываем фон
        if (scrollPosition > heroHeight * 0.8) {
            heroBackground.style.opacity = 0;
        }
    }
    
    // Проверка при загрузке
    handleHeroScroll();
    
    // Проверка при скролле
    window.addEventListener('scroll', function() {
        handleHeroScroll();
    }, { passive: true });
}

// Скрыть заголовок "О нас" при загрузке
function initAboutSection() {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        // Добавляем класс для скрытия при загрузке
        aboutSection.classList.add('hidden-on-load');
        
        // Проверяем, когда секция становится видимой
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Убираем класс скрытия и активируем анимации
                    aboutSection.classList.remove('hidden-on-load');
                    
                    // Активируем анимации элементов внутри
                    setTimeout(() => {
                        const elements = aboutSection.querySelectorAll('.animate-on-scroll');
                        elements.forEach(el => {
                            el.classList.add('visible');
                        });
                    }, 100);
                    
                    // Отключаем наблюдатель
                    observer.unobserve(aboutSection);
                }
            });
        }, {
            threshold: 0.1 // Когда 10% секции видно
        });
        
        observer.observe(aboutSection);
    }
}

// Добавляем стили для кастомного попапа
const style = document.createElement('style');
style.textContent = `
    .map-overlay {
        border-radius: 12px !important;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15) !important;
        border: 2px solid #ff6b66 !important;
        padding: 0 !important;
        overflow: hidden !important;
        font-family: 'Nunito', sans-serif !important;
    }
    
    .map-overlay .leaflet-popup-content {
        margin: 20px !important;
        line-height: 1.5 !important;
        color: #333 !important;
    }
    
    .map-overlay .leaflet-popup-tip {
        background: #e10600 !important;
        width: 16px !important;
        height: 16px !important;
    }
    
    .leaflet-control-attribution {
        display: none !important;
    }
    
    .leaflet-bottom.leaflet-right {
        display: none !important;
    }
`;
document.head.appendChild(style);