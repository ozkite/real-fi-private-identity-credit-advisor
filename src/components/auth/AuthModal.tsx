import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/UnifiedAuthProvider";
import WalletButton from "./WalletButton";

type AuthMode = "signin" | "signup" | "forgot-password";

export default function AuthModal({
  mode: initialMode,
  onClose,
}: {
  mode: "signin" | "signup";
  onClose: () => void;
}) {
  const [mode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [keepMePosted, setKeepMePosted] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "signin") {
        await signIn(email, password);
        onClose();
      } else {
        await signUp(email, password, name, keepMePosted);
        setShowEmailConfirmation(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (showEmailConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a confirmation link to{" "}
            <span className="font-medium">{email}</span>. Please check your
            email to complete your registration.
          </p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                className="w-3 h-3"
                checked={keepMePosted}
                onChange={(e) => setKeepMePosted(e.target.checked)}
              />
              <span className="text-xs text-gray-600">
                Keep me posted on what&apos;s new
              </span>
            </label>
          </div>
          <WalletButton onClose={onClose} />
          {mode === "signup" && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                By agreeing to sign up you are agreeing to the{" "}
                <Link
                  href="/terms-services"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  terms and services
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  privacy policy
                </Link>
              </p>
            </div>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
            >
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
