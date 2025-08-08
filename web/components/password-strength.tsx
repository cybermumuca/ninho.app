"use client"

import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { score: 0, text: "", color: "" }

    let score = 0
    let feedback = []

    if (password.length >= 8) score += 1
    else feedback.push("pelo menos 8 caracteres")

    if (/[a-z]/.test(password)) score += 1
    else feedback.push("letra minúscula")

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push("letra maiúscula")

    if (/\d/.test(password)) score += 1
    else feedback.push("número")


    if (/[^A-Za-z0-9]/.test(password)) score += 1
    else feedback.push("caractere especial")

    const strengthMap = {
      0: { text: "Muito fraca", color: "bg-red-500" },
      1: { text: "Fraca", color: "bg-red-400" },
      2: { text: "Razoável", color: "bg-yellow-500" },
      3: { text: "Boa", color: "bg-blue-500" },
      4: { text: "Forte", color: "bg-green-500" },
      5: { text: "Muito forte", color: "bg-green-600" }
    }

    return {
      score,
      text: strengthMap[score as keyof typeof strengthMap].text,
      color: strengthMap[score as keyof typeof strengthMap].color,
      feedback
    }
  }

  const strength = getPasswordStrength(password)

  if (password.length === 0) return null

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-2 w-full rounded-full transition-colors",
              level <= strength.score ? strength.color : "bg-gray-200"
            )}
          />
        ))}
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Força da senha:</span>
        <span className={cn(
          "font-medium",
          strength.score <= 2 ? "text-red-500" : strength.score <= 3 ? "text-yellow-500" : "text-green-500"
        )}>
          {strength.text}
        </span>
      </div>
      {strength.feedback && strength.feedback.length > 0 && strength.score < 4 && (
        <p className="text-xs text-muted-foreground">
          Adicione: {strength.feedback.join(", ")}
        </p>
      )}
    </div>
  )
}
