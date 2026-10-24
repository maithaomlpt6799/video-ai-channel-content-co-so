export type PageId = string;

export type Beat = {
  id: string;
  /** Trang giấy hiển thị trong beat này. Các beat liền nhau cùng page = cùng một tờ giấy. */
  page: PageId;
  text: string;
  /** Cụm phụ đề; `at` (giây từ đầu beat) để khớp chính xác với giọng thật. */
  chunks: {text: string; at?: number}[];
  highlight: string[];
  /** Giữ hình thêm bao nhiêu giây sau khi nói xong (để nét vẽ cuối kịp hiện trước khi sang trang). */
  holdSec?: number;
};

/** Mốc thời gian của một nét vẽ: bắt đầu khi cụm phụ đề `chunk` của `beat` bắt đầu (+ offset giây). */
export type Anchor = {beat: string; chunk: number; offset?: number};

export type InkColor = 'ink' | 'accent';

export type DrawItem =
  | {kind: 'path'; d: string; at: Anchor; dur: number; color?: InkColor; width?: number}
  | {
      kind: 'text';
      text: string;
      x: number;
      y: number;
      size: number;
      at: Anchor;
      dur: number;
      color?: InkColor;
      align?: 'start' | 'middle';
    }
  | {kind: 'count'; to: number; x: number; y: number; size: number; at: Anchor; dur: number; color?: InkColor};

export type PaperRect = {x: number; y: number; w: number; h: number};

export type PageSpec = {
  id: PageId;
  papers: PaperRect[];
  items: DrawItem[];
};
