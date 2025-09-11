"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppContext";

interface SecretKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecretKeyModal({ isOpen, onClose }: SecretKeyModalProps) {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const { setUserSecretKeySeed, userSecretKeySeed } = useApp();

  useEffect(() => {
    if (isOpen && userSecretKeySeed) {
      onClose();
    }
  }, [isOpen, userSecretKeySeed, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretKey.trim()) {
      setError("Please enter your secret key");
      return;
    }

    setUserSecretKeySeed(secretKey);
    setSecretKey("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F7F6F2] rounded-lg p-8 w-full max-w-md mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Enter Your Passphrase
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Please create or enter your passphrase. This can be any word or
          phrase, and is used to encrypt all chat messages locally. Your
          passphrase never leaves your browser. <br />
          <br /> Keep your passphrase secure. You&apos;ll need to use the same
          one every time you want to view a chat.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="secretKey"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Passphrase
            </label>
            <input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => {
                setSecretKey(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFC971] focus:border-[#FFC971] bg-white text-black placeholder-gray-500"
              placeholder="Enter your passphrase..."
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-[#FFC971] py-3 px-6 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFC971] focus:ring-offset-2 transition-colors font-medium"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
