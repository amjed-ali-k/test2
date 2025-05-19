import { treaty } from "@elysiajs/eden";
import type { App } from "@repo/api";
import { useAuth } from "@clerk/react-router";

const useToken = () => {
  const session = useAuth();
  return session.getToken;
};

export const eden = treaty<App>("http://localhost:3500", {
  keepDomain: !!import.meta.env.PROD,
});

export const useEden = () => {
  const token = useToken();
  return async () => {
    const header = {
      Authorization: `Bearer ${await token()}`,
    };
    return treaty<App>("http://localhost:3500", {
      keepDomain: !!import.meta.env.PROD,
      headers: header,
    });
  };
};

// const res = await ed().then(e => e.admin.allOrgAdmins.get().then(k => k.data as {data: {id: number, name: string}[]}));