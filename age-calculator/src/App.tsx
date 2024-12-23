'use client'

import { useState } from 'react'

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>('')
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null)
  const [error, setError] = useState<string>('')

  const calculateAge = () => {
    if (!dob) {
      setError('Please select a date')
      return
    }

    const birthDate = new Date(dob)
    const today = new Date()

    // Validate date is not in the future
    if (birthDate > today) {
      setError('Birth date cannot be in the future')
      return
    }

    setError('')

    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    // Adjust for negative days
    if (days < 0) {
      months--
      // Get the last day of the previous month
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += lastMonth.getDate()
    }

    // Adjust for negative months
    if (months < 0) {
      years--
      months += 12
    }

    setAge({ years, months, days })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Age Calculator</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value)
                setError('')
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors outline-none"
              max={new Date().toISOString().split('T')[0]}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            onClick={calculateAge}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Calculate Age
          </button>

          {age && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <p className="text-2xl text-center font-bold text-gray-800">
                {age.years} years {age.months} months {age.days} days
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

