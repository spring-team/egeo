export interface StDropDownMenuItem {
   label: string;
   value: any;
   icon?: string;
   selected?: boolean;
}

export interface StDropDownMenuGroup {
   title?: string;
   items: Array<StDropDownMenuItem>;
}

