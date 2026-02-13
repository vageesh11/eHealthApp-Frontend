
export const BAR_GRAPH_DATA = [
  { name: "Jan", revenue: 500, expenses: 350, profits: 50 },
  { name: "Feb", revenue: 700, expenses: 550, profits: 100 },
  { name: "Mar", revenue: 800, expenses: 720, profits: 120 },
  { name: "Apr", revenue: 900, expenses: 800, profits: 220 },
  { name: "May", revenue: 1050, expenses: 950, profits: 260 },
  { name: "Jun", revenue: 1300, expenses: 1150, profits: 400 },
];

// Colors 
export const BAR_COLORS = {
  revenue: "#34d399",
  expenses: "#fbbf24",
  profits: "#60a5fa",
};


export const BAR_LEGEND = [
  { label: "Revenue Growth", color: BAR_COLORS.revenue },
  { label: "Expenses", color: BAR_COLORS.expenses },
  { label: "Profits", color: BAR_COLORS.profits },
];

// Y-axis 
export const Y_AXIS_TICKS = [0, 200, 400, 600, 800, 1000, 1200, 1400];
export const Y_AXIS_DOMAIN: [number, number] = [0, 1400];
