export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4 animate-pulse">
          <div className="h-10 w-2/3 bg-muted rounded"></div>
          <div className="h-6 w-full bg-muted rounded"></div>
        </div>

        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-5/6 bg-muted rounded"></div>
              <div className="h-4 w-4/6 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 