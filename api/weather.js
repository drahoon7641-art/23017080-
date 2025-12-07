export default async function handler(request, response) {
  const { city } = request.query;

  // 👇 기존 코드는 주석(//) 처리하고, 아래에 본인 키를 직접 문자열로 넣으세요.
  // const apiKey = process.env.WEATHER_API_KEY; 
  const apiKey = "2e8475d119533fc7fe12c476bfddf4e3"; 

  // ---------------------------------------------------------

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