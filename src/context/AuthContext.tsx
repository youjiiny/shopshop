import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onUserStateChange, updateUserName } from 'api/auth';
import { AuthContextType, User } from 'types/auth';

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const updateUser = (updated: { displayName: string }) => {
    updateUserName(updated);
    setUser({ ...user, displayName: updated.displayName } as User);
  };
  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
