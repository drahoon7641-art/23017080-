export default async function handler(request, response) {
  const { city } = request.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "API Key 설정 오류" });
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
    response.status(500).json({ error: "서버 오류 발생" });
  }
}