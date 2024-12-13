import { Categories } from "@/components/categories"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">
            Checklists for Every Scenario
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay organized with our curated collection of checklists for life's many situations
          </p>
        </div>
        <Categories />
      </section>
    </div>
  )
}
