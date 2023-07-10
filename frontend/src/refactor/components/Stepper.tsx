import React from 'react'

type StepProps = {
  index: number
  step: string
  currentStep: number
  setCurrentStep: (index: number) => void
}

const Stepper: React.FC<StepProps> = ({ index, step, currentStep, setCurrentStep }) => {
  const stepClass = index <= currentStep ? 'step step-primary' : 'step'
  
  const handleClick = () => {
    setCurrentStep(index)
  }

  return (
    <li className={stepClass} onClick={handleClick}>{step}</li>
  )
}

export default Stepper