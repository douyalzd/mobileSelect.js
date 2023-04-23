/*
* mobile-select v1.4.0
* Homepage: https://github.com/onlyhom/mobile-select
* Released under the MIT License.
* (c) 2017-present
*/
// Generated by dts-bundle-generator v6.12.0

export type CascadeData = {
	[k: string]: any;
};
export interface CallbackFn {
	(curValue: string[] | number[] | CascadeData[], indexArr: number[], context: MobileSelect): void;
}
export interface OldCallbackFn {
	(indexArr: number[], curValue: string[] | number[] | CascadeData[], context: MobileSelect): void;
}
export type KeyMap = {
	id: string;
	value: string;
	childs: string;
};
export type OptionData = CascadeData | string | number;
export type CustomConfig = {
	/** 触发面板弹出的元素 */
	trigger: string | HTMLElement;
	/** 数据源 */
	wheels: CascadeData[];
	/** 选择完毕的回调函数 */
	onChange?: CallbackFn;
	/** 取消面板的回调函数 */
	onCancel?: CallbackFn;
	/** 滚动滚动完毕的回调函数 */
	onTransitionEnd?: CallbackFn;
	/** 显示面板 回调函数 */
	onShow?: CallbackFn;
	/** 隐藏面板 回调函数 */
	onHide?: CallbackFn;
	/** 初始值 传入后会自动计算出初始化滚动位置 */
	initValue?: string;
	/** 初始化滚动位置 */
	position?: number[];
	/** 轮子宽度比例 */
	colWidth?: number[];
	/** 组件标题 */
	title?: string;
	/** 拼接值的连接符 默认是空格 */
	connector?: string;
	/** 确认按钮 文案 */
	ensureBtnText?: string;
	/** 取消按钮 文案 */
	cancelBtnText?: string;
	/** 确认按钮 文字颜色 */
	ensureBtnColor?: string;
	/** 取消按钮 文字颜色 */
	cancelBtnColor?: string;
	/** 组件标题 文字颜色 */
	titleColor?: string;
	/** 组件标题 背景颜色 */
	titleBgColor?: string;
	/** 选项文字颜色 */
	textColor?: string;
	/** 遮罩背景色 */
	bgColor?: string;
	/** 遮罩层透明度 */
	maskOpacity?: number;
	/** 数据源, 用户自定义key */
	keyMap?: KeyMap;
	/** onChange后 是否修改trigger的innerText */
	triggerDisplayValue?: boolean;
	/** 是否自动拉起面板 */
	autoFocus?: boolean;
	/** 轮子滚动速度 默认为1 */
	scrollSpeed?: number;
	/** (即将废弃) 选择完毕的回调函数 */
	callback?: OldCallbackFn;
	/** (即将废弃) 取消面板的回调函数  */
	cancel?: OldCallbackFn;
	/** (即将废弃) 滚动滚动完毕的回调函数  */
	transitionEnd?: OldCallbackFn;
	/** (即将废弃) onChange后 是否修改trigger的innerText */
	triggerDisplayData?: boolean;
};
export type MobileSelectConfig = CustomConfig & Required<Pick<CustomConfig, "keyMap" | "position" | "colWidth" | "title" | "connector" | "ensureBtnText" | "cancelBtnText" | "triggerDisplayValue" | "scrollSpeed">>;
declare class MobileSelect {
	mobileSelect: HTMLDivElement;
	trigger: HTMLElement;
	wheelList: HTMLCollectionOf<HTMLElement>;
	sliderList: HTMLCollectionOf<HTMLElement>;
	wheelsContain: HTMLDivElement;
	panel: HTMLDivElement;
	ensureBtn: HTMLDivElement;
	cancelBtn: HTMLDivElement;
	grayLayer: HTMLDivElement;
	popUp: HTMLDivElement;
	/** 初始化滚动位置 由position 或 initValue计算决定 */
	initPosition: number[];
	/** 轮子宽度比例 */
	initColWidth: number[];
	/** 数据源 */
	wheelsData: CascadeData[];
	/** 显示json */
	displayJson: CascadeData[];
	/** 当前数值 */
	curValue: string[] | number[] | CascadeData[];
	/** 当前索引位置 */
	curIndexArr: number[];
	/** 是否级联 */
	isCascade: boolean;
	/** 是否JSON格式 */
	isJsonType: boolean;
	/** 开始 Y轴位置 */
	startY: number;
	/** 结束 Y轴位置 */
	moveEndY: number;
	/** 当前 Y轴位置 */
	moveY: number;
	/** 上一次 Y轴位置 */
	preMoveY: number;
	/** Y轴新旧位移差值 */
	offsetY: number;
	/** 差值总和? */
	offsetSum: number;
	/** 最大Border? */
	oversizeBorder: number;
	/** 是否启用点击状态 */
	enableClickStatus: boolean;
	/** 选项高度(li元素的高度) */
	optionHeight: number;
	/** 存放滚动距离的数组 */
	curDistance: number[];
	/** 级联数据 相当于wheels[0].data的别名 */
	cascadeJsonData: CascadeData[];
	/** 事件监听 */
	eventHandleMap: {
		[x: string]: {
			event: string | string[];
			fn: Function;
		};
	};
	/** 级联数据 级联深度 */
	initDeepCount: number;
	/** 用户配置项 */
	config: MobileSelectConfig;
	/** 默认配置 */
	static defaultConfig: {
		keyMap: {
			id: string;
			value: string;
			childs: string;
		};
		position: never[];
		colWidth: never[];
		title: string;
		connector: string;
		ensureBtnText: string;
		cancelBtnText: string;
		triggerDisplayValue: boolean;
		scrollSpeed: number;
	};
	constructor(config: CustomConfig);
	init(): void;
	static checkDataType(wheelsData: CascadeData): boolean;
	static REQUIRED_PARAMS: (keyof CustomConfig)[];
	static checkRequiredConfig(config: CustomConfig): boolean;
	static log(type: "error" | "info", tips: string): void;
	checkTriggerAvailable(): boolean;
	/** 根据initValue 获取initPostion 需要区分级联和非级联情况 注意此时displayJson还没生成 */
	getPositionByInitValue(): number[];
	getConnectedString(): string;
	setTriggerInnerText(value: string): void;
	setValue(valList: string[] | number[] | CascadeData[]): void;
	setTitle(title: string): void;
	setStyle(config: MobileSelectConfig): void;
	show(): void;
	hide(): void;
	registerEvents(type: "add" | "remove"): void;
	destroy(): void;
	getOptionsHtmlStr(childs: CascadeData): string;
	renderComponent(wheelsData: CascadeData[]): void;
	reRenderWheels(): void;
	checkCascade(): boolean;
	initCascade(): void;
	initCheckArrDeep(parent: CascadeData): void;
	checkArrDeep(parent: CascadeData): void;
	checkRange(index: number, posIndexArr: number[]): void;
	resetPosition(index: number, posIndexArr: number[]): number[];
	updateWheels(data: CascadeData[]): void;
	updateWheel(sliderIndex: number, data: Omit<OptionData, "CascadeData">[]): void;
	fixRowStyle(): void;
	getIndex(distance: number): number;
	getIndexArr(): number[];
	getCurValue(): string[] | number[] | CascadeData[];
	getValue(): string[] | number[] | CascadeData[];
	calcDistance(index: number): number;
	setCurDistance(indexArr: number[]): void;
	fixPosition(distance: number): number;
	movePosition(theSlider: HTMLElement, distance: number): void;
	locatePosition(sliderIndex: number, posIndex: number): void;
	updateCurDistance(theSlider: HTMLElement, index: number): void;
	getInnerText(sliderIndex: number): string;
	touch(event: TouchEvent | MouseEvent): void;
}

export {
	MobileSelect as default,
};

export {};
