export default async function handler(request, response) {
  const { city } = request.query;
  
  // Vercel 환경 변수 사용 (만약 환경변수 설정이 아직 안됐다면 여기에 직접 키를 넣으세요)
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "API Key 설정 오류" });
  }

  // 1. 현재 날씨 URL
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // 2. 5일 예보 URL
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // 두 개의 API 요청을 동시에 보냄 (속도 향상)
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (!currentRes.ok || !forecastRes.ok) {
      return response.status(404).json({ error: currentData.message || forecastData.message });
    }

    // 두 데이터를 합쳐서 프론트엔드로 보냄
    response.status(200).json({
      current: currentData,
      forecast: forecastData
    });

  } catch (error) {
    response.status(500).json({ error: "서버 내부 오류 발생" });
  }
}