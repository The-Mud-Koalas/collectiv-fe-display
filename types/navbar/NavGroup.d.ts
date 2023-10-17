interface NavLinkType {
    url: string;
    name: string;
}

interface NavGroupType {
    name: string;
    group: NavGroupType[] | NavLinkType[];
}

type NavLinksType = (NavLinkType | NavGroupType)[];