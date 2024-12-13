import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { getChecklist } from "@/lib/strapi"

interface ChecklistItem {
  label: string
  checked: boolean
}

interface ChecklistDetailProps {
  params: {
    documentId: string
    checklistId: string
  }
}

function renderContent(content: any[]) {
  return content.map((block, blockIndex) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={blockIndex} className="mb-4">
            {block.children?.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        )

      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag key={blockIndex} className="font-bold mt-6 mb-4">
            {block.children?.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </HeadingTag>
        )

      case 'list':
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul'
        return (
          <ListTag key={blockIndex} className={`mb-4 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'} ml-6`}>
            {block.children.map((listItem: any, listItemIndex: number) => (
              <li key={listItemIndex}>
                {listItem.children.map((child: any, childIndex: number) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </li>
            ))}
          </ListTag>
        )

      default:
        console.log('Unknown block type:', block.type)
        return null
    }
  })
}

export default async function ChecklistDetail({ params }: ChecklistDetailProps) {
  try {
    const response = await getChecklist(params.documentId, params.checklistId)
    const checklist = response.data

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter">
              {checklist.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {checklist.description}
            </p>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4 border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">Checklist Items</h2>
            <div className="space-y-4">
              {checklist.items?.map((item: ChecklistItem, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`item-${index}`}
                    defaultChecked={item.checked}
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor={`item-${index}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      item.checked ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none">
            {Array.isArray(checklist.content) ? (
              renderContent(checklist.content)
            ) : (
              <p className="text-muted-foreground">No content available</p>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in ChecklistDetail:', error)
    notFound()
  }
} 