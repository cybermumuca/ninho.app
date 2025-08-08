import { GalleryVerticalEnd } from "lucide-react"
import { SignUpForm } from "./sign-up-form"

export default function SignUpPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ninho
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignUpForm />
          </div>
        </div>
      </div>

      {/* (TODO: ADICIONAR PIXEL ART NO FUTURO) */}
      {/* <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Bem-vindo ao Ninho
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Junte-se à nossa comunidade e descubra todas as funcionalidades
              que preparamos especialmente para você.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500"></div>
                Cadastro rápido e seguro
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500"></div>
                Autenticação com redes sociais
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-purple-500"></div>
                Interface moderna e responsiva
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}