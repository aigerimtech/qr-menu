import {redirect} from "next/navigation";
import {routing} from "@/i18n/routing"; // or "../../src/i18n/routing" based on your alias

export default function Page() {
  redirect(`/${routing.defaultLocale}`);
}
