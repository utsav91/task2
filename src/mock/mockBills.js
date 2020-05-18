function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayBy(duration) {
  await sleep(duration);
}

const bills = [
  {
    id: 1,
    description: "Dominoes",
    category: "FoodNDining",
    amount: "430",
    date: "05-02-2020",
  },
  {
    id: 2,
    description: "Car wash",
    category: "utility",
    amount: "500",
    date: "05-06-2020",

  },
  {
    id: 3,
    description: "Amazon",
    category: "shopping",
    amount: "2030",
    date: "05-07-2020",

  },
  {
    id: 4,
    description: "House rent",
    category: "Food & Dining",
    amount: "35900",
    date: "05-03-2020",

  },
  {
    id: 5,
    description: "Tuition",
    category: "education",
    amount: "2200",
    date: "05-12-2020",

  },
  {
    id: 6,
    description: "Laundry",
    category: "Personal Care",
    amount: "320",
    date: "05-14-2020",

  },
  {
    id: 7,
    description: "Vacation",
    category: "Travel",
    amount: "3430",
    date: "05-18-2020",

  },
  {
    id: 8,
    description: "Myntra",
    category: "shopping",
    amount: "2030",
    date: "05-07-2020",

  },
];

export async function getBills() {
  await delayBy(2000);
  return bills.sort((a,b) => +b.amount - +a.amount);
}
