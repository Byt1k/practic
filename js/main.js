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

//popup
const popupEl = document.getElementById('popup')
const popupCityInput = document.getElementById('popup-city-input')
const popupCommentInput = document.getElementById('popup-message-input')

const calcCitySelect = document.querySelector('.calculator select')
const calcSquareInput = document.querySelector('.calculator #square-value')
const calcFormBtn = document.querySelector('.calculator .form .btn')

calcFormBtn.addEventListener("click", () => {
    popupCityInput.value = calcCitySelect.value
    popupCommentInput.value = `Площадь ${calcSquareInput.value}`
    openPopup()
})

document.getElementById('cities-list').addEventListener('click', (e) => {
    const button = e.target.closest('button[data-city]');
    if (button) {
        popupCityInput.value = button.getAttribute('data-city');
        openPopup();
    }
});

function openPopup() {
    document.body.classList.add('hidden')
    popupEl.classList.add('active')
}

function closePopup() {
    document.body.classList.remove('hidden')
    popupEl.classList.remove('active')
    popupCityInput.value = ''
    popupCommentInput.value = ''
}

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