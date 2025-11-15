import { AuthLayout } from "@/features/auth/components/auth-layout";

const Lyaout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Lyaout;
