'use client';

import { useInsuranceForm } from '../hooks/useInsuranceForm';
import FormInput from '../components/FormInput';
import SelectInput from '../components/SelectInput';

export default function Home() {
  const { form, loading, result, handleChange, handleSubmit } =
    useInsuranceForm();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg ring-1 ring-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
          Life Insurance Recommendation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
            placeholder="Enter your age"
          />
          <FormInput
            label="Income ($)"
            name="income"
            type="number"
            value={form.income}
            onChange={handleChange}
            required
            placeholder="e.g. 50000"
          />
          <FormInput
            label="Number of Dependents"
            name="dependents"
            type="number"
            value={form.dependents}
            onChange={handleChange}
            required
            placeholder="e.g. 2"
          />
          <SelectInput
            label="Risk Tolerance"
            name="risk"
            value={form.risk}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select risk tolerance' },
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md'
            }`}
          >
            {loading ? 'Loading...' : 'Get Recommendation'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-200 shadow-inner">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              ✅ Recommendation:
            </h2>
            <p className="text-gray-800 font-medium">{result.plan}</p>
            <p className="text-gray-600 mt-2">{result.reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}
