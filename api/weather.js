export default async function handler(request, response) {
  const { city } = request.query;

  // 👇 다시 'Vercel 금고'에서 키를 꺼내오도록 수정
  const apiKey = process.env.WEATHER_API_KEY;

  // 금고가 비어있거나 키를 못 찾으면 에러 처리
  if (!apiKey) {
    return response.status(500).json({ error: "API Key 설정 오류: Vercel 환경변수를 확인하세요." });
  }

  // 1. 현재 날씨 요청
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // 2. 5일 예보 요청
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (!currentRes.ok) return response.status(404).json({ error: currentData.message });
    if (!forecastRes.ok) return response.status(404).json({ error: forecastData.message });

    response.status(200).json({
      current: currentData,
      forecast: forecastData
    });

  } catch (error) {
    response.status(500).json({ error: "서버 내부 오류 발생" });
  }
}