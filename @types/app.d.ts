// Global types for Headers.
declare interface NavItem {
	icon?: React.ReactNode;
	href: string;
	content: string | React.ReactNode;
}
declare type TextAlign = "center" | "left" | "right";
declare type Colors = "primary" | "dark" | "danger" | "success" | "info";
declare type Size = "small" | "medium" | "large";

// Declare App component interfaces
declare interface BasicNodeProps {
	children?: React.ReactNode;
	id?: string;
	onClick?: (_val: any) => void;
	onBlur?: (_val: any) => void;
	className?: string;
	style?: React.CSSProperties;
}

declare type XGroupPosition = "left" | "middle" | "right";
declare interface XButtonPropsType extends BasicNodeProps {
	type?: "submit" | "button" | "reset";
	block?: boolean;
	position?: XGroupPosition;
	color?: Colors;
	rounded?: boolean;
	disabled?: boolean;
	loading?: boolean;
	size?: Size;
}

declare interface XButtonGroupProps extends BasicNodeProps {}

declare interface XLinkProps extends BasicNodeProps {
	href: string;
}

declare interface XInputProps extends BasicNodeProps {
	label?: React.ReactNode;
	type?: "text" | "password";
	value: string;
	name?: string;
	placeholder?: string;
	onChange: (_val: any) => void;
	block?: boolean;
}

declare interface XCardProps extends BasicNodeProps {
	title?: React.ReactNode;
	footer?: React.ReactNode;
}

// Table Prop Types
declare interface XTableColumn {
	id: string;
	key?: string;
	dataIndex: string;
	align?: TextAlign;
	label: string | React.ReactNode;
	style?: React.CSSProperties;
	columnStyle?: React.CSSProperties;
	width?: number;
	render?: (
		_item: any,
		_col: any,
		_i: number
	) => string | number | React.ReactNode;
}

declare interface XTableProps extends BasicNodeProps {
	columns: XTableColumn[];
	data: Array<any>;
	loading?: boolean;
}

declare interface XSwitchProps extends BasicNodeProps {
	checked?: boolean;
	onChange?: (_val: any) => void;
}

declare interface XConfirmModalProps extends BasicNodeProps {
	header?: string | React.ReactNode;
	footer?: string | React.ReactNode;
	onClose?: () => void;
	isOpen?: boolean;
}

declare interface XRadioProps extends BasicNodeProps {
	name: string;
	value: string;
	id?: string;
	options: Option[];
	onChange: (_val: string) => void;
}

declare interface XRadioGroupProps extends BasicNodeProps {}

declare interface XCheckboxProps extends BasicNodeProps {
	onChange: (_val: any) => void;
	checked: boolean;
	label: string;
	id: string;
}

declare interface XConfirmModalProps extends BasicNodeProps {
	children: React.ReactElement<{
		position?: XGroupPosition;
		onClick: () => void;
	}>;
	header?: string | React.ReactNode;
	content?: string | React.ReactNode;
	OK?: string | React.ReactNode;
	Cancel?: string | React.ReactNode;
	position?: XGroupPosition;
}
