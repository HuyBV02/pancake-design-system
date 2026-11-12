# Mẫu dựng y hệt Figma — #3066 Sticker Popover (tự sinh từ app mẫu, KHÔNG sửa tay)

Frame `27:27391` (file `8NXSgaDqKxd60cCpuZN2be`, 1440×900). Quy trình: `figma-exact.md`. Asset nằm ở `public/figma-3066/` của app mẫu.

## index.tsx
```tsx
/**
 * #3066 · Sticker Popover — bản dựng Y HỆT Figma (Hội Thoại 3, frame 27:27391, 1440×900).
 * Chế độ "figma-exact": mọi kích thước/màu chép nguyên từ Figma (xem 3066.css).
 * Ảnh/icon = PNG @2x cắt từ bản render Figma (public/figma-3066), emoji = bộ Apple emoji.
 * Không dùng làm mẫu cho code sản phẩm — màn sản phẩm phải dùng @pancake/ui.
 */
import type { PlaygroundPage } from '../../Playground';
import { EMOJI, EMOJI_RECENT, NAV, NAVI, PIN_TAGS, ROWS, STICKER_TABS, type ConvRow } from './data';
import './3066.css';

const A = (n: string) => `/figma-3066/${n}.png`;
const E = (c: string) => `/figma-3066/emoji/${c}.png`;

function Img({ n, s, w, h, className }: { n: string; s?: number; w?: number; h?: number; className?: string }) {
  return <img className={className} src={A(n)} width={w ?? s} height={h ?? s} alt="" draggable={false} />;
}

/* ───────── Header ───────── */
function Header() {
  return (
    <header className="f-header">
      <div className="f-header-left">
        <Img n="logo" w={120} h={30} />
        <nav className="f-nav">
          {NAV.map((t, i) => (
            <span key={t} className={i === 0 ? 'f-nav-item is-active' : 'f-nav-item'}>
              {t}
              {i === 0 && <span className="f-badge f-badge-nav">99+</span>}
            </span>
          ))}
        </nav>
      </div>
      <div className="f-header-right">
        <span className="f-circle">
          <Img n="headset" s={20} />
          <span className="f-dot-green" />
          <span className="f-badge f-badge-headset">99</span>
        </span>
        <span className="f-account">
          <Img n="account" s={32} className="f-account-ava" />
          <span className="f-account-text">
            <span className="f-account-name">Pancake Vietnam</span>
            <span className="f-account-addr">58 Tố Hữu, Trung Văn, Nam Từ Liêm</span>
          </span>
        </span>
        <span className="f-circle">
          <Img n="bell" s={20} />
          <span className="f-dot-red" />
        </span>
      </div>
    </header>
  );
}

/* ───────── Navi ───────── */
function Navi() {
  return (
    <aside className="f-navi">
      {NAVI.map((n) => (
        <span key={n.icon} className={`f-navi-item${n.tone ? ` is-${n.tone}` : ''}`}>
          <Img n={`navi-${n.icon}`} s={24} />
        </span>
      ))}
      <Img n="navi-xcircle" s={22} className="f-navi-x" />
    </aside>
  );
}

/* ───────── Danh sách hội thoại ───────── */
function Row({ r }: { r: ConvRow }) {
  return (
    <div className={`f-row bg-${r.bg}`}>
      <Img n={`${r.id}-bar`} w={4} h={76} className="f-row-bar" />
      <div className="f-row-ava"><Img n={`${r.id}-avatar`} s={50} /></div>
      <div className="f-row-body">
        <div className="f-row-l1">
          <span className="f-row-who">
            <Img n={`${r.id}-platform`} s={16} />
            <Img n={`${r.id}-ava`} s={20} />
            <span className={r.strong ? 'f-row-name is-strong' : 'f-row-name'}>{r.name}</span>
            {r.bookmark && <Img n="bookmark" s={14} className="f-row-bookmark" />}
          </span>
          <span className={`f-row-time tone-${r.timeTone}`}>12.02</span>
        </div>
        <div className="f-row-l2">
          {r.reply && <Img n={`${r.id}-arrow`} s={16} />}
          <span className={r.strong ? 'f-row-preview is-strong' : 'f-row-preview'}>{r.preview}</span>
          {r.icons.length > 0 && (
            <span className="f-row-icons">{r.icons.map((i) => <Img key={i} n={i} s={14} />)}</span>
          )}
        </div>
        <div className="f-row-l3">
          <span className="f-tags">
            <span className="f-tag tag-new">Mới</span>
            {r.tags.map((t, i) => <span key={i} className={`f-tag tag-${t}`}>{t}</span>)}
            {r.more && <span className="f-tag-more">+20</span>}
          </span>
          <span className="f-row-lc">
            <Img n={`${r.id}-lc-phone`} s={16} />
            <Img n={`${r.id}-lc-more`} s={22} />
          </span>
        </div>
      </div>
    </div>
  );
}

function ConvList() {
  return (
    <section className="f-list">
      <div className="f-search">
        <span className="f-search-box">
          <Img n="search" s={20} />
          <span>Tìm kiếm</span>
        </span>
      </div>
      <div className="f-rows">
        {ROWS.map((r) => <Row key={r.id} r={r} />)}
      </div>
      <span className="f-scroll-thumb f-list-thumb" />
    </section>
  );
}

/* ───────── Khung chat ───────── */
function ChatHeader() {
  return (
    <div className="f-chathead">
      <Img n="chat-avatar" s={46} className="f-chathead-ava" />
      <div className="f-chathead-info">
        <div className="f-chathead-l1">
          <span className="f-chathead-name">Đức Duy</span>
          <span className="f-meta"><Img n="mappin" s={12} />Hà Nội, Việt Nam</span>
        </div>
        <div className="f-meta"><Img n="eye" s={12} />Đã xem bởi Sabila Nur Andita Sari - 23:35 Hôm qua</div>
        <div className="f-chathead-l3">
          <Img n="link" s={14} />
          <Img n="history" s={14} />
          <Img n="gender" s={16} />
          <span className="f-bday">Sinh nhật hôm nay<Img n="cake" s={12} /></span>
        </div>
      </div>
      <div className="f-chathead-actions">
        <span className="f-hbtn"><Img n="hb-userplus" s={20} /></span>
        <span className="f-vdiv" />
        <span className="f-hbtns">
          {['emotion', 'appslist', 'mail-unread', 'panel'].map((n) => (
            <span key={n} className="f-hbtn"><Img n={`hb-${n}`} s={20} /></span>
          ))}
        </span>
      </div>
    </div>
  );
}

function MsgTools({ g }: { g: 'g1' | 'g2' }) {
  return (
    <span className="f-msg-tools">
      <Img n={`${g}-reply`} s={16} />
      <Img n={`${g}-forward`} s={16} />
      <Img n={`${g}-dots`} s={16} />
    </span>
  );
}

function MsgMeta({ g }: { g: 'g1' | 'g2' }) {
  return (
    <div className={`f-msg-meta is-${g}`}>
      <span className="f-msg-author">Đức Duy</span>
      <span className="f-msg-time">16:20 • 14/05/2024</span>
      <MsgTools g={g} />
    </div>
  );
}

function Reply({ tone }: { tone: 'green' | 'gray' }) {
  return (
    <div className={`f-reply is-${tone}`}>
      <span className="f-reply-name">Giang Hoàng</span>
      <span className="f-reply-file">aothun.docx</span>
    </div>
  );
}

function Messages() {
  return (
    <div className="f-msgs">
      <div className="f-group-out">
        <MsgMeta g="g1" />
        <div className="f-out-col">
          <div className="f-bubble is-out is-reply">
            <Reply tone="green" />
            <p>Hiện sản phẩm này bên em hết rồi ạ. Anh chị vui lòng chọn sản phẩm khác tương tự ạ.</p>
          </div>
          <div className="f-bubble is-out is-plain">
            <p>Kami ada diskon sesuai durasi waktu paket langganan yang kakak pilih ya. Semua sudah ada hitungannya sendiri, bedanya kalau yang 12 bulan dapatnya langsung 20% yaa kak</p>
          </div>
        </div>
      </div>
      <div className="f-group-in">
        <Img n="msg-avatar" s={32} className="f-msg-ava" />
        <div className="f-in-col">
          <div className="f-bubble is-in is-plain is-short"><p>Lorem ipsum dolor sit amet consectetur.</p></div>
          <div className="f-in-row">
            <div className="f-bubble is-in is-reply">
              <Reply tone="gray" />
              <p>Hiện sản phẩm này bên em hết rồi ạ. Anh chị vui lòng chọn sản phẩm khác tương tự ạ.</p>
            </div>
            <MsgMeta g="g2" />
          </div>
        </div>
      </div>
      <span className="f-scroll-thumb f-msgs-thumb" />
    </div>
  );
}

function Composer() {
  return (
    <div className="f-composer">
      <div className="f-pins">
        {PIN_TAGS.map((row, i) => (
          <div key={i} className="f-pins-row">
            {row.map(([t, c, faded, dot], j) => (
              <span key={j} className={`f-pin ${c}${faded ? ' is-faded' : ''}`}>
                {dot && <span className="f-pin-dot" />}
                <span className="f-pin-text">{t}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="f-chatbox">
        <div className="f-chatbox-input">
          <Img n="airbnb" s={24} />
          <span>Nhập tin nhắn...</span>
        </div>
        <div className="f-chatbox-bar">
          <Img n="question" s={20} />
          <span className="f-chatbox-tools">
            <Img n="tb-bag" s={24} />
            <span className="f-tool-active"><Img n="tb-sticker" s={24} /></span>
            <Img n="tb-paperclip" s={24} />
            <Img n="tb-images-x" s={32} className="f-tool-imgx" />
            <Img n="tb-chattext" s={24} />
            <Img n="tb-send" s={24} />
          </span>
        </div>
      </div>
    </div>
  );
}

function Chat() {
  return (
    <section className="f-chat">
      <ChatHeader />
      <Messages />
      <Composer />
    </section>
  );
}

/* ───────── Panel thông tin ───────── */
function Note({ ava, text, imgs }: { ava: string; text: React.ReactNode; imgs?: boolean }) {
  return (
    <div className="f-note">
      <div className="f-note-head">
        <span className="f-note-who"><Img n={ava} s={20} />Savannah Nguyen</span>
        <span className="f-note-date">19/10/2021</span>
      </div>
      <div className="f-note-text">{text}</div>
      {imgs && (
        <div className="f-note-imgs">
          {[1, 2, 3].map((i) => <Img key={i} n={`note-img${i}`} s={24} />)}
        </div>
      )}
    </div>
  );
}

function Info() {
  return (
    <aside className="f-info">
      <div className="f-tabs">
        <span className="f-tab is-active">Thông tin</span>
        <span className="f-tab">Tạo đơn</span>
      </div>
      <div className="f-info-body">
        <div className="f-notes">
          <Note ava="note-ava" text={<>Still doing this man <img src={E('1f4a3')} width={14} height={14} alt="" className="f-inline-emoji" /></>} />
          <Note ava="note-ava2" imgs text={<>Flipping the cassette while reading/examining the fold-out cover <img src={E('1f601')} width={14} height={14} alt="" className="f-inline-emoji" /></>} />
        </div>
        <div className="f-note-input-wrap">
          <div className="f-note-input">
            <span>Nhập ghi chú (Enter để gửi)</span>
            <span className="f-note-input-icons">
              <Img n="note-images" s={20} />
              <Img n="note-notches" s={18} />
            </span>
          </div>
        </div>
        <div className="f-divider"><span>Tra cứu cảnh báo</span></div>
        <div className="f-cards">
          <div className="f-card">
            <div className="f-card-head">Nguyễn Hồng Anh</div>
            <div className="f-card-body">
              <div className="f-card-row"><Img n="i-history" s={16} /><span><b>Tạo lúc:</b> 15:17 - 18/10/2021</span></div>
              <div className="f-card-row"><Img n="i-call" s={16} /><span className="f-card-phone"><b>Cảnh báo SĐT:</b><span className="f-chip">0987654321</span></span></div>
              <div className="f-card-row"><Img n="i-bars" s={16} /><span><b>Lý do:</b>&nbsp; Thực chất Lorem Ipsum không phải là dòng chữ vô nghĩa được tạo ra một cách ngẫu nhiên.</span></div>
            </div>
          </div>
          <div className="f-card">
            <div className="f-card-head">Bùi Văn Long</div>
            <div className="f-card-body">
              <div className="f-card-row"><Img n="i-call" s={16} /><span className="f-card-phone"><b>Cảnh báo SĐT:</b><span className="f-chip is-copy">0987654321<Img n="i-copy" s={14} /></span></span></div>
              <div className="f-card-row"><Img n="i-history" s={16} /><span><b>Tạo lúc:</b> 15:17 - 18/10/2021</span></div>
              <div className="f-card-row">
                <Img n="i-bars" s={16} />
                <div className="f-card-reason">
                  <span><b>Lý do:</b> Thực chất Lorem Ipsum không phải là dòng chữ vô nghĩa được tạo ra một cách ngẫu nhiên, mà theo những nghiên cứu gần đây, người ta tin rằng nó được bắt nguồn từ một bài văn cổ đại, có niên đại khoảng 45 năm trước công nguyên.</span>
                  <span className="f-card-photos">{[1, 2, 3].map((i) => <Img key={i} n={`i-photo${i}`} s={60} />)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="f-info-foot"><span className="f-back"><Img n="i-back" s={18} /></span></div>
    </aside>
  );
}

/* ───────── Popover Sticker & Emoji ───────── */
function StickerPopover() {
  return (
    <div className="f-pop">
      <div className="f-pop-card">
        <div className="f-pop-head">
          <div className="f-pop-title">
            <span>Sticker &amp; Emoji</span>
            <span className="f-seg">
              <span className="f-seg-item">Sticker</span>
              <span className="f-seg-item is-on">Emoji</span>
            </span>
          </div>
          <div className="f-pop-search"><Img n="st-search" s={20} /><span>Tìm kiếm </span></div>
        </div>
        <div className="f-pop-scroll">
          <div className="f-pop-label">Đã dùng gần đây</div>
          <div className="f-emoji-grid">
            {EMOJI_RECENT.map((c, i) => (
              <span key={c} className={i === 0 ? 'f-emoji is-on' : 'f-emoji'}><img src={E(c)} alt="" /></span>
            ))}
          </div>
          <div className="f-pop-label">Mặt cười và hình người</div>
          <div className="f-emoji-grid">
            {EMOJI.map((c) => <span key={c} className="f-emoji"><img src={E(c)} alt="" /></span>)}
          </div>
        </div>
        <span className="f-scroll-thumb f-pop-thumb" />
        <div className="f-pop-tabs">
          {STICKER_TABS.map((t) => (
            <span key={t} className={`f-pop-tab${t === 'clock' ? ' is-on' : ''}${t === 'food' ? ' is-hover' : ''}`}>
              <Img n={`st-${t}`} s={24} />
            </span>
          ))}
        </div>
      </div>
      <Img n="st-arrow" w={16} h={8} className="f-pop-arrow" />
    </div>
  );
}

function Screen() {
  return (
    <div className="f3066">
      <Header />
      <div className="f-main">
        <Navi />
        <ConvList />
        <Chat />
        <Info />
      </div>
      <StickerPopover />
    </div>
  );
}

export const StickerPopoverPlayground: PlaygroundPage = {
  slug: '3066-sticker-popover',
  issue: '3066',
  title: 'Hội thoại · Sticker & Emoji popover (y hệt Figma)',
  states: { 'Mở popover Emoji': Screen },
};
```

