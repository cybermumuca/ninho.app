export default function AppLayout({
  children,
  overlay,
}: Readonly<{
  children: React.ReactNode
  overlay: React.ReactNode
}>) {
  return (
    <>
      {children}
      {overlay}
    </>
  )
}
