import { auth } from "~/auth";
import { RegisterPage } from "../auth/RegisterPage";
import { type ActionFunctionArgs, redirect } from "react-router";

// When the form is submitted
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Do some process
  const response = await auth.api.signUpEmail({
    body: { name, email, password }
  })
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(response);

  return redirect("/home");
}

export default function Login() {
  return <RegisterPage />;
}
