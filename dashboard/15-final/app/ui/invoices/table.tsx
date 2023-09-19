import Link from 'next/link';
import Image from 'next/image';
import {
  PencilSquareIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import DeleteInvoice from '@/app/ui/invoices/delete-button';
import TableSearch from './table-search';
import PaginationButtons from './pagination';
import EditInvoice from '@/app/ui/invoices/edit-button';
import AddInvoice from '@/app/ui/invoices/add-button';
import {
  fetchFilteredInvoices,
  fetchInvoiceCountBySearchTerm,
} from '@/app/lib/data';

const ITEMS_PER_PAGE = 10;

import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

export default async function InvoicesTable({
  searchParams,
}: {
  searchParams: {
    query: string;
    page: string;
  };
}) {
  const searchTerm = searchParams.query ?? '';
  let currentPage = 1;
  if (!searchTerm) {
    currentPage = parseInt(searchParams.page ?? '1');
  }

  const invoices = await fetchFilteredInvoices(
    searchTerm,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const totalCount = await fetchInvoiceCountBySearchTerm(searchTerm);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base font-semibold">Invoices</h1>
        <AddInvoice />
      </div>
      <div className="mt-8 flex items-center justify-between gap-2">
        <TableSearch searchParams={searchParams} />
        <PaginationButtons
          searchParams={searchParams}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
      <div className="mt-4 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md border">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 text-left text-sm">
                  <tr>
                    <th scope="col" className="px-3.5 py-3.5  sm:pl-6">
                      #
                    </th>
                    <th scope="col" className="px-3 py-3.5 font-semibold">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-3.5 font-semibold">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 font-semibold">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 font-semibold">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 font-semibold">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-500">
                  {invoices?.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                        {invoice.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`${invoice.customer_image}`}
                            className="rounded-full"
                            alt="Customer Image"
                            width={28}
                            height={28}
                          />
                          <p>{invoice.customer_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {invoice.customer_email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {(invoice.amount / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {formatDateToLocal(invoice.date)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <InvoiceStatus status={invoice.status} />
                      </td>
                      <td className="flex justify-end gap-2 whitespace-nowrap py-4 pl-3 pr-6 text-sm">
                        <EditInvoice id={invoice.id} />
                        <DeleteInvoice id={invoice.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
