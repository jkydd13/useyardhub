import AccountAuthGuard from "./AccountAuthGuard";
import { useAuth } from "../contexts/AuthContext";

export default function AccountRouteGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <AccountAuthGuard />;
  }

  return children;
}
