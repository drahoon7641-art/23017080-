// 1. 내가 발급받은 API 키 변수 설정 (여기에 복사한 키를 넣으세요)
const API_KEY = "2e8475d119533fc7fe12c476bfddf4e3"; 

// 2. 날씨를 가져오는 함수 정의
async function getWeather(city) {
    try {
        // API 주소 만들기 (도시이름, API키, 섭씨온도 설정)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        // 서버에 데이터 요청 (fetch)
        const response = await fetch(url);

        // 응답이 실패했는지 확인
        if (!response.ok) {
            throw new Error("도시를 찾을 수 없거나 API 요청에 실패했습니다.");
        }

        // 받아온 데이터를 JSON(자바스크립트 객체)으로 변환
        const data = await response.json();

        // 3. 콘솔에 결과 출력 (F12 눌러서 확인 가능)
        console.log("받아온 날씨 데이터:", data);
        
        // 간단한 테스트용: 화면에 알림창 띄우기
        alert(`${city}의 온도는 현재 ${data.main.temp}°C 입니다!`);

    } catch (error) {
        console.error("에러 발생:", error);
    }
}

// 4. 함수 실행 (테스트로 'Seoul' 날씨 가져오기)
getWeather("Seoul");