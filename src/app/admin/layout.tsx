// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
