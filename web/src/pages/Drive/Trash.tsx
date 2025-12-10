import { Pagination, TrashTable } from "@/components";

export function Trash() {
  return (
    <div className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-6">
      {/* Header */}
      <section>
        <div>
          <h2 className="text-2xl">Trash</h2>
          <p className="text-sm">
            Item here will be deleted permanently after 30 days.
          </p>
        </div>
      </section>

      {/* Items */}
      <section className="h-[60vh] overflow-y-scroll rounded-2xl">
        <TrashTable />
      </section>

      <section>
        <Pagination />
      </section>
    </div>
  );
}
