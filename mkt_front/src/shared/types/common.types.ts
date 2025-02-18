export interface listItem {
    id: number;
    text: string;
  }
  
export  interface rowItem {
    id: number;
    title: string;
    field: string;
    editable: boolean;
    children?: rowItem[];
    recommendList?: listItem[];
    onValueChange?: (id: number, value: string) => void;
    depth?: number;
  }