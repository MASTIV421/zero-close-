import { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseClasses = 'px-6 py-3 font-medium transition-all duration-300 rounded-full'
  const primaryClasses = 'bg-white text-black hover:bg-white/90'
  const secondaryClasses = 'border border-white/20 text-white hover:bg-white/10'

  return (
    <button
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}