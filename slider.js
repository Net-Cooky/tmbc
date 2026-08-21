/**
 * The Mobile Billboard Company Australia
 * Hero Slideshow & Navigation Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
	// ==========================================
	// 10-Slide Hero Carousel (2000x850 Standard)
	// ==========================================
	const slides = document.querySelectorAll('.hero-slider-section .slide');
	const sliderContainer = document.getElementById('hero-slider');
	const dotsContainer = document.getElementById('slider-dots');
	const prevBtn = document.querySelector('.slider-arrow-prev') || document.querySelector('.prev-arrow') || document.getElementById('slider-prev');
	const nextBtn = document.querySelector('.slider-arrow-next') || document.querySelector('.next-arrow') || document.getElementById('slider-next');
	
	let currentSlideIndex = 0;
	const slideIntervalTime = 4000; // 4 seconds interval
	let slideInterval = null;

	if (slides.length > 0) {
		// Generate dots dynamically
		if (dotsContainer) {
			dotsContainer.innerHTML = '';
			slides.forEach((_, i) => {
				const dot = document.createElement('button');
				dot.classList.add('slider-dot');
				if (i === 0) dot.classList.add('active');
				dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
				dot.addEventListener('click', (e) => {
					e.stopPropagation();
					goToSlide(i);
				});
				dotsContainer.appendChild(dot);
			});
		}

		const dots = document.querySelectorAll('.slider-dot');

		function showSlide(index) {
			slides.forEach((slide, i) => {
				if (i === index) {
					slide.classList.add('active');
				} else {
					slide.classList.remove('active');
				}
			});

			dots.forEach((dot, i) => {
				if (i === index) {
					dot.classList.add('active');
				} else {
					dot.classList.remove('active');
				}
			});
		}

		function nextSlide() {
			currentSlideIndex = (currentSlideIndex + 1) % slides.length;
			showSlide(currentSlideIndex);
		}

		function prevSlide() {
			currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
			showSlide(currentSlideIndex);
		}

		function goToSlide(index) {
			currentSlideIndex = index;
			showSlide(currentSlideIndex);
			restartSlider();
		}

		function startSlider() {
			if (!slideInterval) {
				slideInterval = setInterval(nextSlide, slideIntervalTime);
			}
		}

		function stopSlider() {
			if (slideInterval) {
				clearInterval(slideInterval);
				slideInterval = null;
			}
		}

		function restartSlider() {
			stopSlider();
			startSlider();
		}

		// Arrow click events
		if (prevBtn) {
			prevBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				prevSlide();
				restartSlider();
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				nextSlide();
				restartSlider();
			});
		}

		// Start autoplay
		startSlider();

		// Pause on hover
		if (sliderContainer) {
			sliderContainer.addEventListener('mouseenter', stopSlider);
			sliderContainer.addEventListener('mouseleave', startSlider);

			// Touch swipe support for mobile devices
			let touchStartX = 0;
			let touchEndX = 0;

			sliderContainer.addEventListener('touchstart', (e) => {
				touchStartX = e.changedTouches[0].screenX;
				stopSlider();
			}, { passive: true });

			sliderContainer.addEventListener('touchend', (e) => {
				touchEndX = e.changedTouches[0].screenX;
				if (touchStartX - touchEndX > 45) {
					// Swipe Left -> Next
					nextSlide();
				} else if (touchEndX - touchStartX > 45) {
					// Swipe Right -> Previous
					prevSlide();
				}
				startSlider();
			}, { passive: true });
		}
	}

	// ==========================================
	// Mobile Menu Toggle
	// ==========================================
	const menuToggle = document.querySelector('.mobile-menu-toggle');
	const mainNav = document.getElementById('main-nav');

	if (menuToggle && mainNav) {
		menuToggle.addEventListener('click', () => {
			const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', !isExpanded);
			mainNav.classList.toggle('open');
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('open')) {
				mainNav.classList.remove('open');
				menuToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}
});
