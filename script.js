// 1. 배경색 변경 함수 (날씨 상태 코드에 따라 분기)
function updateBackground(weatherMain) {
    const body = document.body;
    body.className = ''; // 기존 클래스 초기화

    switch (weatherMain) {
        case 'Clear':
            body.classList.add('sunny');
            break;
        case 'Clouds':
        case 'Mist':
        case 'Haze':
        case 'Fog':
            body.classList.add('cloudy');
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            body.classList.add('rainy');
            break;
        case 'Snow':
            body.classList.add('snowy');
            break;
        default:
            body.classList.add('sunny'); // 기본값
    }
}

// 2. 옷차림 추천 함수 (온도별 분기)
function getClothingRecommendation(temp) {
    if (temp >= 28) return "민소매, 반팔, 반바지 (너무 더워요! 🥵)";
    if (temp >= 23) return "반팔, 얇은 셔츠, 반바지, 면바지";
    if (temp >= 20) return "얇은 가디건, 긴팔, 청바지";
    if (temp >= 17) return "얇은 니트, 맨투맨, 가디건";
    if (temp >= 12) return "자켓, 가디건, 야상, 스타킹";
    if (temp >= 9) return "트렌치코트, 야상, 점퍼";
    if (temp >= 5) return "코트, 가죽자켓, 히트텍";
    return "패딩, 두꺼운 코트, 목도리 (완전 무장 하세요! 🥶)";
}

// 3. 날씨 가져오기 메인 함수
async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const errorMessage = document.getElementById('errorMessage');
    
    const city = cityInput.value;

    if (!city) {
        alert("도시 이름을 입력해주세요!");
        return;
    }

    try {
        // Vercel 서버리스 함수 호출 (보안 유지)
        const url = `/api/weather?city=${city}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "도시를 찾을 수 없습니다.");

        // 화면 표시 시작
        errorMessage.classList.add('hidden');
        weatherResult.classList.remove('hidden');

        // 데이터 바인딩
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('windSpeed