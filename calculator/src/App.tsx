"use client"

import { useState } from 'react'
import { FaDeleteLeft } from "react-icons/fa6";

type CalculatorButton = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '+' | '-' | '*' | '/' | '=' | 'C'

export default function Calculator() {
  const [input, setInput] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const handleButtonClick = (value: CalculatorButton) => {
    setError(false)

    if (value === '=') {
      try {
        // Using Function instead of eval for better security
        const result = new Function('return ' + input)()
        setInput(Number(result).toString())
      } catch (error) {
        setError(true)
        setInput('')
      }
    } else if (value === 'C') {
      setInput('')
    } else {
      setInput(input + value)
    }
  }

  const handleDelete = () => {
    setInput(input.slice(0, -1))
    setError(false)
  }

  const buttons: CalculatorButton[][] = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', 'C', '=', '+']
  ]

  const getButtonStyles = (button: CalculatorButton) => {
    const baseStyles = "w-full h-14 rounded-lg font-medium text-lg transition-all duration-200 active:scale-95 "

    if (button === 'C') {
      return baseStyles + "bg-red-500 hover:bg-red-600 text-white"
    }
    if (button === '=') {
      return baseStyles + "bg-green-500 hover:bg-green-600 text-white"
    }
    if (['+', '-', '*', '/'].includes(button)) {
      return baseStyles + "bg-indigo-500 hover:bg-indigo-600 text-white"
    }
    return baseStyles + "bg-gray-200 hover:bg-gray-300 text-gray-800"
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Calculator</h1>
      <div className="relative mb-6">
        <div 
          className={`w-full h-16 bg-gray-100 rounded-lg px-4 flex items-center justify-between overflow-hidden
            ${error ? 'bg-red-50' : ''}`}
        >
          <span className={`text-3xl font-medium tracking-wider ${error ? 'text-red-500' : 'text-gray-800'}`}>
            {error ? 'Error' : input || '0'}
          </span>
          <button 
            onClick={handleDelete}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Delete last digit"
          >
            <FaDeleteLeft className="w-6 h-6 text-gray-600"/>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((row, i) => (
          row.map((button) => (
            <button
              key={button}
              onClick={() => handleButtonClick(button)}
              className={getButtonStyles(button)}
            >
              {button}
            </button>
          ))
        ))}
      </div>
    </div>
    </div>
  )
}

