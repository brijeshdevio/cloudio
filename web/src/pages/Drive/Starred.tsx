import { Pagination, StarredTable } from "@/components";

export function Starred() {
  return (
    <div className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-6">
      {/* Header */}
      <section>
        <div>
          <h2 className="text-2xl">Starred</h2>
          <p className="text-sm">
            All your important files and folders in one place.
          </p>
        </div>
      </section>

      {/* Items */}
      <section className="h-[60vh] overflow-y-scroll rounded-2xl">
        <StarredTable />
      </section>

      <section>
        <Pagination />
      </section>
    </div>
  );
}
