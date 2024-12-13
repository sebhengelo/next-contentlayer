import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getCategories } from "@/lib/strapi"

export async function Categories() {
  try {
    const response = await getCategories()

    if (!response?.data?.length) {
      return (
        <div className="text-center p-6 border rounded-lg bg-muted">
          <p className="text-muted-foreground">No categories available</p>
          <p className="text-sm text-muted-foreground mt-2">Please add some categories in your Strapi admin panel</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {response.data.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.documentId}`}
            className="block"
          >
            <Card className="hover:bg-accent transition-colors h-full">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error in Categories component:', error)
    return (
      <div className="p-6 border rounded-lg bg-red-100">
        <p className="text-red-600 font-bold">Error loading categories</p>
        <p className="mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    )
  }
} 