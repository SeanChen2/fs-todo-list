import { auth } from "~/auth";
import { LoginPage } from "../auth/LoginPage";
import { type ActionFunctionArgs, redirect } from "react-router";

// When the form is submitted
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Do some process
  const response = await auth.api.signInEmail({
    body: { email, password }
  })
  console.log(email);
  console.log(password);
  console.log(response);

  return redirect("/home");
}

export default function Login() {
  return <LoginPage />;
}
