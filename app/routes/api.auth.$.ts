// Note to self: the '$' splat is for sign-in, sign-up, etc. that BetterAuth uses

import { auth } from '~/auth';
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request);
}
