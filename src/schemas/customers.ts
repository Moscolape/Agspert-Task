export interface CustomerProfile {
  id: number;
  name: string;
  color: [number, number, number];
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
];