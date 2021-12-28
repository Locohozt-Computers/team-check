export const menus = [
  { id: 1, route: "home", text: "Home", iconType: "home" },
  { id: 1, route: "phones", text: "Registered Phone", iconType: "phone" },
  {
    id: 1,
    route: "wallet",
    text: "Wallet",
    iconType: "wallet",
    menus: [
      { id: 1, route: "home", text: "Balance", iconType: "wallet" },
      { id: 2, text: "Transaction", iconType: "wallet" },
    ],
  },
  { id: 1, route: "bank", text: "Bank", iconType: "university" },
  { id: 1, route: "user", text: "Profile", iconType: "user" },
];
