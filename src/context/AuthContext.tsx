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
  const [user, SetUser] = useState<FirebaseUser | null>(null);

  const updateUser = (updated: { displayName: string }) => {
    updateUserName(updated);
    SetUser({ ...user, displayName: updated.displayName } as User);
  };
  useEffect(() => {
    onUserStateChange((user: User) => {
      SetUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
