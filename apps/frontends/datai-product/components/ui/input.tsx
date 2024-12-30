   import React from 'react'

   type InputProps = React.InputHTMLAttributes<HTMLInputElement>

   export const Input = React.forwardRef<HTMLInputElement, InputProps>(
     ({ className, ...props }, ref) => {
       return (
         <input
           className={`border rounded px-3 py-2 w-full ${className}`}
           ref={ref}
           {...props}
         />
       )
     }
   )

   Input.displayName = 'Input'