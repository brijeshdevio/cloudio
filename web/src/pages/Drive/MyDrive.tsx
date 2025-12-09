import { DriveHeader, DriveTable, Pagination } from "@/components";

export function MyDrive() {
  return (
    <div className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-6">
      {/* Header */}
      <section>
        <DriveHeader />
      </section>

      {/* Items */}
      <section className="h-[60vh] overflow-y-scroll rounded-2xl">
        <DriveTable />
      </section>

      <section>
        <Pagination />
      </section>
    </div>
  );
}
