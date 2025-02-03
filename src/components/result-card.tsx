import { useLocation } from "react-router"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface ResultCardProps {
  deokdam: string
  thinkScript: string
}

const ResultCard = (props: ResultCardProps) => {
  const { deokdam, thinkScript } = props
  const { name } = useLocation().state as { name: string }

  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle>{name}님의 운세</CardTitle>
      </CardHeader>
      <CardContent>{deokdam}</CardContent>
      <CardFooter>
        <details className="w-full">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">추론 스크립트 보기</summary>
          <code className="mt-2 block whitespace-pre-wrap rounded-md bg-gray-100 p-4 text-sm">{thinkScript}</code>
        </details>
      </CardFooter>
    </Card>
  )
}

export default ResultCard