## data.ts
```ts
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
```

## 3066.css
```css
/*
 * #3066 — chế độ FIGMA-EXACT. Toàn bộ số đo/màu chép nguyên từ Figma frame 27:27391.
 * Màu trùng DS_AI dùng biến --pk-*; màu NGOÀI DS khai báo trong khối --x-* bên dưới
 * (danh sách cho Designer quyết định: đưa vào DS hay sửa về token gần nhất).
 * Thư mục playground/figma-exact được ESLint/Stylelint/hook bỏ qua có chủ đích — chỉ để preview, không phải code sản phẩm.
 */
.f3066 {
  /* ── Giá trị ngoài DS_AI (đang có trong Figma) ── */
  --x-time-teal: #4a646c;
  --x-tag-cyan: #57c6b3;
  --x-tag-magenta: #da5c9d;
  --x-tag-green: #00a02d;
  --x-scroll-thumb: #c7c7d2;
  --x-tab-line: #d9dbea;
  --x-tab-muted: #8f90a6;
  --x-reply-green-bg: #cdf0c2;
  --x-reply-green-bar: #5ecc9f;
  --x-navi-soft: rgb(52 64 84 / 80%);
  --x-text-85: rgb(0 0 0 / 85%);
  --x-pin-blue: #2697ec;
  --x-pin-mauve: #b591bf;
  --x-pin-salmon: #e79991;
  --x-pin-indigo: #99a8e4;
  --x-pin-pink: #dd9be5;
  --x-pin-violet: #6d1e98;
  --x-pin-sage: #a2bb92;
  --x-pin-taupe: #a29489;
  --x-pin-lilac: #c19ed5;

  position: relative;
  width: 1440px;
  height: 900px;
  overflow: hidden;
  font-family: var(--pk-font-family-sans);
  color: var(--pk-gray-900);
  background: var(--pk-gray-0);
  -webkit-font-smoothing: antialiased;
}
.f3066 * { box-sizing: border-box; }
.f3066 img { display: block; flex: none; }
.f3066 p { margin: 0; }
.f3066 b { font-weight: 500; }

/* ───────── Header ───────── */
.f-header {
  height: 56px; background: var(--pk-gray-800);
  padding: 0 112px; display: flex; align-items: center; justify-content: space-between;
}
.f-header-left { display: flex; align-items: center; gap: 48px; }
.f-nav { display: flex; gap: 8px; }
.f-nav-item {
  position: relative; width: 84px; height: 38px; padding: 8px 0; border-radius: 8px; text-align: center;
  font-size: 14px; line-height: 22px; color: var(--pk-gray-300); white-space: nowrap;
}
.f-nav-item.is-active { background: var(--pk-gray-700); color: var(--pk-gray-0); }
.f-badge {
  position: absolute; height: 16px; padding: 0 4px; border-radius: 16px;
  background: var(--pk-red-500); color: var(--pk-gray-0); font-size: 12px; line-height: 16px;
}
.f-badge-nav { right: -6px; top: -4px; }
.f-header-right { display: flex; align-items: center; gap: 8px; padding: 8px 0; }
.f-circle {
  position: relative; width: 40px; height: 40px; border-radius: 40px; background: var(--pk-gray-700);
  display: flex; align-items: center; justify-content: center;
}
.f-dot-green { position: absolute; width: 6px; height: 6px; border-radius: 6px; background: var(--pk-green-500); right: 10px; top: 8px; }
.f-dot-red { position: absolute; width: 6px; height: 6px; border-radius: 6px; background: var(--pk-red-500); right: 10px; top: 9px; }
.f-badge-headset { right: 29px; top: 0; }
.f-account { display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 12px; }
.f-account-ava { border-radius: 50%; }
.f-account-text { display: flex; flex-direction: column; width: 125px; }
.f-account-name { font-size: 14px; line-height: 22px; color: var(--pk-gray-300); }
.f-account-addr { font-size: 12px; line-height: 20px; color: var(--pk-gray-300); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ───────── Main ───────── */
.f-main { display: flex; height: 844px; }

/* Navi */
.f-navi {
  position: relative; width: 52px; flex: none; background: var(--pk-gray-800);
  display: flex; flex-direction: column; gap: 12px; padding: 8px 6px;
}
.f-navi-item { padding: 8px; border-radius: 8px; }
.f-navi-item.is-active { background: var(--pk-gray-600); }
.f-navi-item.is-soft { background: var(--x-navi-soft); }
.f-navi-x { position: absolute; left: 30px; top: 520px; }

/* List */
.f-list { position: relative; width: 400px; flex: none; background: var(--pk-gray-0); overflow: hidden; }
.f-search { height: 48px; padding: 8px; }
.f-search-box {
  display: flex; align-items: center; gap: 8px; width: 384px; height: 32px; padding: 5px 8px;
  border-radius: 6px; background: var(--pk-gray-200); color: var(--pk-gray-500); font-size: 14px; line-height: 22px;
}
.f-rows { height: 796px; overflow: hidden; }
.f-row { position: relative; display: flex; height: 88px; }
.f-row.bg-gray { background: var(--pk-gray-250); }
.f-row.bg-gray-dark { background: var(--pk-gray-300); }
.f-row.bg-blue { background: var(--pk-blue-100); }
.f-row.bg-white { background: var(--pk-gray-0); }
.f-row-bar { position: absolute; left: 3px; top: 6px; }
.f-row-ava { padding: 0 12px; display: flex; align-items: center; }
.f-row-body {
  flex: 1; min-width: 0; height: 88px; padding: 10px 16px 10px 0; display: flex; flex-direction: column; gap: 4px;
  border-bottom: 1px solid var(--pk-gray-200); margin-right: 16px; padding-right: 0;
}
.bg-gray .f-row-body, .bg-gray-dark .f-row-body { border-bottom-color: var(--pk-gray-300); }
.f-row-l1 { display: flex; align-items: center; justify-content: space-between; height: 22px; }
.f-row-who { display: flex; align-items: center; gap: 6px; min-width: 0; }
.f-row-name { font-size: 14px; line-height: 22px; color: var(--pk-gray-700); white-space: nowrap; }
.f-row-name.is-strong { font-weight: 500; }
.f-row-bookmark { margin-left: -2px; }
.f-row-time { font-size: 12px; line-height: 16px; }
.f-row-time.tone-teal { color: var(--x-time-teal); }
.f-row-time.tone-gray { color: var(--pk-gray-600); }
.f-row-l2 { display: flex; align-items: center; gap: 8px; height: 16px; }
.f-row-preview { flex: 1; min-width: 0; font-size: 13px; line-height: 16px; color: var(--pk-gray-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.f-row-preview.is-strong { font-weight: 500; }
.f-row-icons { display: flex; gap: 6px; }
.f-row-l3 { display: flex; align-items: center; justify-content: space-between; height: 22px; gap: 12px; }
.f-tags { display: flex; align-items: center; gap: 4px; }
.f-tag {
  height: 16px; padding: 1px 6px; border-radius: 8px; font-size: 10px; line-height: 14px; font-weight: 500;
  color: var(--pk-gray-0); filter: drop-shadow(0 1px 0 var(--pk-gray-300));
}
.tag-new { background: var(--pk-teal-50); border: 1px solid var(--pk-teal-800); color: var(--pk-teal-800); line-height: 12px; padding: 1px 5px; }
.tag-blue { background: var(--pk-sky-600); }
.tag-gold { background: var(--pk-gold-600); }
.tag-cyan { background: var(--x-tag-cyan); }
.tag-purple { background: var(--pk-purple-500); }
.tag-orange { background: var(--pk-orange-500); }
.tag-lime { background: var(--pk-lime-700); }
.tag-geekblue { background: var(--pk-geekblue-500); }
.tag-magenta { background: var(--x-tag-magenta); }
.tag-volcano { background: var(--pk-volcano-500); }
.tag-green { background: var(--x-tag-green); }
.f-tag-more { height: 16px; padding: 0 4px; border-radius: 8px; background: var(--pk-sky-100); color: var(--pk-blue-600); font-size: 10px; line-height: 16px; font-weight: 500; }
.f-row-lc { display: flex; align-items: center; gap: 4px; }

.f-scroll-thumb { position: absolute; width: 8px; border-radius: 8px; background: var(--x-scroll-thumb); }
.f-list-thumb { left: 388px; top: 48px; height: 614px; }

/* ───────── Chat ───────── */
.f-chat { position: relative; width: 615px; flex: none; background: var(--pk-beige-200); display: flex; flex-direction: column; }
.f-chathead {
  height: 68px; flex: none; background: var(--pk-gray-0); border-bottom: 1px solid var(--pk-gray-250);
  display: flex; align-items: flex-start; gap: 12px; padding: 4px 12px 6px;
}
.f-chathead-ava { margin-top: 7px; width: 46px; height: 46px; }
.f-chathead-info { flex: 1; display: flex; flex-direction: column; }
.f-chathead-l1 { display: flex; align-items: center; gap: 8px; }
.f-chathead-name { font-size: 14px; line-height: 22px; font-weight: 500; color: var(--pk-gray-700); }
.f-meta { display: flex; align-items: center; gap: 4px; font-size: 11px; line-height: 16px; color: var(--pk-gray-500); }
.f-chathead-l3 { display: flex; align-items: center; gap: 4px; height: 20px; }
.f-bday {
  display: flex; align-items: center; gap: 4px; padding: 0 4px; border-radius: 4px; background: var(--pk-purple-100);
  color: var(--pk-purple-600); font-size: 12px; line-height: 16px; font-weight: 500;
}
.f-chathead-actions { display: flex; align-items: center; gap: 8px; align-self: flex-end; height: 28px; margin-bottom: 0; }
.f-hbtns { display: flex; gap: 4px; }
.f-hbtn { width: 28px; height: 28px; padding: 4px; border-radius: 6px; background: var(--pk-gray-200); }
.f-vdiv { width: 1px; height: 18px; background: var(--pk-gray-300); }

.f-msgs {
  position: relative; flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: flex-end; gap: 12px;
  padding: 16px 24px 16px 8px; overflow: hidden;
}
.f-msgs-thumb { right: 4px; top: 4px; height: 604px; }
.f-group-out { display: flex; justify-content: flex-end; align-items: center; gap: 4px; }
.f-out-col { display: flex; flex-direction: column; gap: 4px; }
.f-msg-meta { display: flex; flex-direction: column; align-items: flex-end; width: 96px; font-size: 11px; line-height: 16px; color: var(--pk-gray-500); }
.f-msg-meta.is-g2 { align-items: flex-start; align-self: flex-end; }
.f-msg-author { font-weight: 600; }
.f-msg-tools {
  display: flex; margin-top: 4px; padding: 1px 2px; border-radius: 8px;
  background: rgb(255 255 255 / 30%); backdrop-filter: blur(30px);
}
.f-msg-tools img { padding: 2px; box-sizing: content-box; }
.f-bubble {
  width: 440px; border-radius: 12px; box-shadow: 1px 1px 1px rgb(0 0 0 / 10%);
  font-size: 14px; line-height: 22px; color: var(--pk-gray-1000, #000);
}
.f-bubble.is-out { background: var(--pk-green-150); }
.f-bubble.is-in { background: var(--pk-gray-0); }
.f-bubble.is-reply { display: flex; flex-direction: column; gap: 4px; padding: 6px 8px 8px; }
.f-bubble.is-reply p { padding: 0 4px; }
.f-bubble.is-plain { padding: 6px 12px; }
.f-bubble.is-short { width: auto; align-self: flex-start; }
.f-reply { display: flex; flex-direction: column; padding: 6px 12px; border-radius: 8px; font-size: 14px; line-height: 22px; }
.f-reply.is-green { background: var(--x-reply-green-bg); box-shadow: inset 4px 0 0 var(--x-reply-green-bar); }
.f-reply.is-gray { background: var(--pk-gray-200); box-shadow: inset 4px 0 0 var(--pk-blue-400); }
.f-reply-name { font-weight: 500; color: var(--pk-gray-900); }
.f-reply-file { color: var(--pk-gray-500); }
.f-group-in { display: flex; align-items: flex-end; gap: 8px; }
.f-in-col { display: flex; flex-direction: column; gap: 4px; }
.f-in-row { display: flex; align-items: flex-end; gap: 4px; }

.f-composer { flex: none; background: var(--pk-gray-0); filter: drop-shadow(0 -3px 2px rgb(0 0 0 / 12%)); }
.f-pins { display: flex; flex-direction: column; gap: 1px; padding: 2px; background: var(--pk-gray-0); }
.f-pins-row { display: flex; gap: 1px; }
.f-pin {
  position: relative; flex: 1; min-width: 0; height: 20px; padding: 0 8px; border-radius: 2px;
  color: var(--pk-gray-0); font-size: 10px; line-height: 20px; text-align: center;
}
.f-pin.is-faded { opacity: 0.6; }
.f-pin-text { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.f-pin-dot { position: absolute; left: 3px; top: 3px; width: 4px; height: 4px; border-radius: 4px; background: var(--pk-gray-0); }
.pin-blue { background: var(--x-pin-blue); }
.pin-mauve { background: var(--x-pin-mauve); }
.pin-green { background: var(--pk-green-600); }
.pin-orange { background: var(--pk-orange-600); }
.pin-salmon { background: var(--x-pin-salmon); }
.pin-indigo { background: var(--x-pin-indigo); }
.pin-pink { background: var(--x-pin-pink); }
.pin-violet { background: var(--x-pin-violet); }
.pin-sage { background: var(--x-pin-sage); }
.pin-taupe { background: var(--x-pin-taupe); }
.pin-lilac { background: var(--x-pin-lilac); }
.f-chatbox { height: 98px; padding: 12px 8px 8px; display: flex; flex-direction: column; justify-content: space-between; }
.f-chatbox-input { display: flex; align-items: center; gap: 8px; font-size: 14px; line-height: 22px; color: var(--pk-gray-500); }
.f-chatbox-bar { display: flex; align-items: center; justify-content: space-between; }
.f-chatbox-tools { display: flex; align-items: center; gap: 4px; }
.f-tool-active { padding: 2px; border-radius: 6px; background: var(--pk-gray-200); }
.f-tool-imgx { margin: -8px -4px 0 0; }

/* ───────── Info ───────── */
.f-info {
  width: 373px; flex: none; display: flex; flex-direction: column; background: var(--pk-gray-0);
  border-left: 1px solid var(--pk-gray-300);
}
.f-tabs { display: flex; height: 48px; flex: none; }
.f-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; font-size: 16px; line-height: 24px;
  color: var(--x-tab-muted); box-shadow: inset 0 -2px 0 var(--x-tab-line);
}
.f-tab.is-active { color: var(--pk-blue-700); font-weight: 600; box-shadow: inset 0 -2px 0 var(--pk-blue-700); }
.f-info-body { flex: 1; min-height: 0; overflow: hidden; }
.f-notes { display: flex; flex-direction: column; gap: 16px; padding: 10px; }
.f-note { display: flex; flex-direction: column; gap: 4px; }
.f-note-head { display: flex; justify-content: space-between; align-items: center; }
.f-note-who { display: flex; align-items: center; gap: 8px; font-size: 13px; line-height: 20px; font-weight: 500; color: var(--pk-gray-800); }
.f-note-date { font-size: 13px; line-height: 20px; color: var(--pk-gray-400); }
.f-note-text { padding-left: 28px; font-size: 12px; line-height: 16px; color: var(--pk-gray-800); }
.f-inline-emoji { display: inline-block !important; vertical-align: -2px; }
.f-note-imgs { display: flex; gap: 4px; padding: 4px 0 0 28px; }
.f-note-imgs img { border-radius: 3px; }
.f-note-input-wrap { padding: 4px 10px; }
.f-note-input {
  position: relative; height: 56px; padding: 4px 4px 4px 8px; border-radius: 8px; background: var(--pk-gray-200);
  font-size: 13px; line-height: 20px; color: var(--pk-gray-500);
}
.f-note-input-icons { position: absolute; right: 6px; top: 6px; bottom: 6px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; }
.f-divider { display: flex; align-items: center; gap: 16px; padding: 0 10px; font-size: 14px; line-height: 22px; font-weight: 500; color: var(--x-text-85); white-space: nowrap; }
.f-divider::before, .f-divider::after { content: ''; flex: 1; height: 1px; background: var(--pk-gray-250); }
.f-cards { display: flex; flex-direction: column; gap: 12px; padding: 4px 10px; }
.f-card { border: 1px solid var(--pk-orange-650); border-radius: 4px; overflow: hidden; }
.f-card-head { background: var(--pk-orange-650); padding: 5px 12px; font-size: 14px; line-height: 22px; font-weight: 500; color: var(--pk-gray-0); }
.f-card-body { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
.f-card-row { display: flex; gap: 8px; align-items: flex-start; font-size: 14px; line-height: 22px; color: var(--pk-gray-900); }
.f-card-row > img { margin-top: 3px; }
.f-card-phone { display: flex; align-items: center; gap: 8px; }
.f-chip { display: inline-flex; align-items: center; gap: 8px; padding: 1px 8px; border-radius: 6px; background: var(--pk-gray-100); }
.f-chip.is-copy { background: var(--pk-gray-200); }
.f-card-reason { display: flex; flex-direction: column; gap: 8px; }
.f-card-photos { display: flex; gap: 8px; }
.f-card-photos img { border-radius: 8px; }
.f-info-foot { height: 40px; flex: none; padding: 8px; background: var(--pk-gray-0); }
.f-back { display: inline-flex; padding: 3px; border-radius: 6px; background: var(--pk-gray-200); }

/* ───────── Sticker popover ───────── */
.f-pop { position: absolute; left: 713px; top: 320px; width: 408px; height: 532px; filter: drop-shadow(0 8px 9px rgb(24 39 75 / 12%)) drop-shadow(0 12px 21px rgb(24 39 75 / 12%)); }
.f-pop-card { position: relative; width: 408px; height: 524px; border-radius: 12px; background: var(--pk-gray-0); overflow: hidden; display: flex; flex-direction: column; }
.f-pop-head { display: flex; flex-direction: column; gap: 12px; padding: 12px; flex: none; }
.f-pop-title { display: flex; align-items: center; justify-content: space-between; font-size: 16px; line-height: 24px; font-weight: 500; color: var(--pk-gray-800); }
.f-seg { display: flex; width: 156px; padding: 2px; border-radius: 8px; background: var(--pk-gray-200); }
.f-seg-item { flex: 1; text-align: center; padding: 4px 0; border-radius: 6px; font-size: 14px; line-height: 20px; font-weight: 400; color: var(--pk-gray-900); }
.f-seg-item.is-on { background: var(--pk-gray-0); box-shadow: 0 2px 8px rgb(0 0 0 / 5%); }
.f-pop-search { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 6px; background: var(--pk-gray-200); font-size: 14px; line-height: 22px; color: var(--pk-gray-500); font-weight: 400; }
.f-pop-scroll { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; gap: 12px; padding: 0 12px; }
.f-pop-label { font-size: 14px; line-height: 22px; font-weight: 500; color: var(--pk-gray-500); }
.f-emoji-grid { display: grid; grid-template-columns: repeat(8, 36.5px); gap: 12px; width: 376px; }
.f-emoji { width: 36.5px; height: 36.5px; padding: 4px; border-radius: 8px; }
.f-emoji img { width: 100%; height: 100%; }
.f-emoji.is-on { background: var(--pk-gray-200); }
.f-pop-thumb { right: 8px; top: 88px; height: 104px; }
.f-pop-tabs {
  flex: none; display: flex; justify-content: space-between; padding: 8px 12px 0; background: var(--pk-gray-0);
  filter: drop-shadow(0 1px 8px rgb(0 0 0 / 8%));
}
.f-pop-tab { position: relative; padding: 4px; border-radius: 6px; margin-bottom: 8px; }
.f-pop-tab.is-hover { background: var(--pk-gray-200); }
.f-pop-tab.is-on::after { content: ''; position: absolute; left: -2px; right: -2px; bottom: -8px; height: 2px; border-radius: 16px; background: var(--pk-blue-600); }
.f-pop-arrow { position: absolute; left: 196px; bottom: 0; }
```
