export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-2"></div>
          <div className="h-4 w-96 bg-muted rounded"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6 p-6 border rounded-lg">
              <div className="w-48 h-48 bg-muted rounded-md"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 w-48 bg-muted rounded"></div>
                <div className="h-4 w-96 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 