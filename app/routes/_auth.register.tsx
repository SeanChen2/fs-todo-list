import { getAuth } from "~/auth";
import { RegisterPage } from "../auth/RegisterPage";
import { type ActionFunctionArgs, redirect } from "react-router";

// When the form is submitted
export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Do some process
  const t0 = Date.now();
  const response = await getAuth(context).api.signUpEmail({
    body: { name, email, password },
    asResponse: true,
  })
  console.log("register ms", Date.now() - t0);
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(response);

  return redirect("/home", {
    headers: response.headers,
  });
}

export default function Login() {
  return <RegisterPage />;
}
