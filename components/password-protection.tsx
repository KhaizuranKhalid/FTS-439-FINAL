"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordProtectionProps {
  children: React.ReactNode;
  isEnabled?: boolean;
  promptTitle?: string;
}

type AuthContextValue = {
  isAuthenticated: boolean;
  accessLevel: number;
  isSuperUser: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within PasswordProtection");
  }
  return ctx;
}

const STORAGE_KEY = "fsae_auth_timestamp";
const STORAGE_ACCESS = "fsae_access_level";
const STORAGE_SUPER = "fsae_super_user";
const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;

export function PasswordProtection({
  children,
  isEnabled = true,
  promptTitle = "FSAE Documentation Access",
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [accessLevel, setAccessLevel] = useState<number>(0);
  const [isSuperUser, setIsSuperUser] = useState<boolean>(false);

  useEffect(() => {
    if (!isEnabled) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    const storedTimestamp = localStorage.getItem(STORAGE_KEY);

    if (storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const now = Date.now();

      if (now - timestamp < MONTH_IN_MS) {
        const storedLevel = parseInt(
          localStorage.getItem(STORAGE_ACCESS) || "0",
          10
        );
        const superFlag = localStorage.getItem(STORAGE_SUPER) === "1";
        if ((!Number.isNaN(storedLevel) && storedLevel > 0) || superFlag) {
          setAccessLevel(Math.min(Math.max(storedLevel || 0, 0), 3));
          setIsSuperUser(superFlag);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_ACCESS);
        localStorage.removeItem(STORAGE_SUPER);
      }
    }

    setIsLoading(false);
  }, [isEnabled]);

  const mapPasswordToAccess = (pwd: string): number => {
    if (pwd === "NUSFSAER26e") return 99; // Superuser
    if (pwd === "NUSFSAEY2") return 1;
    if (pwd === "NUSFormulaSAER26e") return 2;
    if (pwd === "NUSFSAE3301") return 3;
    return 0;
  };

  const doLogin = useCallback(async (pwd: string): Promise<boolean> => {
    const level = mapPasswordToAccess(pwd.trim());
    if (level > 0) {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      const superFlag = level === 99;
      if (superFlag) {
        localStorage.setItem(STORAGE_SUPER, "1");
        localStorage.removeItem(STORAGE_ACCESS);
        setIsSuperUser(true);
        setAccessLevel(3);
      } else {
        localStorage.setItem(STORAGE_ACCESS, String(level));
        localStorage.removeItem(STORAGE_SUPER);
        setIsSuperUser(false);
        setAccessLevel(level);
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    doLogin(password).then((ok) => {
      if (!ok) {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_ACCESS);
    localStorage.removeItem(STORAGE_SUPER);
    setAccessLevel(0);
    setIsSuperUser(false);
    setIsAuthenticated(false);
  }, []);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      accessLevel,
      isSuperUser,
      login: doLogin,
      logout,
    }),
    [isAuthenticated, accessLevel, isSuperUser, doLogin, logout]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isEnabled || isAuthenticated) {
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">{promptTitle}</CardTitle>
            <CardDescription>
              Please enter the password to access the documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={!password.trim()}
              >
                Access Documentation
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Access will be remembered for 30 days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthContext.Provider>
  );
}
