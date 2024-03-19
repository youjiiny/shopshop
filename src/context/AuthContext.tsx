import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onUserStateChange } from 'api/auth';

type User = FirebaseUser | null;

export const AuthContext = createContext<User>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, SetUser] = useState<FirebaseUser | null>(null);
  useEffect(() => {
    onUserStateChange((user: User) => {
      SetUser(user);
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
