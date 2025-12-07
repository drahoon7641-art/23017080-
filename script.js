// 배경 변경 함수
function updateBackground(weatherMain) {
    const body = document.body;
    body.className = ''; 
    switch (weatherMain) {
        case 'Clear': body.classList.add('sunny'); break;
        case 'Clouds': case 'Mist': case 'Haze': case 'Fog': body.classList.add('cloudy'); break;
        case 'Rain': case 'Drizzle': case 'Thunderstorm': body.classList.add('rainy'); break;
        case 'Snow': body.classList.add('snowy'); break;
        default: body.classList.add('sunny');
    }
}

// 옷차림 추천 함수
function getClothingRecommendation(temp) {
    if (temp >= 28) return "민소매, 반팔, 반바지 (폭염 주의! 🥵)";
    if (temp >= 23) return "반팔, 얇은 셔츠, 반바지";
    if (temp >= 20) return "얇은 가디건, 긴팔, 면바지";
    if (temp >= 17) return "얇은 니트, 맨투맨, 가디건";
    if (temp >= 12) return "자켓, 야상, 스타킹, 청바지";
    if (temp >= 9) return "트렌치코트, 점퍼, 기모바지";
    if (temp >= 5) return "코트, 가죽자켓, 히트텍";
    return "패딩, 목도리, 장갑 (한파 주의! 🥶)";
}

// 🌟 최근 검색어 저장 및 화면 표시 함수
function handleRecentSearch(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    // 중복 제거 및 최신 검색어를 맨 앞으로
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(city);
    
    // 최대 5개까지만 유지
    if (history.length > 5) history.pop();
    
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    renderRecentSearches();
}

function renderRecentSearches() {
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    const container = document.getElementById('recentSearchContainer');
    container.innerHTML = ''; // 초기화

    history.forEach(city => {
        const btn = document.createElement('button');
        btn.textContent = city;
        btn.className = 'recent-btn';
        btn.onclick = () => {
            document.getElementById('cityInput').value = city;
            getWeather();
        };
        container.appendChild(btn);
    });
}

// 🌟 메인 날씨 가져오기 함수
async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const errorMessage = document.getElementById('errorMessage');
    const forecastList = document.getElementById('forecastList');
    
    const city = cityInput.value;

    if (!city) {
        alert("도시 이름을 입력해주세요!");
        return;
    }

    try {
        const url = `/api/weather?city=${city}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "도시를 찾을 수 없습니다.");

        // 성공 시 화면 표시
        errorMessage.classList.add('hidden');
        weatherResult.classList.remove('hidden');

        // 1. 현재 날씨 처리
        const current = data.current;
        document.getElementById('cityName').innerText = current.name;
        document.getElementById('temperature').innerText = `${Math.round(current.main.temp)}°C`;
        document.getElementById('description').innerText = current.weather[0].description;
        document.getElementById('humidity').innerText = `${current.main.humidity}%`;
        document.getElementById('windSpeed').innerText = `${current.wind.speed} m/s`;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
        
        updateBackground(current.weather[0].main);
        document.getElementById('clothingText').innerText = getClothingRecommendation(current.main.temp);

        // 2. 5일 예보 처리 (필터링: 매일 낮 12시 데이터만 사용)
        forecastList.innerHTML = ''; // 초기화
        const dailyForecasts = data.forecast.list.filter(item => item.dt_txt.includes("12:00:00"));
        
        // 반복문 사용 (과제 요구사항)
        dailyForecasts.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('ko-KR', { weekday: 'short' }); // 월, 화...
            const temp = Math.round(item.main.temp);
            const icon = item.weather[0].icon;

            const card = `
                <div class="forecast-item">
                    <span class="forecast-date">${dayName}</span>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">
                    <span class="forecast-temp">${temp}°C</span>
                </div>
            `;
            forecastList.innerHTML += card;
        });

        // 3. 최근 검색어 저장
        handleRecentSearch(city);

    } catch (error) {
        console.error(error);
        weatherResult.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.innerText = `❌ ${error.message}`;
    }
}

// 초기화: 페이지 로드 시 최근 검색어 버튼 표시
document.addEventListener('DOMContentLoaded', renderRecentSearches);

// 이벤트 리스너
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});
document.getElementById('searchBtn').addEventListener('click', getWeather);