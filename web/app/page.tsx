import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold">Ninho</h1>

        <div className="flex gap-4 w-full">
          <Button asChild className="flex-1">
            <Link href="/auth/sign-up">Criar Conta</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/auth/sign-in">Entrar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
