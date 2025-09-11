"use client";

interface SignUpButtonProps {
  onSignUp: () => void;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onSignUp }) => {
  return (
    <button
      type="button"
      onClick={onSignUp}
      className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 transition-colors"
      data-umami-event="Sign Up Clicked"
    >
      Sign up
    </button>
  );
};

export default SignUpButton;
