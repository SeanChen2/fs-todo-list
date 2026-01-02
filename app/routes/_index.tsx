// Navigate directly to _auth.login.tsx

import { LoginPage } from "../auth/LoginPage";
import { redirect, type LoaderFunctionArgs } from "react-router";

export async function loader(_: LoaderFunctionArgs) {
  return redirect("/login");
}