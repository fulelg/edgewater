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

// Инициализация слайдеров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Первый слайдер (обычное направление)
    new Slider('.section-2-slider', '.slider-track', '.section-2-slider .indicator', 'nextSlide', false);
    
    // Второй слайдер (обратное направление)
    new Slider('.section-3-slider', '.slider-track-reverse', '.section-3-slider .indicator', 'prevSlide', true);
}); 