import { NotFoundItems, Pagination, Table, TableBody } from "@/components";
import { useTrashView } from "@/queries/views.queries";

export function Trash() {
  const { data, isPending } = useTrashView();

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
