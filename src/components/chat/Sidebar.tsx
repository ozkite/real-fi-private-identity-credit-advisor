"use client";

import {
  CheckIcon,
  EditIcon,
  EllipsisVertical,
  Trash2Icon,
  XIcon,
} from "lucide-react";
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
  const [contextMenuChatId, setContextMenuChatId] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
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

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (_event: MouseEvent) => {
      if (contextMenuChatId) {
        setContextMenuChatId(null);
      }
    };

    if (contextMenuChatId) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenuChatId]);

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

  const handleDeleteChat = async (chatId: string) => {
    if (isDeleting) return;

    setIsDeleting(true);
    setContextMenuChatId(null);

    try {
      const response = await fetch("/api/deleteChat", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
      });

      if (response.ok) {
        // Remove from local state
        setChatHistory((prev) => prev.filter((chat) => chat._id !== chatId));

        // Remove from localStorage
        LocalStorageService.removeChatFromHistory(chatId);

        // If we're currently viewing the deleted chat, redirect to home
        if (currentChatId === chatId) {
          router.push("/app");
        }
      } else {
        console.error("Failed to delete chat");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRenameChat = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
    setContextMenuChatId(null);
  };

  const handleSaveRename = async (chatId: string) => {
    if (isRenaming || !editingTitle.trim()) return;

    setIsRenaming(true);

    try {
      const response = await fetch("/api/updateChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: chatId,
          title: editingTitle.trim(),
        }),
      });

      if (response.ok) {
        // Update local state
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat._id === chatId
              ? { ...chat, title: editingTitle.trim() }
              : chat,
          ),
        );

        // Update localStorage
        LocalStorageService.updateChatTitle(chatId, editingTitle.trim());
      } else {
        console.error("Failed to rename chat");
      }
    } catch (error) {
      console.error("Error renaming chat:", error);
    } finally {
      setIsRenaming(false);
      setEditingChatId(null);
      setEditingTitle("");
    }
  };

  const handleCancelRename = () => {
    setEditingChatId(null);
    setEditingTitle("");
  };

  return (
    <div
      className={`
        h-full w-[280px]
        bg-[#000201] flex flex-col
        fixed inset-y-0 left-0 z-40
        md:relative md:inset-auto md:left-auto
        overflow-hidden
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
            <XIcon size={20} className="text-white" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto overflow-x-hidden px-2">
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
                const showContextMenu = contextMenuChatId === chat._id;
                const isEditing = editingChatId === chat._id;
                const displayTitle =
                  !chat.title || chat.title === "null"
                    ? "Untitled"
                    : chat.title;

                return (
                  <div
                    key={chat._id}
                    className={`w-full flex items-center justify-between text-left px-4 py-2 text-md rounded-md group relative ${
                      isActive
                        ? "bg-[#333534] text-white"
                        : "text-white hover:bg-[#333534]"
                    }`}
                  >
                    {isEditing ? (
                      <div className="flex-1 flex items-center">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveRename(chat._id);
                            } else if (e.key === "Escape") {
                              handleCancelRename();
                            }
                          }}
                          className="flex-1 bg-transparent text-white border border-[#555] rounded px-2 py-1 text-sm focus:outline-none focus:border-[#FFC971] w-full"
                          autoFocus
                        />
                        <div className="flex items-center ml-1">
                          <button
                            onClick={() => handleSaveRename(chat._id)}
                            disabled={isRenaming}
                            className="disabled:opacity-50 p-0.5"
                          >
                            <CheckIcon
                              size={14}
                              className="text-green-500 hover:text-green-300"
                            />
                          </button>
                          <button
                            onClick={handleCancelRename}
                            className="p-0.5 ml-0.5"
                          >
                            <XIcon
                              size={14}
                              className="text-gray-400 hover:text-gray-300 "
                            />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link
                          href={`/app/chat/${chat._id}`}
                          className="flex-1 truncate"
                        >
                          {displayTitle}
                        </Link>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setContextMenuChatId(
                              showContextMenu ? null : chat._id,
                            );
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#444] rounded"
                        >
                          <EllipsisVertical
                            size={14}
                            className="text-gray-300"
                          />
                        </button>

                        {showContextMenu && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-[#2a2a2a] border border-[#444] rounded-lg shadow-lg z-50">
                            <button
                              onClick={() =>
                                handleRenameChat(chat._id, displayTitle)
                              }
                              disabled={isRenaming}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-[#333] rounded-lg transition-colors disabled:opacity-50"
                            >
                              <EditIcon size={14} />
                              Rename
                            </button>
                            <button
                              onClick={() => handleDeleteChat(chat._id)}
                              disabled={isDeleting}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#333] rounded-lg transition-colors disabled:opacity-50"
                            >
                              <Trash2Icon className="text-red-400" size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
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
