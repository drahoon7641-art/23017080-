export default async function handler(request, response) {
  const { city } = request.query;

  // Vercel 환경 변수에서 키를 가져옴 (보안)
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "API Key가 설정되지 않았습니다." });
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
    response.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}