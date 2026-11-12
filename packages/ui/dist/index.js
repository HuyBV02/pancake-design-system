import { Alert as e, App as t, App as n, Badge as r, Button as i, Checkbox as a, ConfigProvider as o, DatePicker as s, Dropdown as c, Empty as l, Form as u, Input as d, InputNumber as f, Menu as p, Modal as m, Popconfirm as h, Popover as g, Progress as _, Radio as v, Segmented as ee, Select as y, Skeleton as te, Space as ne, Spin as re, Switch as ie, Table as ae, Tabs as oe, Tag as se, TimePicker as ce, Tooltip as b, Tour as x } from "antd";
import { StyleProvider as S } from "@ant-design/cssinjs";
import C from "antd/locale/vi_VN.js";
import w from "antd/locale/en_US.js";
import { byFigmaName as T, cssVar as E, tokens as D, tokens as O } from "@pancake/tokens";
import { jsx as k, jsxs as A } from "react/jsx-runtime";
import { forwardRef as j } from "react";
import { CheckCircle as M, Info as N, Warning as P, XCircle as F } from "@phosphor-icons/react";
// src/theme/antdTheme.ts
var I = (e) => parseFloat(e), { text: L, icon: R, surface: z, bg: B, border: V, overlay: H, space: U, radius: W, size: G, font: K, elevation: q, focus: J } = O, Y = {
	cssVar: { key: "pk-antd" },
	hashed: !1,
	token: {
		colorPrimary: B.brandBold.rest,
		colorPrimaryHover: B.brandBold.hover,
		colorPrimaryActive: B.brandBold.pressed,
		colorPrimaryBg: B.item.selected,
		colorPrimaryBgHover: B.item.selectedHover,
		colorPrimaryBorder: V.selected,
		colorPrimaryBorderHover: V.focus,
		colorPrimaryText: L.brand.rest,
		colorPrimaryTextHover: L.brand.hover,
		colorPrimaryTextActive: L.brand.pressed,
		colorLink: L.brand.rest,
		colorLinkHover: L.brand.hover,
		colorLinkActive: L.brand.pressed,
		colorInfo: R.info,
		colorInfoBg: B.infoSubtlest,
		colorInfoBorder: V.info,
		colorSuccess: R.success,
		colorSuccessBg: B.successSubtlest,
		colorSuccessBorder: V.success,
		colorSuccessText: L.success,
		colorWarning: R.warning,
		colorWarningBg: B.warningSubtlest,
		colorWarningBorder: V.warning,
		colorWarningText: L.warning,
		colorError: V.danger.rest,
		colorErrorHover: V.danger.hover,
		colorErrorActive: V.danger.pressed,
		colorErrorBg: B.dangerSubtlest,
		colorErrorBorder: O.accent.red.border,
		colorErrorText: L.danger,
		colorText: L.default,
		colorTextHeading: L.default,
		colorTextSecondary: L.subtle,
		colorTextTertiary: L.subtlest,
		colorTextQuaternary: L.disabled,
		colorTextPlaceholder: L.placeholder,
		colorTextDisabled: L.disabled,
		colorTextDescription: L.subtlest,
		colorTextLightSolid: L.inverse,
		colorIcon: R.subtle,
		colorIconHover: R.default,
		colorBgBase: z.default,
		colorBgContainer: z.default,
		colorBgElevated: z.overlay,
		colorBgLayout: z.canvas,
		colorBgSpotlight: z.inverse,
		colorBgMask: H.backdrop,
		colorBgContainerDisabled: B.input.disabled,
		colorFill: B.neutral.hover,
		colorFillSecondary: B.neutral.rest,
		colorFillTertiary: z.sunken,
		colorFillQuaternary: z.subtle,
		colorBorder: V.default,
		colorBorderSecondary: V.subtlest,
		colorSplit: V.subtlest,
		controlItemBgHover: B.item.hover,
		controlItemBgActive: B.item.selected,
		controlItemBgActiveHover: B.item.selectedHover,
		controlOutline: "rgba(99,153,242,0.2)",
		controlOutlineWidth: 4,
		fontFamily: K.family.sans,
		fontFamilyCode: K.family.mono,
		fontSize: I(K.body.md.size),
		fontSizeSM: I(K.body.sm.size),
		fontSizeLG: I(K.heading.xs.size),
		fontSizeHeading1: I(K.heading.xl.size),
		fontSizeHeading2: I(K.heading.lg.size),
		fontSizeHeading3: I(K.heading.md.size),
		fontSizeHeading4: I(K.heading.sm.size),
		fontSizeHeading5: I(K.heading.xs.size),
		lineHeight: I(K.body.md.lineHeight) / I(K.body.md.size),
		fontWeightStrong: Number(K.weight.medium),
		controlHeightSM: I(G.control.sm),
		controlHeight: I(G.control.md),
		controlHeightLG: I(G.control.lg),
		borderRadiusXS: I(W.xs),
		borderRadiusSM: I(W.sm),
		borderRadius: I(W.md),
		borderRadiusLG: I(W.xl),
		borderRadiusOuter: I(W.xs),
		lineWidth: I(O.borderWidth.default),
		boxShadow: q.overlay,
		boxShadowSecondary: q.overlay,
		boxShadowTertiary: q.raised,
		paddingXS: I(U[100]),
		paddingSM: I(U[150]),
		padding: I(U[200]),
		paddingLG: I(U[300]),
		marginXS: I(U[100]),
		marginSM: I(U[150]),
		margin: I(U[200]),
		marginLG: I(U[300]),
		wireframe: !1
	},
	components: {
		Button: {
			fontWeight: Number(K.weight.medium),
			contentFontSizeLG: I(K.heading.xs.size),
			paddingInlineSM: I(U[100]),
			paddingInline: I(U[150]),
			paddingInlineLG: I(U[200]),
			onlyIconSizeSM: I(G.icon.md),
			onlyIconSize: I(G.icon.lg),
			onlyIconSizeLG: I(G.icon.lg),
			iconGap: I(U[100]),
			borderRadiusLG: I(W.md),
			primaryShadow: q.buttonPrimary,
			defaultShadow: q.buttonDefault,
			dangerShadow: "none"
		},
		Input: {
			paddingInline: I(U[150]),
			paddingInlineSM: I(U[150]),
			paddingInlineLG: I(U[150]),
			hoverBorderColor: V.focus,
			activeBorderColor: V.focus,
			activeShadow: J.brand,
			errorActiveShadow: J.danger
		},
		InputNumber: {
			hoverBorderColor: V.focus,
			activeBorderColor: V.focus,
			activeShadow: J.brand,
			errorActiveShadow: J.danger
		},
		Select: {
			hoverBorderColor: V.focus,
			activeBorderColor: V.focus,
			activeOutlineColor: "rgba(99,153,242,0.2)",
			optionSelectedBg: B.item.selected,
			optionActiveBg: B.item.hover,
			optionSelectedFontWeight: Number(K.weight.medium),
			optionHeight: I(G.menuItem),
			multipleItemBg: B.neutral.rest
		},
		DatePicker: {
			hoverBorderColor: V.focus,
			activeBorderColor: V.focus,
			activeShadow: J.brand,
			cellHoverBg: B.item.hover,
			cellActiveWithRangeBg: B.item.selected
		},
		Switch: {
			trackHeight: I(G.switch.height),
			trackMinWidth: I(G.switch.width),
			trackPadding: 2,
			handleSize: 18
		},
		Segmented: {
			trackBg: B.neutral.rest,
			trackPadding: 2,
			itemColor: L.default,
			itemHoverColor: L.default,
			itemHoverBg: B.neutral.hover,
			itemActiveBg: B.neutral.pressed,
			itemSelectedBg: z.default,
			itemSelectedColor: L.default,
			borderRadius: I(W.md),
			borderRadiusSM: I(W.sm)
		},
		Tabs: {
			inkBarColor: L.selected,
			itemColor: L.default,
			itemHoverColor: L.selected,
			itemSelectedColor: L.selected,
			itemActiveColor: L.selected,
			horizontalItemGutter: I(U[250]),
			titleFontSize: I(K.body.md.size)
		},
		Dropdown: {
			paddingBlock: 5,
			borderRadiusLG: I(W.xl),
			borderRadiusSM: I(W.sm)
		},
		Menu: {
			itemHoverBg: B.item.hover,
			itemSelectedBg: B.item.selected,
			itemSelectedColor: L.default,
			itemBorderRadius: I(W.sm),
			itemHeight: I(G.menuItem)
		},
		Table: {
			headerBg: z.sunken,
			headerColor: L.default,
			headerSplitColor: O.table.header.divider,
			borderColor: V.subtle,
			rowHoverBg: B.item.hover,
			rowSelectedBg: B.item.selected,
			rowSelectedHoverBg: B.item.selectedHover,
			cellPaddingBlock: I(U[150]),
			cellPaddingInline: I(U[200]),
			headerBorderRadius: 0
		},
		Tag: {
			defaultBg: B.neutral.rest,
			defaultColor: L.control
		},
		Badge: {
			indicatorHeight: I(G.badge.md),
			indicatorHeightSM: I(G.badge.sm),
			dotSize: I(G.dot),
			statusSize: I(G.dot),
			colorError: B.indicator.danger
		},
		Alert: {
			borderRadiusLG: I(W.md),
			defaultPadding: `${U["050"]} ${U[100]}`,
			withDescriptionPadding: `${U[250]} ${U[300]}`
		},
		Message: {
			contentPadding: `${U[125]} ${U[200]}`,
			borderRadiusLG: I(W.xl)
		},
		Notification: { borderRadiusLG: I(W.xl) },
		Modal: {
			borderRadiusLG: I(W.xxl),
			titleFontSize: I(K.heading.xs.size),
			titleColor: L.strong
		},
		Popover: { borderRadiusLG: I(W.xl) },
		Tooltip: {
			borderRadius: I(W.md),
			maxWidth: I(G.tooltip.max)
		},
		Progress: {
			defaultColor: B.infoBold.rest,
			remainingColor: B.neutral.rest
		},
		Skeleton: {
			gradientFromColor: B.skeleton,
			borderRadiusSM: I(W.md)
		},
		Spin: { colorPrimary: O.spinner.indicator },
		Form: {
			labelColor: L.subtle,
			labelRequiredMarkColor: L.danger,
			verticalLabelPadding: `0 0 ${U[100]}`,
			itemMarginBottom: I(U[250])
		},
		Checkbox: { borderRadiusSM: I(W.xs) }
	}
};
// src/PancakeProvider.tsx
function le({ children: e, locale: t = "vi" }) {
	return /* @__PURE__ */ k(S, {
		layer: !0,
		children: /* @__PURE__ */ k(o, {
			theme: Y,
			locale: t === "vi" ? C : w,
			wave: { disabled: !0 },
			children: /* @__PURE__ */ k(n, {
				className: "pk-root",
				children: e
			})
		})
	});
}
// src/utils.ts
var X = (...e) => e.filter(Boolean).join(" "), ue = {
	primary: {
		color: "primary",
		variant: "solid"
	},
	"secondary-blue": {
		color: "primary",
		variant: "filled"
	},
	"secondary-gray": {
		color: "default",
		variant: "filled"
	},
	"tertiary-blue": {
		color: "primary",
		variant: "outlined"
	},
	"tertiary-gray": {
		color: "default",
		variant: "outlined"
	},
	text: {
		color: "default",
		variant: "text"
	},
	link: {
		color: "primary",
		variant: "text"
	}
}, de = {
	s: "small",
	m: "middle",
	l: "large"
}, fe = j(function({ variant: e = "secondary-gray", size: t = "m", negative: n = !1, dashed: r = !1, className: a, ...o }, s) {
	let c = ue[e];
	return /* @__PURE__ */ k(i, {
		ref: s,
		...o,
		color: n ? "danger" : c.color,
		variant: r && e === "tertiary-blue" ? "dashed" : c.variant,
		size: de[t],
		className: X("pk-btn", `pk-btn--${e}`, `pk-btn--${t}`, n && "pk-btn--negative", r && "pk-btn--dashed", a)
	});
});
// src/components/Tag.tsx
function pe({ color: e = "neutral", bordered: t = !1, solid: n = !1, dot: r = !1, className: i, children: a, ...o }) {
	return /* @__PURE__ */ A(se, {
		...o,
		variant: "filled",
		className: X("pk-tag", `pk-tag--${e}`, t && "pk-tag--bordered", n && "pk-tag--solid", i),
		children: [r && /* @__PURE__ */ k("span", {
			className: "pk-tag__dot",
			"aria-hidden": !0
		}), a]
	});
}
// src/components/Badge.tsx
var me = {
	danger: O.bg.indicator.danger,
	info: O.bg.indicator.info,
	success: O.bg.indicator.success,
	warning: O.bg.indicator.warning,
	neutral: O.bg.indicator.neutral
};
function he({ tone: e = "danger", size: t = "md", ...n }) {
	return /* @__PURE__ */ k(r, {
		...n,
		color: me[e],
		size: t === "sm" ? "small" : "medium"
	});
}
// src/components/Alert.tsx
var Z = {
	info: /* @__PURE__ */ k(N, { weight: "fill" }),
	success: /* @__PURE__ */ k(M, { weight: "fill" }),
	warning: /* @__PURE__ */ k(P, { weight: "fill" }),
	error: /* @__PURE__ */ k(F, { weight: "fill" })
};
function ge({ type: t = "info", compact: n = !0, showIcon: r = !0, className: i, ...a }) {
	return /* @__PURE__ */ k(e, {
		...a,
		type: t,
		showIcon: r,
		icon: a.icon ?? Z[t],
		className: X("pk-alert", n ? "pk-alert--compact" : "pk-alert--full", i)
	});
}
// src/components/Kbd.tsx
function Q({ size: e = "sm", children: t, className: n }) {
	return /* @__PURE__ */ k("kbd", {
		className: X("pk-kbd", `pk-kbd--${e}`, n),
		children: t
	});
}
function _e({ keys: e, size: t = "sm", className: n }) {
	return /* @__PURE__ */ k("span", {
		className: X("pk-shortcut", n),
		children: e.slice(0, 3).map((e, n) => /* @__PURE__ */ k(Q, {
			size: t,
			children: e
		}, n))
	});
}
// src/components/Text.tsx
var ve = {
	h0: "h1",
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4"
};
function ye({ variant: e = "body-14-regular", tone: t = "default", as: n, children: r, className: i, style: a, title: o }) {
	let s = n ?? ve[e.split("-")[0]] ?? "span", c = t === "brand" ? "var(--pk-text-brand-rest)" : `var(--pk-text-${t})`, l = e.endsWith("underline") ? "underline" : e.endsWith("strikethrough") ? "line-through" : void 0;
	return /* @__PURE__ */ k(s, {
		className: i,
		title: o,
		style: {
			font: `var(--pk-typography-${e})`,
			color: c,
			textDecoration: l,
			margin: 0,
			...a
		},
		children: r
	});
}
// src/components/Icon.tsx
function be({ as: e, size: t = "lg", tone: n = "inherit", weight: r = "regular", ...i }) {
	return /* @__PURE__ */ k(e, {
		...i,
		weight: r,
		size: "1em",
		style: {
			fontSize: `var(--pk-size-icon-${t})`,
			flexShrink: 0,
			verticalAlign: "middle",
			...i.style
		},
		color: n === "inherit" ? "currentColor" : `var(--pk-icon-${n})`,
		"aria-hidden": !i["aria-label"] || void 0
	});
}
// src/components/Controls.tsx
function xe({ className: e, ...t }) {
	return /* @__PURE__ */ k(ie, {
		...t,
		className: X("pk-switch", e)
	});
}
function Se({ size: e = "m", className: t, ...n }) {
	return /* @__PURE__ */ k(ee, {
		...n,
		size: e === "s" ? "small" : e === "l" ? "large" : "middle",
		className: X("pk-segmented", `pk-segmented--${e}`, t)
	});
}
var $ = {
	confirm: parseFloat(O.size.modal.confirm),
	md: parseFloat(O.size.modal.md)
};
function Ce({ width: e = "md", className: t, ...n }) {
	return /* @__PURE__ */ k(m, {
		centered: !0,
		...n,
		width: typeof e == "number" ? e : $[e],
		className: X("pk-modal", t)
	});
}
function we({ description: e = "Chưa có dữ liệu", image: t = l.PRESENTED_IMAGE_SIMPLE, ...n }) {
	return /* @__PURE__ */ k(l, {
		...n,
		description: e,
		image: t
	});
}
export { ge as Alert, t as App, he as Badge, fe as Button, a as Checkbox, s as DatePicker, c as Dropdown, we as Empty, u as Form, be as Icon, d as Input, f as InputNumber, Q as Kbd, $ as MODAL_WIDTH, p as Menu, Ce as Modal, le as PancakeProvider, h as Popconfirm, g as Popover, _ as Progress, v as Radio, Se as Segmented, y as Select, _e as Shortcut, te as Skeleton, ne as Space, re as Spin, xe as Switch, ae as Table, oe as Tabs, pe as Tag, ye as Text, ce as TimePicker, b as Tooltip, x as Tour, Y as antdTheme, T as byFigmaName, E as cssVar, D as tokens };

//# sourceMappingURL=index.js.map