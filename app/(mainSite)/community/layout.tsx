import React from "react";
import {
  BookOpen,
  Trophy,
  Newspaper,
  Users,
  MessageSquare,
  SpeechIcon,
} from "lucide-react";
import { NavItem } from "@/components/nav-item";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border/40 bg-background dark:border-border md:sticky md:block">
          <div className="flex h-full flex-col py-6 pr-6 lg:py-8">
            <nav className="flex flex-1 flex-col space-y-1">
              <NavItem
                href="/community"
                icon={<SpeechIcon className="size-4" />}
                label="Community"
              />
              <NavItem
                href="/community/resources"
                icon={<BookOpen className="size-4" />}
                label="Resources"
              />
              <NavItem
                href="/community/leaderboards"
                icon={<Trophy className="size-4" />}
                label="Leaderboards"
              />
              <NavItem
                href="/community/blog"
                icon={<Newspaper className="size-4" />}
                label="Blog"
              />
              <NavItem
                href="/community/social"
                icon={<Users className="size-4" />}
                label="Social"
              />
              <NavItem
                href="/community/forum"
                icon={<MessageSquare className="size-4" />}
                label="Forum"
              />
            </nav>
          </div>
        </aside>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
