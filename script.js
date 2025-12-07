const API_KEY = "2e8475d119533fc7fe12c476bfddf4e3"; // 여기에 본인 키 붙여넣기!

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (!city) {
        alert("도시 이름을 입력해주세요!");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error("도시를 찾을 수 없습니다.");
        }

        // 화면에 결과 보여주기
        resultDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>온도: <strong>${data.main.temp}°C</strong></p>
            <p>날씨: ${data.weather[0].description}</p>
        `;

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
    }
}

// 버튼 클릭 시 실행
document.getElementById('searchBtn').addEventListener('click', getWeather);