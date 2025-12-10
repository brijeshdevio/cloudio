import { Pagination, RecentTable } from "@/components";

export function Recent() {
  return (
    <div className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-6">
      {/* Header */}
      <section>
        <div>
          <h2 className="text-2xl">Recent</h2>
          <p className="text-sm">Your most recently accessed files.</p>
        </div>
      </section>

      {/* Items */}
      <section className="h-[60vh] overflow-y-scroll rounded-2xl">
        <RecentTable />
      </section>

      <section>
        <Pagination />
      </section>
    </div>
  );
}
