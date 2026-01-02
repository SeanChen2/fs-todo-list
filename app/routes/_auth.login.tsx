import { LoginPage } from "../auth/LoginPage";
import { type ActionFunctionArgs, redirect } from "react-router";

// When the form is submitted
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Do some process
  console.log(email);
  console.log(password);

  return redirect("/home");
}

export default function Login() {
  return <LoginPage />;
}
