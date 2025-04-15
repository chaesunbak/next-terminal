import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId, type Message } from "ai";

interface Chat {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

interface ChatStore {
  chats: Record<string, Chat>;
  currentChatId: string | null;
  createChat: () => string;
  createChatWithMessage: (message: Message) => string;
  loadChat: (id: string) => Message[] | null;
  saveChat: (id: string, messages: Message[]) => void;
  deleteChat: (id: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: {},
      currentChatId: null,

      createChat: () => {
        const id = generateId();
        set((state) => ({
          chats: {
            ...state.chats,
            [id]: {
              id,
              messages: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          },
          currentChatId: id,
        }));
        return id;
      },

      createChatWithMessage: (message: Message) => {
        const id = generateId();
        set((state) => ({
          chats: {
            ...state.chats,
            [id]: {
              id,
              messages: [message],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          },
          currentChatId: id,
        }));
        return id;
      },

      loadChat: (id: string) => {
        const chat = get().chats[id];
        return chat?.messages;
      },

      saveChat: (id: string, messages: Message[]) => {
        set((state) => ({
          chats: {
            ...state.chats,
            [id]: {
              ...state.chats[id],
              messages,
              updatedAt: Date.now(),
            },
          },
        }));
      },

      deleteChat: (id: string) => {
        set((state) => {
          const { [id]: _, ...remainingChats } = state.chats;
          return {
            chats: remainingChats,
            currentChatId:
              state.currentChatId === id ? null : state.currentChatId,
          };
        });
      },
    }),
    {
      name: "chat-store",
      // 선택적으로 특정 필드만 저장
      partialize: (state) => ({
        chats: state.chats,
      }),
    },
  ),
);
