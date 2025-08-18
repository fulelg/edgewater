class Slider {
    constructor(sliderSelector, trackSelector, indicatorsSelector, buttonId, isReverse = false) {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.isReverse = isReverse;
        
        this.sliderTrack = document.querySelector(trackSelector);
        this.indicators = document.querySelectorAll(indicatorsSelector);
        this.nextButton = document.getElementById(buttonId);
        
        this.init();
    }
    
    init() {
        // Обработчик для кнопки "следующий"
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Обработчики для индикаторов
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Автоматическое переключение каждые 5 секунд
        this.autoPlay();
    }
    
    nextSlide() {
        if (this.isReverse) {
            // Для обратного слайдера двигаемся влево (уменьшаем индекс)
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        } else {
            // Для обычного слайдера двигаемся вправо (увеличиваем индекс)
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        }
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        // Обновляем позицию слайдера
        let translateX;
        if (this.isReverse) {
            // Для обратного направления: начинаем с последнего слайда и двигаемся влево
            translateX = -((this.totalSlides - 1 - this.currentSlide) * 20);
            console.log('Reverse slider - currentSlide:', this.currentSlide, 'translateX:', translateX);
        } else {
            translateX = -this.currentSlide * 20; // Для обычного направления
        }
        this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Обновляем активный индикатор
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    autoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 секунд
    }
}

class AmenitiesGallery {
    constructor() {
        this.currentIndex = 0;
        this.totalItems = 1;
        this.track = document.querySelector('.amenities-track');
        this.prevButton = document.querySelector('.amenity-prev');
        this.nextButton = document.querySelector('.amenity-next');
        
        this.init();
    }
    
    init() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prevItem();
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextItem();
            });
        }
    }
    
    nextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateGallery();
    }
    
    prevItem() {
        this.currentIndex = this.currentIndex === 0 ? this.totalItems - 1 : this.currentIndex - 1;
        this.updateGallery();
    }
    
    updateGallery() {
        const translateX = -this.currentIndex * 20; // 20% на каждый элемент (5 элементов)
        this.track.style.transform = `translateX(${translateX}%)`;
    }
}

class ProjectsGallery {
    constructor() {
        this.currentIndex = 0;
        this.totalItems = 5;
        this.track = document.querySelector('.projects-track');
        this.prevButton = document.querySelector('.project-prev');
        this.nextButton = document.querySelector('.project-next');
        
        this.init();
    }
    
    init() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prevItem();
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextItem();
            });
        }
    }
    
    nextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateGallery();
    }
    
    prevItem() {
        this.currentIndex = this.currentIndex === 0 ? this.totalItems - 1 : this.currentIndex - 1;
        this.updateGallery();
    }
    
    updateGallery() {
        const translateX = -this.currentIndex * 20; // 20% на каждый элемент (5 элементов)
        this.track.style.transform = `translateX(${translateX}%)`;
    }
}

// Инициализация слайдеров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Первый слайдер (обычное направление)
    new Slider('.section-2-slider', '.slider-track', '.section-2-slider .indicator', 'nextSlide', false);
    
    // Второй слайдер (обратное направление)
    new Slider('.section-3-slider', '.slider-track-reverse', '.section-3-slider .indicator', 'prevSlide', true);
    
    // Галерея удобств
    new AmenitiesGallery();
    
    // Галерея проектов
    new ProjectsGallery();
}); 

// Mobile menu toggle
window.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close');
  const links = document.querySelectorAll('.mobile-link');

  function closeMenu() {
    burger?.classList.remove('active');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    const opened = mobileMenu.classList.contains('open');
    document.body.style.overflow = opened ? 'hidden' : '';
  });

  closeBtn?.addEventListener('click', closeMenu);
  links.forEach((l) => l.addEventListener('click', closeMenu));
}); 