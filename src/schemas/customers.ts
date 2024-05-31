export interface CustomerProfile {
  id: number;
  name: string;
  color: number[];
  email: string;
  pincode: string;
  location_name: string;
  type: string;
  profile_pic: string | null;
  gst: string;
}

export interface Customer {
  id: number;
  customer: number;
  customer_profile: CustomerProfile;
}

export const Customers: Customer[] = [
  {
    id: 9,
    customer: 11908,
    customer_profile: {
      id: 11908,
      name: "Lakshmi",
      color: [182, 73, 99],
      email: "jesus_christ@church.com",
      pincode: "Mumbai",
      location_name: "Mumbai, Maharashtra, India",
      type: "C",
      profile_pic: null,
      gst: "",
    },
  },
  {
    id: 10,
    customer: 11909,
    customer_profile: {
      id: 11909,
      name: "Ravi",
      color: [123, 104, 238],
      email: "ravi@example.com",
      pincode: "Delhi",
      location_name: "Delhi, India",
      type: "B",
      profile_pic: null,
      gst: "27AABCU9603R1ZM",
    },
  },
  {
    id: 11,
    customer: 11910,
    customer_profile: {
      id: 11910,
      name: "Anita",
      color: [255, 165, 0],
      email: "anita@example.com",
      pincode: "Bangalore",
      location_name: "Bangalore, Karnataka, India",
      type: "C",
      profile_pic: null,
      gst: "",
    },
  },
  {
    id: 12,
    customer: 11911,
    customer_profile: {
      id: 11911,
      name: "Vikram",
      color: [50, 205, 50],
      email: "vikram@example.com",
      pincode: "Hyderabad",
      location_name: "Hyderabad, Telangana, India",
      type: "A",
      profile_pic: null,
      gst: "36AABCU9603R1ZM",
    },
  },
  {
    id: 13,
    customer: 11912,
    customer_profile: {
      id: 11912,
      name: "Priya",
      color: [255, 20, 147],
      email: "priya@example.com",
      pincode: "Chennai",
      location_name: "Chennai, Tamil Nadu, India",
      type: "B",
      profile_pic: null,
      gst: "",
    },
  },
];