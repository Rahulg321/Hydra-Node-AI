import {
  BarChart2,
  BookOpen,
  Calendar,
  ChevronUp,
  FileText,
  Home,
  Inbox,
  Search,
  Settings,
  TrendingUp,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsTools } from "react-icons/bs";
import UsernameDropDown from "./username-dropdown";
import { GiTalk } from "react-icons/gi";

// Menu items.
const items = [
  {
    title: "Exams",
    url: "/instructor/exams",
    icon: FileText,
  },
  {
    title: "Performance",
    url: "/instructor/performance",
    icon: TrendingUp,
  },
  {
    title: "Communication",
    url: "/instructor/communication",
    icon: GiTalk,
  },
  {
    title: "Analytics",
    url: "/instructor/analytics",
    icon: BarChart2,
  },
  {
    title: "Resources",
    url: "/instructor/resources",
    icon: BookOpen,
  },
  {
    title: "Tools",
    url: "/instructor/tools",
    icon: BsTools,
  },
];

export function InstructorSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UsernameDropDown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
