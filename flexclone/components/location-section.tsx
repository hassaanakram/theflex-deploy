export function LocationSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">📍</div>
          <p>Interactive map would be displayed here</p>
          <p className="text-sm">Downtown Loft, France</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">Browse more serviced rentals in Paris</p>
    </section>
  )
}
