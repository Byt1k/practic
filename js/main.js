// sliders
new Swiper('.coworkings__slider', {
    // slidesPerView: 2,
    spaceBetween: 15,
  
    navigation: {
      nextEl: '.coworkings__navigation .next',
      prevEl: '.coworkings__navigation .prev',
    },

    pagination: {
        el: '.coworkings__pagination',
        type: 'fraction',
    },

    breakpoints: {
        1200: {
            slidesPerView: 2,
        },
        320: {
            slidesPerView: 1,
        },
    },
});

new Swiper('.residents__slider', {
    navigation: {
      nextEl: '.residents__navigation .next',
      prevEl: '.residents__navigation .prev',
    },

    pagination: {
        el: '.residents__pagination',
        type: 'fraction',
    },

    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        760: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
    },
});

new Swiper('.awards__slider', {
    navigation: {
      nextEl: '.awards__navigation .next',
      prevEl: '.awards__navigation .prev',
    },

    pagination: {
        el: '.awards__pagination',
        type: 'fraction',
    },

    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        760: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
    },
});

// input-range
document.querySelectorAll('.input-range').forEach(input => {
    function updateProgress() {
        const percent = (input.value - input.min) / (input.max - input.min) * 100;
        input.style.background = `linear-gradient(to right, #EE7E4E ${percent}%, #D4D4D4 ${percent}%)`;
    }
    
    input.addEventListener('input', updateProgress);
    updateProgress();
});


// calculator
const squareValueEl = document.getElementById('square-value');
const squareRangeEl = document.getElementById('square-range');

function squareRangeOnChange(e) {
    squareValueEl.value = e.target.value;
}

function squareValueOnChange(e) {
    let value = Math.max(squareRangeEl.min, Math.min(squareRangeEl.max, e.target.value));
    squareRangeEl.value = value;
    squareValueEl.value = value;
}

//popup
const popupEl = document.getElementById('popup')

function toggleOpenPopup() {
    document.body.classList.toggle('hidden')
    popupEl.classList.toggle('active')
}

// regions
const regions = [
    { id: 'ru', name: 'Россия' },
    { id: 'kz', name: 'Казахстан' },
    { id: 'by', name: 'Белоруссия' },
    { id: 'uz', name: 'Узбекистан' }
];

const cities = [
    { id: 'moscow', name: 'Москва', region: 'ru' },
    { id: 'minsk', name: 'Минск', region: 'by' },
    { id: 'chita', name: 'Чита', region: 'ru' },
    { id: 'aktobe', name: 'Актобе', region: 'kz' },
    { id: 'tula', name: 'Тула', region: 'ru' }
];

function renderRegions() {
    const regionsList = document.getElementById('regions-list');
    regionsList.innerHTML = '';

    regions.forEach(region => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" id="${region.id}" />
            <img src="./img/countries/${region.id}.svg" alt="flag">
            ${region.name}
        `;
        regionsList.appendChild(label);
    });
}

function renderCities(selectedRegions = []) {
    const citiesList = document.getElementById('cities-list');
    citiesList.innerHTML = ''

    if (!selectedRegions.length) {
        selectedRegions = regions.map(r => r.id)
    }

    cities.filter(city => selectedRegions.some(r => r === city.region)).forEach(city => {
        const div = document.createElement('div');
        div.className = 'city'
        div.innerHTML = `
            <div>
                <img src="./img/countries/${city.region}.svg" alt="flag">
                <p class="city__name">${city.name}</p>
            </div>
            <a href="#">
                открыть коворкинг
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
                    <path d="M2 6.93795C1.41344 6.93794 0.937945 7.41344 0.937945 8C0.937945 8.58656 1.41344 9.06205 2 9.06205L2 6.93795ZM23.9921 8.75099C24.4068 8.33623 24.4068 7.66377 23.9921 7.24902L17.2332 0.490138C16.8184 0.0753802 16.146 0.0753801 15.7312 0.490138C15.3165 0.904896 15.3165 1.57735 15.7312 1.99211L21.7391 8L15.7312 14.0079C15.3165 14.4226 15.3165 15.0951 15.7312 15.5099C16.146 15.9246 16.8184 15.9246 17.2332 15.5099L23.9921 8.75099ZM2 9.06205L23.2411 9.06206L23.2411 6.93795L2 6.93795L2 9.06205Z" fill="#EE7E4E"/>
                </svg>
            </a>
        `;
        citiesList.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderRegions();
    renderCities();

    // Поиск городов
    const searchInput = document.querySelector('.input_search input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cityItems = document.querySelectorAll('#cities-list .city');

        cityItems.forEach(item => {
            const cityName = item.querySelector('.city__name').textContent.toLowerCase();
            item.style.display = cityName.includes(searchTerm) ? 'flex' : 'none';
        });
    });

    // Фильтр по регионам
    document.getElementById('regions-list').addEventListener('change', function(e) {
        const selectedRegions = Array.from(this.querySelectorAll('#regions-list > label >input:checked')).map(item => item.id)
        renderCities(selectedRegions)
    });

    // Скролл фильтра
    const filterContainer = document.querySelector('.regions .filter');
    
    let isDragging = false
    let startX, scrollLeft;

    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - filterContainer.offsetLeft;
        scrollLeft = filterContainer.scrollLeft;
    }

    const handleMouseLeave = (e) => {
        if (isDragging) {
            isDragging = false;
        }
    }

    const handleMouseMove = (e) => {        
        if (!isDragging) return;
        e.preventDefault();
        console.log(e.pageX);
        
        const x = e.pageX - filterContainer.offsetLeft;
        const walk = (x - startX) * 2;

        filterContainer.scrollLeft = scrollLeft - walk;
    }

    const handleOnEnd = () => {
        isDragging = false;
    }

    filterContainer.addEventListener('mousedown', handleMouseDown);
    filterContainer.addEventListener('mouseleave', handleMouseLeave);
    filterContainer.addEventListener('mousemove', handleMouseMove);
    filterContainer.addEventListener('mouseup', handleOnEnd);


    const handleTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - filterContainer.offsetLeft;
        scrollLeft = filterContainer.scrollLeft;
        e.preventDefault();
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - filterContainer.offsetLeft;
        const walk = (x - startX) * 2;
        filterContainer.scrollLeft = scrollLeft - walk;
        e.preventDefault();
    };

    filterContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    filterContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    filterContainer.addEventListener('touchend', handleOnEnd);

});

// Мобильное меню
const burgerEl = document.getElementById('burger')
const mobileMenu = document.getElementById('mobile-menu')

burgerEl.onclick = function(e) {
    e.target.closest('button').classList.toggle('active')
    mobileMenu.classList.toggle('active')
    document.body.classList.toggle('hidden')
}

// Навигация
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        const isMobileLink = !!this.closest('.mobile-menu')
        
        if (isMobileLink) {
            burgerEl.classList.toggle('active')
            mobileMenu.classList.toggle('active')
            document.body.classList.toggle('hidden')
        }

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Наверх
const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.pointerEvents = "all";
    } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
    }
};

backToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Раскрытие текста в преимуществах
document.querySelectorAll('.advantages .show-more-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault()

        const container = btn.closest('.info')
        container.classList.toggle('active')
    })
})