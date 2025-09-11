"use client";

interface SignInButtonProps {
  onSignIn: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onSignIn }) => {
  return (
    <button
      type="button"
      onClick={onSignIn}
      className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors mr-2"
      data-umami-event="Sign In Clicked"
    >
      Sign in
    </button>
  );
};

export default SignInButton;
