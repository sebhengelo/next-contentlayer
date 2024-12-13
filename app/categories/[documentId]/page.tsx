import { Suspense } from "react"
import { ChecklistGrid } from "@/components/checklist-grid"

interface CategoryPageProps {
  params: {
    documentId: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <Suspense fallback={<div>Loading...</div>}>
          <ChecklistGrid categoryId={params.documentId} />
        </Suspense>
      </div>
    </div>
  )
} 