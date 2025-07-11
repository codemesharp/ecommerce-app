import { useState } from 'react';
import axios from 'axios';

export interface Recommendation {
  plan: string;
  reason: string;
}

interface FormState {
  age: string;
  income: string;
  dependents: string;
  risk: 'low' | 'medium' | 'high';
}

export function useInsuranceForm() {
  const [form, setForm] = useState<FormState>({
    age: '',
    income: '',
    dependents: '',
    risk: 'medium',
  });

  const [result, setResult] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        age: Number(form.age),
        income: Number(form.income),
        dependents: Number(form.dependents),
        risk: form.risk,
      };

      const res = await axios.post('https://insurance-backend-express-postgres.onrender.com/recommendation/', payload);
      setResult(res.data);
    } catch {
      alert('Error fetching recommendation.');
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, result, handleChange, handleSubmit };
}
