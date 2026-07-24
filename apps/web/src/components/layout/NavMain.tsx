import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";



function SidebarItem(item: {
  title: string; onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void; icon?: React.ReactNode; isActive?: boolean; items?: {
    title: string
    onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void
  }[]
}): import("react").JSX.Element {

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton onClick={() => item.onClick(navigate, location)}>
        {item.icon}
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarCollapsibleItem(item: {
  title: string; onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void; icon?: React.ReactNode; isActive?: boolean; items?: {
    title: string
    onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void
  }[]
}): import("react").JSX.Element {

  const navigate = useNavigate();

  const location = useLocation();

  return <Collapsible
    key={item.title}
    defaultOpen={item.isActive}
    className="group/collapsible"
    render={<SidebarMenuItem />}
  >
    <CollapsibleTrigger
      render={<SidebarMenuButton tooltip={item.title} />}
    >
      {item.icon}
      <span>{item.title}</span>
      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenuSub>
        {item.items?.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton onClick={() => subItem.onClick(navigate, location)}>
              <span>{subItem.title}</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  </Collapsible>
}



export function NavMain({
  items,
}: {
  items: {
    title: string
    onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      onClick: (navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>) => void
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? <SidebarCollapsibleItem key={item.title} {...item} /> : <SidebarItem key={item.title} {...item} />
        )}
      </SidebarMenu>
    </SidebarGroup>
  )

};