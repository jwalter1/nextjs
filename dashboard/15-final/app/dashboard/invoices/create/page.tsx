import { createInvoice } from '@/app/lib/actions';
import { fetchAllCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchAllCustomers();

  return (
    <main className="mx-auto max-w-sm rounded-lg border px-6 py-8 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Create Invoice</h2>

      <form action={createInvoice}>
        {/* Customer Name */}
        <div className="mb-4">
          <label
            htmlFor="customer"
            className="mb-2 block text-sm font-semibold"
          >
            Customer
          </label>
          <select
            id="customer"
            name="customerId"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2  placeholder:text-gray-200"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-semibold">
            Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-600 sm:text-sm">$</span>
            </div>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="00.00"
              className="block w-full rounded-md border border-gray-200 py-2 pl-6 text-sm outline-2  placeholder:text-gray-200"
              required
              min="0"
            />
          </div>
        </div>

        {/* Invoice Status */}
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-semibold">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2  placeholder:text-gray-200"
            defaultValue="pending"
            required
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-center text-sm text-white outline-2 outline-offset-4 hover:bg-gray-800"
        >
          Create Invoice
        </button>
      </form>
    </main>
  );
}
