import { NotFoundItems, Pagination, Table, TableBody } from "@/components";
import { useRecentView } from "@/queries/views.queries";

export function Recent() {
  const { data, isPending } = useRecentView();

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
        <Table isLoading={isPending}>
          <TableBody items={data?.folders ?? []} />
          <TableBody items={data?.files ?? []} />
        </Table>
        <NotFoundItems
          hasItems={data?.folders?.length > 0 || data?.files?.length > 0}
        />
      </section>

      <section>
        <Pagination isLoading={isPending} />
      </section>
    </div>
  );
}
