import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { ChevronRightIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavItem } from "./nav-config";


type Props = {
    items: NavItem[];
    role?: string;
};



const colorMap = {
    accent: "text-accent",
    destructive: "text-destructive",
};



function SidebarItem({
    item,
}: {
    item: NavItem;
}) {

    const navigate = useNavigate();
    const location = useLocation();


    return (
        <SidebarMenuItem>

            <SidebarMenuButton
                onClick={() =>
                    item.onClick(navigate, location)
                }
            >

                {item.icon}

                <span
                    className={
                        item.titleColor
                            ? colorMap[item.titleColor as keyof typeof colorMap]
                            : undefined
                    }
                >
                    {item.title}
                </span>

            </SidebarMenuButton>

        </SidebarMenuItem>
    );
}




function SidebarCollapsibleItem({
    item,
    role,
}: {
    item: NavItem;
    role?: string;
}) {

    const navigate = useNavigate();
    const location = useLocation();


    const subItems =
        item.items?.filter(
            sub =>
                !sub.adminOnly ||
                role === "admin" ||
                role === "owner"
        );



    return (

        <Collapsible
            defaultOpen={item.isActive}
            className="group/collapsible"
            render={<SidebarMenuItem />}
        >

            <CollapsibleTrigger
                render={
                    <SidebarMenuButton tooltip={item.title}/>
                }
            >

                {item.icon}

                <span>
                    {item.title}
                </span>


                <ChevronRightIcon
                    className="
                        ml-auto
                        transition-transform
                        duration-200
                        group-data-open/collapsible:rotate-90
                    "
                />

            </CollapsibleTrigger>



            <CollapsibleContent>

                <SidebarMenuSub>

                    {subItems?.map(sub => (

                        <SidebarMenuSubItem
                            key={sub.title}
                        >

                            <SidebarMenuSubButton
                                onClick={() =>
                                    sub.onClick(
                                        navigate,
                                        location
                                    )
                                }
                            >

                                <span
                                    className={
                                        sub.titleColor
                                            ? colorMap[
                                                sub.titleColor as keyof typeof colorMap
                                            ]
                                            : undefined
                                    }
                                >
                                    {sub.title}
                                </span>


                            </SidebarMenuSubButton>

                        </SidebarMenuSubItem>

                    ))}

                </SidebarMenuSub>

            </CollapsibleContent>

        </Collapsible>
    );
}




export function NavMain({
    items,
    role,
}: Props) {


    const filteredItems =
        items.filter(
            item =>
                !item.adminOnly ||
                role === "admin" ||
                role === "owner"
        );



    return (

        <SidebarGroup>

            <SidebarGroupLabel>
                Platform
            </SidebarGroupLabel>


            <SidebarMenu>

                {
                    filteredItems.map(item =>

                        item.items

                            ? (
                                <SidebarCollapsibleItem
                                    key={item.title}
                                    item={item}
                                    role={role}
                                />
                            )

                            : (
                                <SidebarItem
                                    key={item.title}
                                    item={item}
                                />
                            )
                    )
                }

            </SidebarMenu>

        </SidebarGroup>
    );
}