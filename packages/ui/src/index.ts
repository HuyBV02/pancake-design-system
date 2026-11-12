/**
 * @pancake/ui — thư viện component Pancake Web (DS_AI v1.3).
 *
 * Quy tắc dùng:
 * 1. Bọc app bằng <PancakeProvider> và import '@pancake/ui/styles.css' một lần.
 * 2. Chỉ import component từ '@pancake/ui' — không import trực tiếp từ 'antd' trong code màn hình.
 * 3. Màu / khoảng cách / bo góc / chữ: dùng token (`cssVar`, `tokens`, class Tailwind sinh từ token). Không gõ mã hex hay px tự đặt.
 */
import './styles/index.css';

export { PancakeProvider } from './PancakeProvider';
export type { PancakeProviderProps } from './PancakeProvider';
export { antdTheme } from './theme/antdTheme';
export { tokens, cssVar, byFigmaName } from '@pancake/tokens';

// Component có API riêng theo DS
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';
export { Tag } from './components/Tag';
export type { TagProps, TagColor } from './components/Tag';
export { Badge } from './components/Badge';
export type { BadgeProps, BadgeTone } from './components/Badge';
export { Alert } from './components/Alert';
export type { AlertProps, AlertType } from './components/Alert';
export { Kbd, Shortcut } from './components/Kbd';
export type { KbdProps, ShortcutProps } from './components/Kbd';
export { Text } from './components/Text';
export type { TextProps, TextVariant, TextTone } from './components/Text';
export { Icon } from './components/Icon';
export type { IconProps, IconSize, IconTone } from './components/Icon';
export { Switch, Segmented, Modal, MODAL_WIDTH, Empty } from './components/Controls';
export type { SwitchProps, SegmentedProps, ModalProps } from './components/Controls';

// Component antd dùng nguyên API — đã nhận theme Pancake qua PancakeProvider
export {
  App,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Select,
  Skeleton,
  Space,
  Spin,
  Table,
  Tabs,
  TimePicker,
  Tooltip,
  Tour,
} from 'antd';
export type {
  CheckboxProps,
  DatePickerProps,
  DropdownProps,
  FormProps,
  InputProps,
  InputNumberProps,
  MenuProps,
  PopconfirmProps,
  PopoverProps,
  ProgressProps,
  RadioProps,
  SelectProps,
  TableProps,
  TabsProps,
  TooltipProps,
  TourProps,
} from 'antd';
