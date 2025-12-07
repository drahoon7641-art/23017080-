export default async function handler(request, response) {
  const { city } = request.query;

  // 👇 다시 보안 금고에서 키를 가져오도록 수정
  const apiKey = process.env.WEATHER_API_KEY;

  // 키가 없을 경우 에러 처리
  if (!apiKey) {
    return response.status(500).json({ error: "서버 설정 오류: API Key가 없습니다." });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const weatherRes = await fetch(url);
    const data = await weatherRes.json();

    if (!weatherRes.ok) {
      return response.status(weatherRes.status).json({ error: data.message });
    }

    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "서버 내부 오류 발생" });
  }
}