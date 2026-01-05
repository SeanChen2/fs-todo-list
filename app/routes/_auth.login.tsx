import { getAuth } from "~/auth";
import { LoginPage } from "../auth/LoginPage";
import { type ActionFunctionArgs, redirect } from "react-router";

// When the form is submitted
export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Do some process
  const response = await getAuth(context).api.signInEmail({
    body: { email, password },
    asResponse: true,
  })
  console.log(email);
  console.log(password);
  console.log(response);

  return redirect("/home", {
    headers: response.headers,
  });
}

export default function Login() {
  return <LoginPage />;
}
