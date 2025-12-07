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
        // Vercel 서버(Serverless Function)로 요청
        const url = `/api/weather?city=${city}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "도시를 찾을 수 없습니다.");
        }

        // 성공 시 에러 메시지 숨기고 결과 보여주기
        errorMessage.classList.add('hidden');
        weatherResult.classList.remove('hidden');

        // 1. 도시 이름 및 날씨 상태
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').innerText = data.weather[0].description;

        // 2. 아이콘 설정 (OpenWeatherMap 공식 아이콘 주소)
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weatherIcon').src = iconUrl;

        // 3. 상세 정보 (습도, 풍속) - 과제 필수 항목
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('windSpeed').innerText = `${data.wind.speed} m/s`;

    } catch (error) {
        console.error(error);
        weatherResult.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.innerText = `❌ ${error.message}`;
    }
}

// 엔터키 눌러도 검색되게 하기 (UX 개선)
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

document.getElementById('searchBtn').addEventListener('click', getWeather);