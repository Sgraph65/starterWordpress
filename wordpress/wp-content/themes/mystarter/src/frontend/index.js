const sliderConfigs = [
	{
		selector: '.mystarter-block-slider',
		slidesWrapper: '.mystarter-block-slider__slides',
		slide: '.mystarter-block-slider__slide',
		prev: '.mystarter-block-slider__control.is-prev',
		next: '.mystarter-block-slider__control.is-next',
		dots: '.mystarter-block-slider__dots',
		dotClass: 'mystarter-block-slider__dot',
	},
	{
		selector: '.mystarter-hero.is-layout-slider',
		slidesWrapper: '.mystarter-hero__slides',
		slide: '.mystarter-hero__slide',
		prev: '.mystarter-hero__control.is-prev',
		next: '.mystarter-hero__control.is-next',
		dots: '.mystarter-hero__dots',
		dotClass: 'mystarter-hero__dot',
	},
];

const initSliders = () => {
	sliderConfigs.forEach((config) => {
		const nodes = document.querySelectorAll(config.selector);

		nodes.forEach((slider) => {
			const slidesWrapper = slider.querySelector(config.slidesWrapper);
			if (!slidesWrapper) {
				return;
			}

			const slides = Array.from(slider.querySelectorAll(config.slide));
			if (slides.length <= 1) {
				return;
			}

			const prev = slider.querySelector(config.prev);
			const next = slider.querySelector(config.next);
			const dotsWrapper = slider.querySelector(config.dots);
			const autoplay = slider.dataset.autoplay === 'true';
			const interval = Number(slider.dataset.interval) || 5000;

			let current = 0;
			let timer;

			const goTo = (index) => {
				current = (index + slides.length) % slides.length;
				slidesWrapper.style.transform = `translateX(-${current * 100}%)`;
				if (dotsWrapper) {
					Array.from(dotsWrapper.children).forEach(
						(dot, dotIndex) => {
							dot.classList.toggle(
								'is-active',
								dotIndex === current
							);
						}
					);
				}
			};

			const play = () => {
				if (!autoplay) {
					return;
				}

				clearInterval(timer);
				timer = window.setInterval(() => {
					goTo(current + 1);
				}, interval);
			};

			if (dotsWrapper) {
				const fragment = document.createDocumentFragment();
				slides.forEach((_slide, index) => {
					const button = document.createElement('button');
					button.type = 'button';
					button.className = config.dotClass;
					button.addEventListener('click', () => {
						goTo(index);
						play();
					});
					fragment.appendChild(button);
				});
				dotsWrapper.innerHTML = '';
				dotsWrapper.appendChild(fragment);
			}

			prev?.addEventListener('click', () => {
				goTo(current - 1);
				play();
			});

			next?.addEventListener('click', () => {
				goTo(current + 1);
				play();
			});

			slider.addEventListener('mouseenter', () => clearInterval(timer));
			slider.addEventListener('mouseleave', play);

			goTo(0);
			play();
		});
	});
};

const isEditor = () => document.body?.classList?.contains('wp-admin');

if (document.readyState !== 'loading') {
	if (!isEditor()) {
		initSliders();
	}
} else {
	document.addEventListener('DOMContentLoaded', () => {
		if (!isEditor()) {
			initSliders();
		}
	});
}

export default initSliders;
