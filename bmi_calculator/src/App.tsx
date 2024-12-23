'use client'

import { useState } from 'react'

export default function BMICalculator() {
  const [weight, setWeight] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [error, setError] = useState<string>('')

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal weight'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
  }

  const calculateBMI = () => {
    setError('')
    
    if (weight === '' || height === '') {
      setError('Please enter both weight and height')
      return
    }

    if (weight <= 0 || height <= 0) {
      setError('Weight and height must be positive numbers')
      return
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100
    const bmiValue = Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
    setBmi(bmiValue)
  }

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setBmi(null)
    setError('')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[500px] max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">BMI Calculator</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="weight" 
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="height" 
              className="block text-sm font-medium text-gray-700"
            >
              Height (cm)
            </label>
            <input
              id="height"
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={calculateBMI}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate BMI
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              {error}
            </div>
          )}

          {bmi !== null && !error && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
              <p>
                Your BMI is <span className="font-bold">{bmi}</span>
              </p>
              <p>
                Category: <span className="font-bold">{getBMICategory(bmi)}</span>
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
    
  )
}

