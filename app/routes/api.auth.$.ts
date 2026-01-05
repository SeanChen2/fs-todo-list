// Note to self: the '$' splat is for sign-in, sign-up, etc. that BetterAuth uses

import { getAuth } from '~/auth';
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export async function loader({ request, context }: LoaderFunctionArgs) {
  return getAuth(context).handler(request);
}

export async function action({ request, context }: ActionFunctionArgs) {
  return getAuth(context).handler(request);
}
