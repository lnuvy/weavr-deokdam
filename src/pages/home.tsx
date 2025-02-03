import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import Step1 from "@/components/step1"
import Step2, { SubmitType } from "@/components/step2"

const HomePage = () => {
  const nav = useNavigate()
  const [step, setStep] = useState(1)

  const nodeRef = useRef(null)

  const [name, setName] = useState("")

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleSubmit = (data: SubmitType) => {
    const { isDeepSeek, keywords } = data

    nav("/result", { state: { isDeepSeek, name, keywords } })
  }

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: "url(/bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto flex h-full w-fit flex-col items-center justify-center">
        <SwitchTransition>
          <CSSTransition
            key={step}
            timeout={300}
            classNames={{
              appear: "appear",
              appearActive: "appear-active",
              appearDone: "appear-done",
              enter: "enter",
              enterActive: "enter-active",
              enterDone: "enter-done",
              exit: "exit",
              exitActive: "exit-active",
              exitDone: "exit-done",
            }}
          >
            <div ref={nodeRef}>
              {step === 1 && <Step1 value={name} onChange={onChangeName} onNext={handleNext} />}
              {step === 2 && <Step2 onSubmit={handleSubmit} />}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

export default HomePage
