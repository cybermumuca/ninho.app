import { GalleryVerticalEnd } from "lucide-react"
import { SignInForm } from "./sign-in-form"

export default function SignInPage() {
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
          <SignInForm />
        </div>
      </div>

      {/* (TODO: ADICIONAR PIXEL ART NO FUTURO) */}
      {/* <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Bem-vindo de volta!
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Entre na sua conta e continue aproveitando todos os recursos
              do Ninho.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  )
}