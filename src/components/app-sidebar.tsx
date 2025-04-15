"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Trash, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { chats, deleteChat } = useChatStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  // 채팅을 날짜순으로 정렬 (최신순)
  const sortedChats = Object.values(chats).sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );

  const onDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault(); // Link 클릭 이벤트 방지
    setChatToDelete(chatId);
    setIsDeleteDialogOpen(true);
  };

  const onDeleteConfirm = () => {
    if (chatToDelete) {
      const isCurrentChat = pathname === `/chat/${chatToDelete}`;
      deleteChat(chatToDelete); // Zustand 스토어에서 채팅 삭제

      // 현재 보고 있는 채팅을 삭제한 경우 홈 페이지로 리다이렉트
      if (isCurrentChat) {
        router.push("/");
      }
      setChatToDelete(null); // 다이얼로그 닫기
    }
  };

  return (
    <Sidebar collapsible="icon">
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={onDeleteConfirm}>
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup title="Recent Chats">
          {sortedChats.map((chat) => {
            // 첫 번째 메시지의 내용을 제목으로 사용
            const chatTitle = chat.messages[0]?.content || "New Chat";
            const isActive = pathname === `/chat/${chat.id}`;

            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  "group hover:bg-accent flex items-center justify-between rounded-lg px-2 py-2",
                  isActive && "bg-accent",
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span className="truncate">{chatTitle}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 cursor-pointer text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-600"
                  onClick={(e) => onDeleteClick(e, chat.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
