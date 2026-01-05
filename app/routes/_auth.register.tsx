import { auth } from "~/auth";
import { RegisterPage } from "../auth/RegisterPage";
import { type ActionFunctionArgs, redirect } from "react-router";

// When the form is submitted
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await auth.api.signUpEmail({
    body: { name, email, password },
    asResponse: true,
  })

  // Error handling
  if (!response.ok) {
    const data = await response.clone().json();
    const message = data?.message ?? data?.error ?? "Something went wrong. Please try again."
    return {
      formError: message,
    }
  }

  return redirect("/home", {
    headers: response.headers,
  });
}

export default function Login() {
  return <RegisterPage />;
}
