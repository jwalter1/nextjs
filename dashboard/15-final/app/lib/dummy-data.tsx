import { User, Customer, Invoice, Revenue } from "./definitions";

// This file contains dummy data that you'll be replacing with real data in Chapter 7.
export const users: User[] = [
  {
    id: 1,
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

export const customers: Customer[] = [
  {
    id: 1,
    name: "Lee",
    email: "lee@nextmail.com",
  },
  {
    id: 2,
    name: "Michael",
    email: "michael@nextmail.com",
  },
  {
    id: 3,
    name: "Steph",
    email: "steph@nextmail.com",
  },
  {
    id: 4,
    name: "Delba",
    email: "delba@nextmail.com",
  },
];

export const invoices: Invoice[] = [
  {
    id: 1,
    customerId: 1,
    amount: 15795,
    status: "pending",
  },
  {
    id: 2,
    customerId: 2,
    amount: 20348,
    status: "pending",
  },
  {
    id: 3,
    customerId: 3,
    amount: 3040,
    status: "paid",
  },
  {
    id: 4,
    customerId: 4,
    amount: 44800,
    status: "paid",
  },
];

export const revenue: Revenue[] = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3500 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 2500 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4800 },
];
