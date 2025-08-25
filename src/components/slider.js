import './slider.css';

export const initSlider = () => {
  // Ищем все элементы с атрибутом data-component="slider"
  const sliders = document.querySelectorAll('[data-component="slider"]');
  if (sliders.length > 0) {
    console.log(`Found ${sliders.length} sliders on the page.`);
    // Здесь могла бы быть ваша логика инициализации слайдера
    sliders.forEach(slider => {
      slider.classList.add('slider-initialized');
    });
  }
};
