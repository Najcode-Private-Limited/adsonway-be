/* ---------------- User Interface ---------------- */
export interface UserInterface {
   _id: string;
   full_name: string;
   email: string;
   password: string;
   disabled: boolean;
   isVerified: boolean;
   role: string;
   display_picture: string;
   phone_number: string;
   organization: string;
   username: string;
}

/* ---------------- Login Interface ---------------- */
export interface LoginInterface {
   username: string;
   password: string;
}
