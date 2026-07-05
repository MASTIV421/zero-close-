import { type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <input
        className={`bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:border-white/30 focus:outline-none transition-colors placeholder:text-white/30 ${className}`}
        {...props}
      />
    </div>
  )
}