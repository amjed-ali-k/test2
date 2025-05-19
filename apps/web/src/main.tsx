import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.js";
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from "@clerk/react-router";
import { buttonVariants } from "@repo/ui/components/button";
import { inputClass } from "@repo/ui/components/input";
import { labelClass } from "@repo/ui/components/label";
import "@repo/ui/styles/globals.css";
import { LayoutUnauthenticated } from "@/components/layout-unauthenticated.js";
import SignIn from "@/routes/(public)/sign-in";
import SignOut from "@/routes/(public)/sign-out";
import SignUp from "@/routes/(public)/sign-up";
import { Toaster } from "@repo/ui/components/sonner";
import Dashboard from "@/routes/(private)/dashboard/overview";
import { LayoutAuthenticated } from "./components/layout-authenticated";
import PostLogin from "@/routes/(private)/post-login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutDashboard } from "./routes/(private)/dashboard/layout";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();
// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider
          routerDebug
          publishableKey={PUBLISHABLE_KEY}
          signInForceRedirectUrl={"/post-login"}
          appearance={{
            variables: { colorPrimary: "#1290E5" },
            elements: {
              socialButtonsBlockButton:
                "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
              socialButtonsBlockButtonText: "font-semibold",
              membersPageInviteButton:
                "bg-black border border-black border-solid hover:bg-white hover:text-black",
              card: "shadow-none border-0 border-slate-400 p-0 space-y-0",
              logoBox: "hidden",
              // header: "hidden",
              footer: "hidden",
              footerAction: "",
              main: "p-2",
              cardBox: "shadow-none",
              formButtonPrimary: buttonVariants({ variant: "default" }),
              formButtonReset: buttonVariants({ variant: "secondary" }),
              formFieldInput: inputClass,
              formFieldLabel: labelClass,
              headerTitle: "mt-3 text-xl lg:text-3xl text-left",
              headerSubtitle: "text-sm text-muted-foreground text-left",
              identityPreview: "rounded-none border-0 justify-start mt-4 px-2",
              identityPreviewText: "text-lg text-left",
            },
          }}
        >
          <Routes>
            <Route path="/" element={<App />} />
            <Route element={<LayoutUnauthenticated />}>
              <Route path="sign-in/*" element={<SignIn />} />
              <Route path="sign-out" element={<SignOut />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>
            <Route element={<LayoutAuthenticated />}>
              <Route path="post-login" element={<PostLogin />} />
              <Route element={<LayoutDashboard />}>
                <Route path="dashboard">
                  <Route path="overview" element={<Dashboard />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ClerkProvider>
      </QueryClientProvider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>
);
