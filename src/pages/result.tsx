import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { LoadingIconLarge } from "@/components/loading"
import ResultCard from "@/components/result-card"
import { generateDeokdam } from "@/lib/ollama"

const ResultPage = () => {
  const { isDeepSeek, name, keywords } = useLocation().state as {
    isDeepSeek: boolean
    name: string
    keywords: string[]
  }

  const [str, setStr] = useState("")
  const loadingRef = useRef(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (loadingRef.current) return

    const fetchDeokdam = async () => {
      setIsLoading(true)
      const str = await generateDeokdam(isDeepSeek, name, keywords)
      if (str) setStr(str)
      setIsLoading(false)
    }
    fetchDeokdam()
    loadingRef.current = true
  }, [isDeepSeek, name, keywords])

  return (
    <div
      className="flex h-screen w-screen items-center justify-center"
      style={{
        backgroundImage: "url(/bg2.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isLoading && <LoadingIconLarge />}
      {!isLoading && <ResultCard {..._getThinkTagAndResult(str)} />}
    </div>
  )
  // return <div>{JSON.stringify(deokdam)}</div>
}

export default ResultPage

const _getThinkTagAndResult = (str: string) => {
  const thinkMatch = str.match(/<think>([\s\S]*?)<\/think>/)
  const thinkScript = thinkMatch ? thinkMatch[1].trim() : ""

  const deokdam = str.replace(/<think>[\s\S]*?<\/think>/, "").trim()

  return {
    deokdam,
    thinkScript,
  }
}
