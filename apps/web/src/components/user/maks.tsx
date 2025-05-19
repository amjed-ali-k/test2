import { useUser } from "@/hooks/use-user";

const SystemAdminView = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  return user?.type === "SYSTEM_ADMIN" ? children : null;
};

const OrgAdminView = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  return user?.type === "ORGANISATION_ADMIN" ? children : null;
};

const AdminsOnlyView = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  return user?.type === "SYSTEM_ADMIN" || user?.type === "ORGANISATION_ADMIN"
    ? children
    : null;
};

const InternalStaffView = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  return user?.type === "INTERNAL_STAFF" ? children : null;
};

const AllExceptAdminsView = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  return user?.type !== "SYSTEM_ADMIN" && user?.type !== "ORGANISATION_ADMIN"
    ? children
    : null;
};

const AllExceptOrgAdminsView = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useUser();
  return user?.type !== "ORGANISATION_ADMIN" ? children : null;
};

const AllExceptInternalStaffView = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useUser();
  return user?.type !== "SYSTEM_ADMIN" &&
    user?.type !== "ORGANISATION_ADMIN" &&
    user?.type !== "INTERNAL_STAFF"
    ? children
    : null;
};

const Mask = () => {};

Mask.AdminOnly = SystemAdminView;
Mask.OrgAdminOnly = OrgAdminView;
Mask.AdminsOnly = AdminsOnlyView;
Mask.InternalStaffOnly = InternalStaffView;
Mask.AllUsers = AllExceptAdminsView;
Mask.AllExceptOrgAdmin = AllExceptOrgAdminsView;
Mask.AllCare24Users = AllExceptInternalStaffView;

export { Mask };
