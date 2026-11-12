/** Dữ liệu mẫu chép nguyên văn từ Figma frame 27:27391 (#3066 · Hội Thoại 3). */

export type TagTone =
  | 'blue' | 'gold' | 'cyan' | 'purple' | 'orange' | 'lime' | 'geekblue' | 'magenta' | 'volcano' | 'green';

export interface ConvRow {
  id: string;
  name: string;
  preview: string;
  reply: boolean;
  strong: boolean; // chưa đọc → Medium
  bg: 'gray' | 'gray-dark' | 'blue' | 'white';
  bookmark?: boolean;
  icons: Array<'at' | 'bell-slash' | 'pushpin'>;
  tags: TagTone[];
  more?: boolean; // tag "+20"
  timeTone: 'teal' | 'gray';
}

const BOT = '[ Botcake reply ]';
const LOREM = 'Lorem ipsum dolor sit amet';

export const ROWS: ConvRow[] = [
  { id: 'r1', name: 'Savannah Nguyen', preview: BOT, reply: true, strong: true, bg: 'gray', bookmark: true, icons: ['at'], tags: ['blue', 'gold'], timeTone: 'teal' },
  { id: 'r2', name: 'Ralph Edwards', preview: BOT, reply: true, strong: true, bg: 'gray', bookmark: true, icons: ['at', 'bell-slash', 'pushpin'], tags: [], timeTone: 'teal' },
  { id: 'r3', name: 'Marvin McKinney', preview: BOT, reply: true, strong: true, bg: 'gray-dark', icons: ['at', 'pushpin'], tags: ['cyan'], timeTone: 'teal' },
  { id: 'r4', name: 'Ralph Edwards', preview: BOT, reply: true, strong: false, bg: 'white', icons: ['bell-slash', 'pushpin'], tags: ['purple', 'orange'], more: true, timeTone: 'teal' },
  { id: 'r5', name: 'Annette Black', preview: BOT, reply: true, strong: false, bg: 'white', icons: ['bell-slash', 'pushpin'], tags: [], timeTone: 'teal' },
  { id: 'r6', name: 'Courtney Henry', preview: LOREM, reply: false, strong: false, bg: 'white', icons: [], tags: ['lime', 'geekblue', 'magenta'], more: true, timeTone: 'gray' },
  { id: 'r7', name: 'Albert Flores', preview: BOT, reply: true, strong: false, bg: 'blue', icons: [], tags: ['blue', 'gold', 'purple'], more: true, timeTone: 'gray' },
  { id: 'r8', name: 'Leslie Alexander', preview: LOREM, reply: false, strong: false, bg: 'white', icons: [], tags: ['orange', 'volcano'], more: true, timeTone: 'gray' },
  { id: 'r9', name: 'Ralph Edwards', preview: LOREM, reply: false, strong: false, bg: 'white', icons: [], tags: ['blue', 'green', 'magenta'], more: true, timeTone: 'gray' },
];

export const NAV = ['Hội thoại', 'Đơn hàng', 'Bài viết', 'Thống kê', 'Cài đặt'];

export const NAVI: Array<{ icon: string; tone?: 'active' | 'soft' }> = [
  { icon: 'chats', tone: 'active' },
  { icon: 'user-circle-plus', tone: 'soft' },
  { icon: 'chat-circle' },
  { icon: 'mail', tone: 'soft' },
  { icon: 'star' },
  { icon: 'phone' },
  { icon: 'phone-x' },
  { icon: 'clock' },
  { icon: 'calendar' },
  { icon: 'browsers' },
  { icon: 'users', tone: 'active' },
];

/** Thẻ ghim trên khung soạn tin: [chữ, màu, mờ 60%?, có chấm trắng?] */
export type PinTag = [string, string, boolean, boolean];
const B = 'pin-blue', P = 'pin-mauve', I = 'pin-indigo';
export const PIN_TAGS: PinTag[][] = [
  [['Jerome Bell', B, true, false], ['Devon Lane', P, true, false], ['Jacob Jones', 'pin-green', false, true], ['Jane Cooper', 'pin-orange', true, false], ['Annette Black', B, true, false], ['Brooklyn Simmons', B, true, false], ['Devon Lane', P, true, false], ['Thẻ 3', 'pin-salmon', false, true], ['Devon Lane', P, true, false], ['Devon Lane', P, true, false]],
  [['Wade Warren', 'pin-orange', false, true], ['Ronald Richards', I, true, false], ['Kathryn Murphy', B, true, false], ['Theresa Webb', B, true, false], ['Arlene McCoy', 'pin-pink', false, true], ['Jenny Wilson', B, true, false], ['Ronald Richards', I, true, false], ['Savannah Nguyen', 'pin-violet', false, true], ['Ronald Richards', I, true, false], ['Ronald Richards', I, true, false]],
  [['Leslie Alexander', B, true, false], ['Marvin McKinney', B, true, false], ['Darrell Steward', 'pin-sage', true, false], ['Robert Fox', B, false, true], ['Ralph Edwards', 'pin-taupe', false, true], ['Dianne Russell', B, false, true], ['Marvin McKinney', B, true, false], ['Floyd Miles', 'pin-lilac', true, false], ['Marvin McKinney', B, true, false], ['Marvin McKinney', B, true, false]],
];

export const EMOJI_RECENT = ['1f601', '1f923', '1f602'];
export const EMOJI = (
  '1f600 1f603 1f604 1f606 1f605 1f601 1f923 1f602 1f642 1f643 1f609 1f61c 263a-fe0f 1f607 1f970 1f60d ' +
  '1f608 1f60a 1f60e 1f972 1f929 1f618 1f617 1f619 1f61a 1f60b 1f636 1f61b 1f912 1f92c 1f624 1f635-200d-1f4ab ' +
  '1f644 1f928 1f62e 1f9d0 1f637 1f915 1f92d 1f92e 1f616 1f615 1f920 1f622 1f92b 1f634 1f62a 1f641 ' +
  '1f92a 1f910 1f914 1f62b 1f612 1f629 1f61f 1f971 1f974 1f62e-200d-1f4a8 1f636-200d-1f32b-fe0f 1f631 1f913 1f610 ' +
  '1f614 1f623 1f60c 1f621 1f60f 1f927 1f97a 1f61d 1f611 1f628 1f633 1f626 2639-fe0f 1f62c 1f917 1f975 ' +
  '1f62f 1f911 1f620 1f627 1f632 1f630 1f61e 1f978 1f635 1f613 1f924 1f973'
).split(' ');

export const STICKER_TABS = ['clock', 'smiley', 'paw', 'food', 'ball', 'car', 'bulb', 'strategy', 'flag'];
