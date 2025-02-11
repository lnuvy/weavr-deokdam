import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"

const KEYWORDS = ["의료(건강)", "차트", "푸르다", "뱀", "코인", "25번째", "프론트", "커피", "칫솔", "키보드"]

export interface SubmitType {
  keywords: string[]
  isDeepSeek: boolean
}

interface Step2Props {
  onSubmit: (data: SubmitType) => void
}

const Step2 = (props: Step2Props) => {
  const { onSubmit } = props

  const [isDeepSeek, setIsDeepSeek] = useState(true)

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => {
      if (prev.includes(keyword)) {
        return prev.filter(k => k !== keyword)
      } else if (prev.length < 3) {
        return [...prev, keyword]
      }
      return prev
    })
  }

  const handleSubmit = () => {
    onSubmit({ keywords: selectedKeywords, isDeepSeek })
  }

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">키워드 선택</p>

            <div className="flex items-center gap-2">
              <p className="ml-2 whitespace-nowrap font-bold">{isDeepSeek ? "DeepSeek-r1:14b" : "Llama3.1:8b"}</p>
              <Switch checked={isDeepSeek} onCheckedChange={setIsDeepSeek} />
            </div>
          </div>
        </CardTitle>
        <CardDescription>최대 3개의 키워드를 선택하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {KEYWORDS.map(keyword => (
            <Badge
              key={keyword}
              variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm"
              onClick={() => toggleKeyword(keyword)}
            >
              {keyword}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">선택된 키워드: {selectedKeywords.length}/3</p>

          <Button onClick={handleSubmit}>결과 보기</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Step2
