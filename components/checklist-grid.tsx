import Image from "next/image"
import Link from "next/link"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { getCategory } from "@/lib/strapi"

interface ChecklistGridProps {
  categoryId: string
}

export async function ChecklistGrid({ categoryId }: ChecklistGridProps): Promise<JSX.Element> {
  try {
    const response = await getCategory(categoryId)
    console.log('Category Response:', JSON.stringify(response, null, 2))

    if (!response?.data) {
      return (
        <div className="p-6 border rounded-lg bg-yellow-100">
          <p>Category not found</p>
        </div>
      )
    }

    const category = response.data
    const checklists = category.checklists || []

    return (
      <>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">{category.title}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>

        {checklists.length === 0 ? (
          <div className="p-6 border rounded-lg bg-muted">
            <p className="text-muted-foreground">No checklists available in this category</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {checklists.map((checklist) => (
              <Link 
                key={checklist.id}
                href={`/categories/${categoryId}/checklists/${checklist.documentId}`}
                className="block"
              >
                <Card className="hover:bg-accent transition-colors">
                  <div className="flex gap-6 p-6">
                    <div className="relative w-48 h-48 flex-none bg-muted rounded-md overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-sm">Checklist Image</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <CardTitle className="mb-2">{checklist.title}</CardTitle>
                      <CardDescription>{checklist.description}</CardDescription>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </>
    )
  } catch (error) {
    console.error('Error in ChecklistGrid:', error)
    return (
      <div className="p-6 border rounded-lg bg-red-100">
        <p className="text-red-600 font-bold">Error loading checklists</p>
        <p className="mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    )
  }
} 