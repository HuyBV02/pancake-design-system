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
