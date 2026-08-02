export const siteConfig = {
  name: "BH Electrics",
  legalName: "BH Electrics LLC",
  tagline: "Licensed Electricians Serving the North Shore",
  description:
    "BH Electrics is a licensed, insured electrical contractor based in Lynn, MA, providing residential, commercial, and 24/7 emergency electrical services across the North Shore of Massachusetts.",
  url: "https://www.bhelectrics.com",
  phone: "781-732-0174",
  phoneHref: "tel:+17817320174",
  email: "info@bhelectrics.com",
  address: {
    street: "20 N Federal St",
    city: "Lynn",
    state: "MA",
    stateFull: "Massachusetts",
    zip: "01905",
    country: "US",
  },
  geo: {
    latitude: 42.4668,
    longitude: -70.9495,
  },
  hours: [
    { day: "Monday", open: "07:00", close: "18:00" },
    { day: "Tuesday", open: "07:00", close: "18:00" },
    { day: "Wednesday", open: "07:00", close: "18:00" },
    { day: "Thursday", open: "07:00", close: "18:00" },
    { day: "Friday", open: "07:00", close: "18:00" },
    { day: "Saturday", open: "08:00", close: "14:00" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ],
  emergencyAvailable: true,
  founded: 2010,
  license: {
    label: "MA Electrical License",
    number: "License #A-XXXXX",
    note: "Provide your official MA electrical license number to replace this placeholder before launch.",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    google: "https://www.google.com/maps",
  },
} as const;

