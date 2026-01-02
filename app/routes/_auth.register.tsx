import { RegisterPage } from "../auth/RegisterPage";
import { type ActionFunctionArgs, redirect } from "react-router";

// When the form is submitted
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Do some process
  console.log(name);
  console.log(email);
  console.log(password);

  return redirect("/home");
}

export default function Login() {
  return <RegisterPage />;
}
