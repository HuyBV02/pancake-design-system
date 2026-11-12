/** Tự sinh từ @pancake/tokens — KHÔNG sửa tay. */
export type PancakeTokens = {
  button: {
    tertiaryNegative: {
      text: {
        rest: string;
        hover: string;
        pressed: string;
      };
      icon: {
        rest: string;
        hover: string;
        pressed: string;
      };
    };
  };
  input: {
    icon: {
      error: string;
      errorSubtle: string;
    };
    text: {
      error: string;
    };
  };
  checkbox: {
    text: {
      disabled: string;
    };
  };
  tabs: {
    icon: {
      divider: string;
    };
    border: {
      divider: string;
    };
  };
  dropdown: {
    text: {
      danger: string;
    };
    icon: {
      scrollbar: string;
    };
  };
  tag: {
    magenta: {
      text800: string;
      icon600: string;
      border400: string;
      icon500: string;
    };
    red: {
      icon600: string;
      text600: string;
    };
    volcano: {
      icon700: string;
      icon600: string;
      text600: string;
    };
    orange: {
      icon700: string;
      icon600: string;
    };
    gold: {
      icon800: string;
      text800: string;
      icon600: string;
    };
    lime: {
      icon800: string;
      text800: string;
      icon700: string;
      bg700: string;
    };
    cyan: {
      icon700: string;
      bg700: string;
    };
    geekblue: {
      text600: string;
      icon600: string;
      bg500: string;
    };
    purple: {
      text600: string;
      icon500: string;
      icon600: string;
      bg500: string;
    };
    green: {
      text600: string;
    };
    new: {
      bg: string;
      text: string;
      border: string;
    };
  };
  badge: {
    pink: {
      bg: string;
    };
    yellow: {
      bg: string;
    };
    ribbon: {
      border: string;
    };
  };
  notification: {
    success: {
      text: string;
    };
    infoNotes: {
      bg: string;
    };
    error: {
      text: string;
    };
  };
  message: {
    error: {
      icon: string;
    };
    warning: {
      icon: string;
    };
  };
  modalConfirm: {
    warning: {
      icon: string;
    };
    danger: {
      icon: string;
    };
  };
  popover: {
    icon: {
      subtle: string;
    };
    border: {
      divider: string;
    };
    bg: {
      placeholder: string;
    };
  };
  tooltip: {
    dark: {
      text: string;
      textSubtle: string;
      icon: string;
      keystrokeBg: string;
    };
  };
  tour: {
    dark: {
      text: string;
      bgSubtle: string;
    };
  };
  table: {
    row: {
      iconDanger: string;
      accentBg: string;
      tagIcon: string;
    };
    header: {
      divider: string;
    };
  };
  spinner: {
    track: string;
    indicator: string;
  };
  chat: {
    bg: string;
    bubbleOutgoing: string;
    bubbleIncoming: string;
  };
  alert: {
    warningStrong: string;
  };
  space: {
    "0": string;
    "100": string;
    "125": string;
    "150": string;
    "200": string;
    "250": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "800": string;
    "025": string;
    "050": string;
    "075": string;
  };
  radius: {
    none: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    xl: string;
    xxl: string;
    "3xl": string;
    rounded: string;
  };
  size: {
    control: {
      sm: string;
      md: string;
      lg: string;
    };
    icon: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    checkbox: {
      md: string;
      lg: string;
    };
    switch: {
      width: string;
      height: string;
    };
    badge: {
      sm: string;
      md: string;
    };
    dot: string;
    tag: string;
    menuItem: string;
    table: {
      header: string;
      row: string;
    };
    tabs: {
      sm: string;
      md: string;
      lg: string;
    };
    segmented: {
      sm: string;
      md: string;
      lg: string;
    };
    sidebarIcon: string;
    dropdown: {
      width: string;
    };
    tooltip: {
      max: string;
    };
    popover: {
      width: string;
    };
    modal: {
      confirm: string;
      md: string;
    };
    drawer: {
      md: string;
    };
    kbd: {
      sm: string;
      md: string;
    };
  };
  borderWidth: {
    default: string;
    indicator: string;
    accent: string;
  };
  font: {
    weight: {
      regular: string;
      medium: string;
      bold: string;
    };
    heading: {
      "2xl": {
        size: string;
        lineHeight: string;
      };
      xl: {
        size: string;
        lineHeight: string;
      };
      lg: {
        size: string;
        lineHeight: string;
      };
      md: {
        size: string;
        lineHeight: string;
      };
      sm: {
        size: string;
        lineHeight: string;
      };
      xs: {
        size: string;
        lineHeight: string;
      };
    };
    body: {
      md: {
        size: string;
        lineHeight: string;
      };
      sm: {
        size: string;
        lineHeight: string;
      };
    };
    code: {
      md: {
        size: string;
        lineHeight: string;
      };
      sm: {
        size: string;
        lineHeight: string;
      };
    };
    dense: {
      md: {
        size: string;
        lineHeight: string;
      };
      sm: {
        size: string;
        lineHeight: string;
      };
      xs: {
        size: string;
        lineHeight: string;
      };
    };
    family: {
      sans: string;
      mono: string;
    };
  };
  elevation: {
    raised: string;
    overlay: string;
    selected: string;
    buttonPrimary: string;
    buttonDefault: string;
  };
  focus: {
    brand: string;
    danger: string;
    neutral: string;
    control: string;
  };
  blur: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  gray: {
    "0": string;
    "50": string;
    "100": string;
    "150": string;
    "200": string;
    "250": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "1000": string;
  };
  blue: {
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  crimson: {
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "500": string;
    "600": string;
  };
  slate: {
    "400": string;
  };
  beige: {
    "100": string;
    "200": string;
  };
  teal: {
    "50": string;
    "800": string;
  };
  red: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  volcano: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  orange: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "650": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  gold: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  yellow: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  lime: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  green: {
    "100": string;
    "150": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  cyan: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  sky: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  geekblue: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  purple: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  magenta: {
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "950": string;
  };
  text: {
    default: string;
    strong: string;
    control: string;
    subtle: string;
    subtlest: string;
    placeholder: string;
    disabled: string;
    inverse: string;
    brand: {
      rest: string;
      hover: string;
      pressed: string;
    };
    selected: string;
    danger: string;
    success: string;
    warning: string;
    info: string;
  };
  icon: {
    default: string;
    subtle: string;
    subtlest: string;
    disabled: string;
    inverse: string;
    brand: string;
    info: string;
    success: string;
    warning: string;
    danger: string;
  };
  surface: {
    default: string;
    subtle: string;
    sunken: string;
    overlay: string;
    inverse: string;
    chat: string;
    canvas: string;
  };
  bg: {
    brandBold: {
      rest: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    brandSubtle: {
      rest: string;
      hover: string;
      pressed: string;
    };
    brandSubtlest: string;
    neutral: {
      rest: string;
      hover: string;
      pressed: string;
    };
    neutralSubtle: {
      rest: string;
      hover: string;
      pressed: string;
    };
    neutralBold: {
      rest: string;
      hover: string;
      pressed: string;
    };
    dangerBold: {
      rest: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    dangerSubtle: {
      rest: string;
      hover: string;
      pressed: string;
    };
    successBold: {
      rest: string;
      hover: string;
      pressed: string;
    };
    successSubtle: {
      rest: string;
      hover: string;
      pressed: string;
    };
    warningBold: {
      rest: string;
      hover: string;
      pressed: string;
    };
    warningSubtle: {
      rest: string;
      hover: string;
      pressed: string;
    };
    infoBold: {
      rest: string;
      hover: string;
      pressed: string;
    };
    infoSubtle: {
      rest: string;
      hover: string;
      pressed: string;
    };
    disabled: string;
    input: {
      rest: string;
      disabled: string;
    };
    item: {
      hover: string;
      selected: string;
      selectedHover: string;
    };
    control: {
      off: string;
      offHover: string;
    };
    infoSubtlest: string;
    successSubtlest: string;
    warningSubtlest: string;
    dangerSubtlest: string;
    indicator: {
      info: string;
      success: string;
      warning: string;
      danger: string;
      neutral: string;
    };
    skeleton: string;
  };
  border: {
    default: string;
    subtle: string;
    subtlest: string;
    strong: string;
    brand: {
      rest: string;
      hover: string;
      pressed: string;
    };
    focus: string;
    selected: string;
    danger: {
      rest: string;
      hover: string;
      pressed: string;
    };
    disabled: string;
    success: string;
    warning: string;
    info: string;
    inverse: string;
  };
  overlay: {
    backdrop: string;
  };
  accent: {
    blue: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    cyan: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    geekblue: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    purple: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    magenta: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    red: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    volcano: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    orange: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    gold: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    lime: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
    green: {
      bg: string;
      border: string;
      text: string;
      textStrong: string;
      bold: string;
    };
  };
  chart: {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
  };
  typography: {
    h0Light: string;
    h0Bold: string;
    h1Regular: string;
    h1Medium: string;
    h1Bold: string;
    h2Regular: string;
    h2Medium: string;
    h2Bold: string;
    h3Regular: string;
    h3Medium: string;
    h3Bold: string;
    h4Regular: string;
    h4Medium: string;
    h4Bold: string;
    title16Regular: string;
    title16Medium: string;
    title16Bold: string;
    body14Regular: string;
    body14Medium: string;
    body14Bold: string;
    body14RegularUnderline: string;
    body14RegularStrikethrough: string;
    body14Code: string;
    footnote12Regular: string;
    footnote12Medium: string;
    footnote12Bold: string;
    footnote12SystemMonospace: string;
    dense13Regular: string;
    dense13Medium: string;
    dense11Regular: string;
    dense11Medium: string;
    dense10Regular: string;
    dense10Medium: string;
  };
};
export type FigmaTokenName = "button/tertiary-negative/text/rest" | "button/tertiary-negative/text/hover" | "button/tertiary-negative/text/pressed" | "button/tertiary-negative/icon/rest" | "button/tertiary-negative/icon/hover" | "button/tertiary-negative/icon/pressed" | "input/icon/error" | "input/icon/error-subtle" | "input/text/error" | "checkbox/text/disabled" | "tabs/icon/divider" | "tabs/border/divider" | "dropdown/text/danger" | "dropdown/icon/scrollbar" | "tag/magenta/text-800" | "tag/magenta/icon-600" | "tag/magenta/border-400" | "tag/magenta/icon-500" | "tag/red/icon-600" | "tag/red/text-600" | "tag/volcano/icon-700" | "tag/volcano/icon-600" | "tag/volcano/text-600" | "tag/orange/icon-700" | "tag/orange/icon-600" | "tag/gold/icon-800" | "tag/gold/text-800" | "tag/gold/icon-600" | "tag/lime/icon-800" | "tag/lime/text-800" | "tag/lime/icon-700" | "tag/lime/bg-700" | "tag/cyan/icon-700" | "tag/cyan/bg-700" | "tag/geekblue/text-600" | "tag/geekblue/icon-600" | "tag/geekblue/bg-500" | "tag/purple/text-600" | "tag/purple/icon-500" | "tag/purple/icon-600" | "tag/purple/bg-500" | "tag/green/text-600" | "tag/new/bg" | "tag/new/text" | "tag/new/border" | "badge/pink/bg" | "badge/yellow/bg" | "badge/ribbon/border" | "notification/success/text" | "notification/info-notes/bg" | "notification/error/text" | "message/error/icon" | "message/warning/icon" | "modal-confirm/warning/icon" | "modal-confirm/danger/icon" | "popover/icon/subtle" | "popover/border/divider" | "popover/bg/placeholder" | "tooltip/dark/text" | "tooltip/dark/text-subtle" | "tooltip/dark/icon" | "tooltip/dark/keystroke-bg" | "tour/dark/text" | "tour/dark/bg-subtle" | "table/row/icon-danger" | "table/row/accent-bg" | "table/row/tag-icon" | "table/header/divider" | "spinner/track" | "spinner/indicator" | "chat/bg" | "chat/bubble-outgoing" | "chat/bubble-incoming" | "alert/warning-strong" | "space/0" | "space/100" | "space/125" | "space/150" | "space/200" | "space/250" | "space/300" | "space/400" | "space/500" | "space/600" | "space/800" | "space/025" | "space/050" | "space/075" | "radius/none" | "radius/xxs" | "radius/xs" | "radius/sm" | "radius/md" | "radius/xl" | "radius/xxl" | "radius/3xl" | "radius/rounded" | "size/control/sm" | "size/control/md" | "size/control/lg" | "size/icon/xs" | "size/icon/sm" | "size/icon/md" | "size/icon/lg" | "size/icon/xl" | "size/checkbox/md" | "size/checkbox/lg" | "size/switch/width" | "size/switch/height" | "size/badge/sm" | "size/badge/md" | "size/dot" | "size/tag" | "size/menu-item" | "size/table/header" | "size/table/row" | "size/tabs/sm" | "size/tabs/md" | "size/tabs/lg" | "size/segmented/sm" | "size/segmented/md" | "size/segmented/lg" | "size/sidebar-icon" | "size/dropdown/width" | "size/tooltip/max" | "size/popover/width" | "size/modal/confirm" | "size/modal/md" | "size/drawer/md" | "size/kbd/sm" | "size/kbd/md" | "border-width/default" | "border-width/indicator" | "border-width/accent" | "font/weight/regular" | "font/weight/medium" | "font/weight/bold" | "font/heading/2xl/size" | "font/heading/2xl/line-height" | "font/heading/xl/size" | "font/heading/xl/line-height" | "font/heading/lg/size" | "font/heading/lg/line-height" | "font/heading/md/size" | "font/heading/md/line-height" | "font/heading/sm/size" | "font/heading/sm/line-height" | "font/heading/xs/size" | "font/heading/xs/line-height" | "font/body/md/size" | "font/body/md/line-height" | "font/body/sm/size" | "font/body/sm/line-height" | "font/code/md/size" | "font/code/md/line-height" | "font/code/sm/size" | "font/code/sm/line-height" | "font/dense/md/size" | "font/dense/md/line-height" | "font/dense/sm/size" | "font/dense/sm/line-height" | "font/dense/xs/size" | "font/dense/xs/line-height" | "font/family/sans" | "font/family/mono" | "elevation/raised" | "elevation/overlay" | "elevation/selected" | "elevation/button-primary" | "elevation/button-default" | "focus/brand" | "focus/danger" | "focus/neutral" | "focus/control" | "blur/sm" | "blur/md" | "blur/lg" | "blur/xl" | "gray/0" | "gray/50" | "gray/100" | "gray/150" | "gray/200" | "gray/250" | "gray/300" | "gray/400" | "gray/500" | "gray/600" | "gray/700" | "gray/800" | "gray/900" | "gray/1000" | "blue/50" | "blue/100" | "blue/200" | "blue/300" | "blue/400" | "blue/500" | "blue/600" | "blue/700" | "blue/800" | "blue/900" | "blue/950" | "crimson/50" | "crimson/100" | "crimson/200" | "crimson/300" | "crimson/500" | "crimson/600" | "slate/400" | "beige/100" | "beige/200" | "teal/50" | "teal/800" | "red/100" | "red/200" | "red/300" | "red/400" | "red/500" | "red/600" | "red/700" | "red/800" | "red/900" | "red/950" | "volcano/100" | "volcano/200" | "volcano/300" | "volcano/400" | "volcano/500" | "volcano/600" | "volcano/700" | "volcano/800" | "volcano/900" | "volcano/950" | "orange/100" | "orange/200" | "orange/300" | "orange/400" | "orange/500" | "orange/600" | "orange/650" | "orange/700" | "orange/800" | "orange/900" | "orange/950" | "gold/100" | "gold/200" | "gold/300" | "gold/400" | "gold/500" | "gold/600" | "gold/700" | "gold/800" | "gold/900" | "gold/950" | "yellow/100" | "yellow/200" | "yellow/300" | "yellow/400" | "yellow/500" | "yellow/600" | "yellow/700" | "yellow/800" | "yellow/900" | "yellow/950" | "lime/100" | "lime/200" | "lime/300" | "lime/400" | "lime/500" | "lime/600" | "lime/700" | "lime/800" | "lime/900" | "lime/950" | "green/100" | "green/150" | "green/200" | "green/300" | "green/400" | "green/500" | "green/600" | "green/700" | "green/800" | "green/900" | "green/950" | "cyan/100" | "cyan/200" | "cyan/300" | "cyan/400" | "cyan/500" | "cyan/600" | "cyan/700" | "cyan/800" | "cyan/900" | "cyan/950" | "sky/100" | "sky/200" | "sky/300" | "sky/400" | "sky/500" | "sky/600" | "sky/700" | "sky/800" | "sky/900" | "sky/950" | "geekblue/100" | "geekblue/200" | "geekblue/300" | "geekblue/400" | "geekblue/500" | "geekblue/600" | "geekblue/700" | "geekblue/800" | "geekblue/900" | "geekblue/950" | "purple/100" | "purple/200" | "purple/300" | "purple/400" | "purple/500" | "purple/600" | "purple/700" | "purple/800" | "purple/900" | "purple/950" | "magenta/100" | "magenta/200" | "magenta/300" | "magenta/400" | "magenta/500" | "magenta/600" | "magenta/700" | "magenta/800" | "magenta/900" | "magenta/950" | "text/default" | "text/strong" | "text/control" | "text/subtle" | "text/subtlest" | "text/placeholder" | "text/disabled" | "text/inverse" | "text/brand/rest" | "text/brand/hover" | "text/brand/pressed" | "text/selected" | "text/danger" | "text/success" | "text/warning" | "text/info" | "icon/default" | "icon/subtle" | "icon/subtlest" | "icon/disabled" | "icon/inverse" | "icon/brand" | "icon/info" | "icon/success" | "icon/warning" | "icon/danger" | "surface/default" | "surface/subtle" | "surface/sunken" | "surface/overlay" | "surface/inverse" | "surface/chat" | "surface/canvas" | "bg/brand-bold/rest" | "bg/brand-bold/hover" | "bg/brand-bold/pressed" | "bg/brand-bold/disabled" | "bg/brand-subtle/rest" | "bg/brand-subtle/hover" | "bg/brand-subtle/pressed" | "bg/brand-subtlest" | "bg/neutral/rest" | "bg/neutral/hover" | "bg/neutral/pressed" | "bg/neutral-subtle/rest" | "bg/neutral-subtle/hover" | "bg/neutral-subtle/pressed" | "bg/neutral-bold/rest" | "bg/neutral-bold/hover" | "bg/neutral-bold/pressed" | "bg/danger-bold/rest" | "bg/danger-bold/hover" | "bg/danger-bold/pressed" | "bg/danger-bold/disabled" | "bg/danger-subtle/rest" | "bg/danger-subtle/hover" | "bg/danger-subtle/pressed" | "bg/success-bold/rest" | "bg/success-bold/hover" | "bg/success-bold/pressed" | "bg/success-subtle/rest" | "bg/success-subtle/hover" | "bg/success-subtle/pressed" | "bg/warning-bold/rest" | "bg/warning-bold/hover" | "bg/warning-bold/pressed" | "bg/warning-subtle/rest" | "bg/warning-subtle/hover" | "bg/warning-subtle/pressed" | "bg/info-bold/rest" | "bg/info-bold/hover" | "bg/info-bold/pressed" | "bg/info-subtle/rest" | "bg/info-subtle/hover" | "bg/info-subtle/pressed" | "bg/disabled" | "bg/input/rest" | "bg/input/disabled" | "bg/item/hover" | "bg/item/selected" | "bg/item/selected-hover" | "bg/control/off" | "bg/control/off-hover" | "bg/info-subtlest" | "bg/success-subtlest" | "bg/warning-subtlest" | "bg/danger-subtlest" | "bg/indicator/info" | "bg/indicator/success" | "bg/indicator/warning" | "bg/indicator/danger" | "bg/indicator/neutral" | "bg/skeleton" | "border/default" | "border/subtle" | "border/subtlest" | "border/strong" | "border/brand/rest" | "border/brand/hover" | "border/brand/pressed" | "border/focus" | "border/selected" | "border/danger/rest" | "border/danger/hover" | "border/danger/pressed" | "border/disabled" | "border/success" | "border/warning" | "border/info" | "border/inverse" | "overlay/backdrop" | "accent/blue/bg" | "accent/blue/border" | "accent/blue/text" | "accent/blue/text-strong" | "accent/blue/bold" | "accent/cyan/bg" | "accent/cyan/border" | "accent/cyan/text" | "accent/cyan/text-strong" | "accent/cyan/bold" | "accent/geekblue/bg" | "accent/geekblue/border" | "accent/geekblue/text" | "accent/geekblue/text-strong" | "accent/geekblue/bold" | "accent/purple/bg" | "accent/purple/border" | "accent/purple/text" | "accent/purple/text-strong" | "accent/purple/bold" | "accent/magenta/bg" | "accent/magenta/border" | "accent/magenta/text" | "accent/magenta/text-strong" | "accent/magenta/bold" | "accent/red/bg" | "accent/red/border" | "accent/red/text" | "accent/red/text-strong" | "accent/red/bold" | "accent/volcano/bg" | "accent/volcano/border" | "accent/volcano/text" | "accent/volcano/text-strong" | "accent/volcano/bold" | "accent/orange/bg" | "accent/orange/border" | "accent/orange/text" | "accent/orange/text-strong" | "accent/orange/bold" | "accent/gold/bg" | "accent/gold/border" | "accent/gold/text" | "accent/gold/text-strong" | "accent/gold/bold" | "accent/lime/bg" | "accent/lime/border" | "accent/lime/text" | "accent/lime/text-strong" | "accent/lime/bold" | "accent/green/bg" | "accent/green/border" | "accent/green/text" | "accent/green/text-strong" | "accent/green/bold" | "chart/1" | "chart/2" | "chart/3" | "chart/4" | "chart/5" | "chart/6" | "chart/7" | "chart/8" | "typography/h0-light" | "typography/h0-bold" | "typography/h1-regular" | "typography/h1-medium" | "typography/h1-bold" | "typography/h2-regular" | "typography/h2-medium" | "typography/h2-bold" | "typography/h3-regular" | "typography/h3-medium" | "typography/h3-bold" | "typography/h4-regular" | "typography/h4-medium" | "typography/h4-bold" | "typography/title-16-regular" | "typography/title-16-medium" | "typography/title-16-bold" | "typography/body-14-regular" | "typography/body-14-medium" | "typography/body-14-bold" | "typography/body-14-regular-underline" | "typography/body-14-regular-strikethrough" | "typography/body-14-code" | "typography/footnote-12-regular" | "typography/footnote-12-medium" | "typography/footnote-12-bold" | "typography/footnote-12-system-monospace" | "typography/dense-13-regular" | "typography/dense-13-medium" | "typography/dense-11-regular" | "typography/dense-11-medium" | "typography/dense-10-regular" | "typography/dense-10-medium";
export declare const tokens: PancakeTokens;
export declare const cssVar: PancakeTokens;
export declare const byFigmaName: Record<FigmaTokenName, string>;
export default tokens;
