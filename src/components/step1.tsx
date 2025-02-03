import { ChangeEventHandler } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Step1Props {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onNext: () => void
}

const Step1 = (props: Step1Props) => {
  const { value, onChange, onNext } = props

  return (
    <div className="mx-auto flex h-full w-fit flex-col items-center justify-center">
      {/* <h1 className="pb-80 text-4xl font-bold">DeepSeek 덕담 제조기</h1> */}

      <div className="flex items-center justify-center gap-4 pt-48">
        <Input
          className="min-w-[300px] bg-white"
          placeholder="덕담을 들을 팀원의 이름을 입력해 주세요"
          value={value}
          onChange={onChange}
        />
      </div>

      <Button className="mt-10 w-full" disabled={value.length < 2} onClick={onNext}>
        다음
      </Button>
    </div>
  )
}

export default Step1
