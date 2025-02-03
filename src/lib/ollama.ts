import ky from "ky"

const prompt = (name: string, keywords: string[]) => `
다음 규칙에 따라 2025년의 행복을 기원하는 좋은 문장을 만들어줘.
규칙:
- 이름 + "님의 2025년 운세입니다." 로 시작
- 주어진 키워드가 있다면 키워드를 활용해 창의적인 어휘 만들기
- 부정적인 의미 포함하지 않고 긍정적으로만
- 첫 문장 포함 최대 3문장, 150자 이내로 간결하게
- 중요: 중국어나 영어, 일본어 없이 무조건 "한국어"로 덕담하기
이름: ${name}
키워드: ${keywords.join(", ")}
`

export const postGenerate = async (isDeepSeek: boolean, prompt: string) => {
  try {
    const res = await ky.post("http://localhost:11434/api/generate", {
      json: {
        model: isDeepSeek ? "deepseek-r1:14b" : "llama3.1:8b",
        prompt,
        stream: false,
      },
      timeout: 10 * 60 * 1000,
    })
    const json = (await res.json()) as { response: string }

    return json.response
  } catch (error) {
    console.error("Error postGenerate:", error)
  }
}

export const generateDeokdam = async (isDeepSeek: boolean, name: string, keywords: string[]) => {
  try {
    return await postGenerate(isDeepSeek, prompt(name, keywords))
  } catch (error) {
    console.error("Error generateDeokdam:", error)
  }
}
