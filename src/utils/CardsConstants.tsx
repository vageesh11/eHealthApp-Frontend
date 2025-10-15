export interface CardData {
  title: string;
  value: string | number;
  percentage: string;
  isPositive?: boolean;
  bgColor: string;
  icon: string;
}

export const CARDS_DATA: CardData[] = [
  {
    title: "Enrolled Members",
    value: 1500,
    percentage: "+0.54%",
    isPositive: true,
    icon: "/images/enrolled.png",
    bgColor: "bg-purple-400",
  },
  {
    title: "Customers",
    value: 32300,
    percentage: "-13.66%",
    isPositive: false,
    icon: "/images/customers.png",
    bgColor: "bg-blue-400",
  },
  {
    title: "Consumers",
    value: 15000,
    percentage: "+18.67%",
    isPositive: true,
    icon: "/images/consumers.png",
    bgColor: "bg-teal-400",
  },
  {
    title: "Total Claim Submissions",
    value: 234987,
    percentage: "+0.37%",
    isPositive: true,
    icon: "/images/claims.png",
    bgColor: "bg-pink-400",
  },
];
