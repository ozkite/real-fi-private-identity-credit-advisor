"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/contexts/UnifiedAuthProvider";
import { useEncryption } from "@/hooks/useEncryption";
import { LocalStorageService } from "@/services/LocalStorage";
import AttestationModal from "../AttestationModal";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

interface ChatItem {
  _id: string;
  title: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onClose }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { decrypt, hasSecretKey } = useEncryption();

  const currentChatId = pathname?.match(/\/app\/chat\/(.+)/)?.[1];
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isAttestationModalOpen, setIsAttestationModalOpen] = useState(false);
  const staleChatsRef = useRef(false);

  // Utility function to truncate wallet address
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get display name based on auth provider
  const userName = (() => {
    if (!user) return "Anonymous";

    if (user.authProvider === "privy" && user.walletAddress) {
      return truncateAddress(user.walletAddress);
    }

    if (user.authProvider === "supabase") {
      return user.name || user.email || "Anonymous";
    }

    return user.name || "Anonymous";
  })();
  const initials = (() => {
    if (userName === "Anonymous") return "AN";

    // For wallet addresses (0x...), use first 2 characters after 0x
    if (userName.startsWith("0x")) {
      return userName.slice(2, 4).toUpperCase();
    }

    // For regular names, use first letters of words
    return userName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();
  })();

  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        const res = await fetch("/api/getChats", {
          method: "GET",
          headers,
        });
        if (!res.ok) {
          console.error("Failed to fetch chats:", res.statusText);
          setChatHistory([]);
          setLoading(false);
          return;
        }
        const data = await res.json();

        setChatHistory((prev) => {
          const rawChats = (data.content.result || [])
            .map((chat: ChatItem) => {
              // Handle case where title might be an object (e.g., { '%allot': 'actual title' })
              let actualTitle = chat.title;
              if (typeof chat.title === "object" && chat.title !== null) {
                if (chat.title["%allot"]) {
                  actualTitle = chat.title["%allot"];
                } else {
                  // Handle other possible object formats
                  const keys = Object.keys(chat.title);
                  if (keys.length === 1) {
                    actualTitle = chat.title[keys[0]];
                  }
                }
              }

              return {
                ...chat,
                title: actualTitle,
              };
            })
            .filter(
              (c: ChatItem) => c.title && c.title !== "null" && c.title !== "",
            );

          // Decrypt chat titles if user has secret key
          const processChats = async () => {
            if (hasSecretKey && rawChats.length > 0) {
              const decryptedChats = await Promise.all(
                rawChats.map(async (chat: ChatItem) => {
                  try {
                    const decryptedTitle = await decrypt(chat.title);
                    return {
                      ...chat,
                      title: decryptedTitle,
                    };
                  } catch (error) {
                    console.error("Error decrypting chat title:", error);
                    return chat;
                  }
                }),
              );
              return decryptedChats;
            } else {
              return rawChats;
            }
          };

          processChats().then((realChats) => {
            const realIds = new Set<string>(
              realChats.map((c: ChatItem) => c._id),
            );

            if (!staleChatsRef.current) {
              LocalStorageService.removeUntitledChatsNotIn(realIds);
              staleChatsRef.current = true;
            }

            setChatHistory(() => {
              const localChats = LocalStorageService.getChatHistory();
              const optimistic = localChats.filter(
                (c: ChatItem) =>
                  !realIds.has(c._id) && c.title === "Untitled Chat",
              );

              return [...optimistic, ...realChats];
            });
          });

          return prev;
        });
      } catch (error) {
        console.error("Error fetching chats:", error);
        setChatHistory([]);
      } finally {
        setLoading(false);
      }
    };

    if (user && hasSecretKey) {
      getChats();
    } else {
      setLoading(false);
      setChatHistory([]);
      return;
    }

    const handleSidebarRefresh = () => {
      if (isCreatingChat) {
        return;
      }

      LocalStorageService.removeUntitledChats();

      getChats();
    };
    window.addEventListener("sidebar:refresh", handleSidebarRefresh);
    return () => {
      window.removeEventListener("sidebar:refresh", handleSidebarRefresh);
    };
  }, [user, hasSecretKey, decrypt, isCreatingChat]); // Added hasSecretKey dependency

  const handleNewChat = async () => {
    setIsCreatingChat(true);
    const newChat = { _id: uuidv4(), title: "Untitled Chat" };

    // Optimistic update
    setChatHistory((prev) => [newChat, ...prev]);

    LocalStorageService.addChatToHistory(newChat);

    router.push(`/app/chat/${newChat._id}`);

    setTimeout(() => {
      setIsCreatingChat(false);
    }, 500);
  };

  return (
    <div
      className={`
        h-full w-[280px]
        bg-[#000201] flex flex-col
        fixed inset-y-0 left-0 z-40
        md:relative md:inset-auto md:left-auto
        ${isCollapsed ? "hidden" : "block"}
      `}
    >
      <div className="w-full flex flex-col h-full">
        <div className="flex items-center justify-between md:border-neutral-200 shrink-0 px-4 py-8 ">
          <Link href="/app">
            <div className="flex flex-row ">
              <Image
                src="/img/white_logo.svg"
                alt="nilGPT Logo"
                width={24}
                height={24}
              />
              <Image
                className="ml-2"
                src="/img/nilGPT_whiteText.svg"
                alt="nilGPT Logo"
                width={65}
                height={25}
              />
            </div>
          </Link>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden hover:bg-[#333534] rounded-lg p-2 transition-colors"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-2">
          <button
            data-umami-event="sidebar-new-chat-button"
            disabled={!user}
            className={`w-full text-sm font-medium text-white transition-colors text-left px-4 py-1 rounded-lg
              ${
                !user
                  ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                  : "hover:bg-[#333534]"
              }`}
            onClick={() => handleNewChat()}
          >
            <div className="flex flex-row justify-between items-center  ">
              <div className="text-white text-center text-md ">New Chat</div>
              <div className="font-normal text-3xl text-[#FFC971] p-0 m-0">
                +
              </div>
            </div>
          </button>
          <div className="pt-8">
            <span className="text-md font-medium text-white px-4 opacity-50">
              Your chats
            </span>
          </div>
          <div className="space-y-0.5">
            {loading ? (
              <div className="px-4 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-[#333534] rounded-md animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              chatHistory.map((chat) => {
                const isActive = currentChatId === chat._id;
                return (
                  <Link
                    href={`/app/chat/${chat._id}`}
                    key={chat._id}
                    className={`w-full flex items-center justify-between text-left px-4 py-2 text-md rounded-md ${
                      isActive
                        ? "bg-[#333534] text-white"
                        : "text-white hover:bg-[#333534]"
                    }`}
                  >
                    <span className="flex-1 truncate">
                      {!chat.title || chat.title === "null"
                        ? "Untitled"
                        : chat.title}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <Dialog
          open={isAttestationModalOpen}
          onOpenChange={setIsAttestationModalOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="self-center bg-[#FFC971] rounded-full w-fit gap-2 px-4 my-4 hover:bg-[#FFC971]/90"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="text-sm text-black">Attestation</span>
            </Button>
          </DialogTrigger>
          <AttestationModal />
        </Dialog>

        <div className="border-t border-neutral-600 shrink-0 py-3 p-4 ">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#FFC971] flex items-center justify-center text-sm font-medium text-black shrink-0">
              {initials}
            </div>
            <span className="text-md text-white truncate">{userName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
