const regions = [
    { id: 'ru', name: 'Россия' },
    { id: 'kz', name: 'Казахстан' },
    { id: 'by', name: 'Беларусь' },
    { id: 'uz', name: 'Узбекистан' },
    { id: 'az', name: 'Азербайджан' },
    { id: 'am', name: 'Армения' },
    { id: 'kg', name: 'Киргизия' },
    { id: 'md', name: 'Молдова' },
    { id: 'tj', name: 'Таджикистан' },
    { id: 'tm', name: 'Туркменистан' }
];

const cities = [
    // Российские города
    { id: 'moscow', name: 'Москва', region: 'ru' },
    { id: 'spb', name: 'Санкт-Петербург', region: 'ru' },
    { id: 'novosibirsk', name: 'Новосибирск', region: 'ru' },
    { id: 'ekaterinburg', name: 'Екатеринбург', region: 'ru' },
    { id: 'kazan', name: 'Казань', region: 'ru' },
    { id: 'nn', name: 'Нижний Новгород', region: 'ru' },
    { id: 'chelyabinsk', name: 'Челябинск', region: 'ru' },
    { id: 'samara', name: 'Самара', region: 'ru' },
    { id: 'omsk', name: 'Омск', region: 'ru' },
    { id: 'rostov', name: 'Ростов-на-Дону', region: 'ru' },
    { id: 'ufa', name: 'Уфа', region: 'ru' },
    { id: 'krasnoyarsk', name: 'Красноярск', region: 'ru' },
    { id: 'perm', name: 'Пермь', region: 'ru' },
    { id: 'voronezh', name: 'Воронеж', region: 'ru' },
    { id: 'volgograd', name: 'Волгоград', region: 'ru' },
    { id: 'krasnodar', name: 'Краснодар', region: 'ru' },
    { id: 'tolyatti', name: 'Тольятти', region: 'ru' },
    { id: 'tyumen', name: 'Тюмень', region: 'ru' },
    { id: 'izhevsk', name: 'Ижевск', region: 'ru' },
    { id: 'barnaul', name: 'Барнаул', region: 'ru' },
    { id: 'irkutsk', name: 'Иркутск', region: 'ru' },
    { id: 'ulyanovsk', name: 'Ульяновск', region: 'ru' },
    { id: 'khabarovsk', name: 'Хабаровск', region: 'ru' },
    { id: 'vladivostok', name: 'Владивосток', region: 'ru' },
    { id: 'yaroslavl', name: 'Ярославль', region: 'ru' },
    { id: 'makhachkala', name: 'Махачкала', region: 'ru' },
    { id: 'tomsk', name: 'Томск', region: 'ru' },
    { id: 'orenburg', name: 'Оренбург', region: 'ru' },
    { id: 'ryazan', name: 'Рязань', region: 'ru' },
    { id: 'astrahan', name: 'Астрахань', region: 'ru' },
    { id: 'penza', name: 'Пенза', region: 'ru' },
    { id: 'lipetsk', name: 'Липецк', region: 'ru' },
    { id: 'kirov', name: 'Киров', region: 'ru' },
    { id: 'cheboksary', name: 'Чебоксары', region: 'ru' },
    { id: 'kaliningrad', name: 'Калининград', region: 'ru' },
    { id: 'tula', name: 'Тула', region: 'ru' },
    { id: 'stavropol', name: 'Ставрополь', region: 'ru' },
    { id: 'sochi', name: 'Сочи', region: 'ru' },
    { id: 'novokuznetsk', name: 'Новокузнецк', region: 'ru' },
    { id: 'kemerovo', name: 'Кемерово', region: 'ru' },
    { id: 'saratov', name: 'Саратов', region: 'ru' },
    { id: 'naberezhnye_chelny', name: 'Набережные Челны', region: 'ru' },
    
    // Города других стран
    { id: 'baku', name: 'Баку', region: 'az' },
    { id: 'yerevan', name: 'Ереван', region: 'am' },
    { id: 'minsk', name: 'Минск', region: 'by' },
    { id: 'astana', name: 'Астана', region: 'kz' },
    { id: 'almaty', name: 'Алматы', region: 'kz' },
    { id: 'bishkek', name: 'Бишкек', region: 'kg' },
    { id: 'chisinau', name: 'Кишинёв', region: 'md' },
    { id: 'dushanbe', name: 'Душанбе', region: 'tj' },
    { id: 'ashgabat', name: 'Ашхабад', region: 'tm' },
    { id: 'tashkent', name: 'Ташкент', region: 'uz' }
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
            <button data-city="${city.name}">
                открыть коворкинг
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
                    <path d="M2 6.93795C1.41344 6.93794 0.937945 7.41344 0.937945 8C0.937945 8.58656 1.41344 9.06205 2 9.06205L2 6.93795ZM23.9921 8.75099C24.4068 8.33623 24.4068 7.66377 23.9921 7.24902L17.2332 0.490138C16.8184 0.0753802 16.146 0.0753801 15.7312 0.490138C15.3165 0.904896 15.3165 1.57735 15.7312 1.99211L21.7391 8L15.7312 14.0079C15.3165 14.4226 15.3165 15.0951 15.7312 15.5099C16.146 15.9246 16.8184 15.9246 17.2332 15.5099L23.9921 8.75099ZM2 9.06205L23.2411 9.06206L23.2411 6.93795L2 6.93795L2 9.06205Z" fill="#EE7E4E"/>
                </svg>
            </button>
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