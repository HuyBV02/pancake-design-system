import { AppShell } from '../recipes/AppShell';
import { SettingsTablePage, type TagRow } from '../recipes/SettingsTablePage';
import type { PlaygroundPage } from './Playground';

const DATA: TagRow[] = [
  { key: '1', name: 'Khách VIP', color: 'gold', count: 128, auto: true },
  { key: '2', name: 'Đã chốt đơn', color: 'green', count: 2045, auto: true },
  { key: '3', name: 'Cần gọi lại', color: 'volcano', count: 37, auto: false },
  { key: '4', name: 'Hỏi giá', color: 'blue', count: 512, auto: true },
  { key: '5', name: 'Khiếu nại', color: 'red', count: 9, auto: false },
];

export const TheHoiThoaiPlayground: PlaygroundPage = {
  slug: 'the-hoi-thoai',
  title: 'Cài đặt · Thẻ hội thoại (recipe)',
  states: {
    'Có dữ liệu': () => <AppShell><SettingsTablePage initial={DATA} /></AppShell>,
    'Trống': () => <AppShell><SettingsTablePage initial={[]} /></AppShell>,
    'Đang tải': () => <AppShell><SettingsTablePage initial={[]} state="loading" /></AppShell>,
    'Lỗi': () => <AppShell><SettingsTablePage initial={[]} state="error" /></AppShell>,
  },
};
