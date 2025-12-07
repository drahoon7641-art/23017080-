// API Key 변수 삭제됨! (보안 처리 완료)

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (!city) {
        alert("도시 이름을 입력해주세요!");
        return;
    }

    try {
        // 변경된 부분: 외부 API가 아니라 '내 Vercel 서버'로 요청
        const url = `/api/weather?city=${city}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "도시를 찾을 수 없습니다.");
        }

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

document.getElementById('searchBtn').addEventListener('click', getWeather);