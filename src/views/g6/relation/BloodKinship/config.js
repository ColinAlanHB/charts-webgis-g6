import GoBack0 from '@/assets/dataStorage/ic_repalce@2x.png';
import GoBack1 from '@/assets/dataStorage/ic_repalce_press@2x.png';
import Add0 from '@/assets/dataStorage/ic_add@2x.png';
import Add1 from '@/assets/dataStorage/ic_add_press@2x.png';
import Reduce0 from '@/assets/dataStorage/ic_reduce@2x.png';
import Reduce1 from '@/assets/dataStorage/ic_reduce_press@2x.png';
import Local0 from '@/assets/dataStorage/ic_local@2x.png';
import Local1 from '@/assets/dataStorage/ic_local_press@2x.png';
import Large0 from '@/assets/dataStorage/ic_large@2x.png';
import Large1 from '@/assets/dataStorage/ic_large_press@2x.png';
import Small0 from '@/assets/dataStorage/ic_reduce@2x 2.png';
import Small1 from '@/assets/dataStorage/ic_reduce_press@2x 2.png';
import FullScreen0 from '@/assets/dataStorage/ic_full_screen@2x.png';
import FullScreen1 from '@/assets/dataStorage/ic_full_screen_press@2x.png';
// import Cope0 from '@/assets/dataStorage/ic_copy@2x.png';
// import Cope1 from '@/assets/dataStorage/ic_copy_press@2x.png';

export const editImgs = [
	{
		text: '复原',
		img0: GoBack0,
		img1: GoBack1,
		key: 1,
		checked: false,
	},
	{
		text: '展开一层',
		img0: Add0,
		img1: Add1,
		key: 2,
		checked: false,
	},
	{
		text: '收缩一层',
		img0: Reduce0,
		img1: Reduce1,
		key: 3,
		checked: false,
	},
	{
		text: '定位',
		img0: Local0,
		img1: Local1,
		key: 4,
		checked: false,
	},
	{
		text: '放大',
		img0: Large0,
		img1: Large1,
		key: 5,
		checked: false,
	},
	{
		text: '缩小',
		img0: Small0,
		img1: Small1,
		key: 6,
		checked: false,
	},
	{
		text: '后退',
		key: 7,
		icon: 'icon-ic_chevron_left',
		checked: false,
	},
	{
		text: '前进',
		key: 8,
		icon: 'icon-ic_chevron_right',
		checked: false,
	},
	// {
	// 	text: '全部收缩',
	// 	key: 9,
	// 	icon: 'icon-ic_fullscreen_exit',
	// 	checked: false,
	// },
	{
		text: '全屏',
		img0: FullScreen0,
		img1: FullScreen1,
		key: 10,
		checked: false,
	},
];

import iconImgADS from '@/assets/dataStorage/ic_blue@2x.png';
import iconImgDWS from '@/assets/dataStorage/ic_cyan@2x.png';
import iconImgDWD from '@/assets/dataStorage/ic_green@2x.png';
import iconImgDIM from '@/assets/dataStorage/ic_purple@2x.png';
import iconImgODS from '@/assets/dataStorage/ic_yellow@2x.png';


import iconImgADS1 from '@/assets/dataStorage/ic_data_blue@2x.png';
import iconImgDWS1 from '@/assets/dataStorage/ic_data_cyan@2x.png';
import iconImgDWD1 from '@/assets/dataStorage/ic_data_green@2x.png';
import iconImgDIM1 from '@/assets/dataStorage/ic_data_purple@2x.png';
import iconImgODS1 from '@/assets/dataStorage/ic_data_yellow@2x.png';

import iconImgADS2 from '@/assets/dataStorage/ic_double_blue@2x.png';
import iconImgDWS2 from '@/assets/dataStorage/ic_double_cyan@2x.png';
import iconImgDWD2 from '@/assets/dataStorage/ic_double_green@2x.png';
import iconImgDIM2 from '@/assets/dataStorage/ic_double_purple@2x.png';
import iconImgODS2 from '@/assets/dataStorage/ic_double_yellow@2x.png';

import img1 from '@/assets/dataStorage/ic_green@2x.png';
import img2 from '@/assets/dataStorage/ic_data_green@2x.png';
export const editExplain = [
	{
		id: 1,
		img: img1,
		label: '聚焦的表',
	},
	{
		id: 2,
		img: img2,
		label: '导出的表',
	},
];

export const layerList = [
	{
		id: 0,
		label: 'API',
		boxStyle: 'box0',
	},
	{
		id: 1,
		label: 'ADS',
		boxStyle: 'box1',
	},
	{
		id: 2,
		label: 'DWS',
		boxStyle: 'box2',
	},
	{
		id: 3,
		label: 'DWD',
		boxStyle: 'box3',
	},
	{
		id: 4,
		label: 'DIM',
		boxStyle: 'box4',
	},
	{
		id: 5,
		label: 'ODS',
		boxStyle: 'box5',
	},
];

// 文本长度省略限制
function fittingString(G6, str, maxWidth, fontSize) {
	const ellipsis = '...';
	const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
	let currentWidth = 0;
	let res = str;
	const pattern = new RegExp('[\u4E00-\u9FA5]+');
	str.split('').forEach((letter, i) => {
		if (currentWidth > maxWidth - ellipsisLength) return;
		if (pattern.test(letter)) {
			currentWidth += fontSize;
		} else {
			currentWidth += G6.Util.getLetterWidth(letter, fontSize);
		}
		if (currentWidth > maxWidth - ellipsisLength) {
			res = `${str.substr(0, i)}${ellipsis}`;
		}
	});
	return res;
}
// G6基础配置
export const options = {
	container: 'graph', // 指定画布容器
	layout: {
		type: 'dagre',
		rankdir: 'BT',
		nodesep: 20, //节点间距（px）。在rankdir 为 'TB' 或 'BT' 时是节点的水平间距；在rankdir 为 'LR' 或 'RL' 时代表节点的竖直方向间距
		ranksep: 40, // 层间距（px）。在rankdir 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在rankdir 为 'LR' 或 'RL' 时代表水平方向相邻层间距
	},
	width: 1872,
	height: 669,
	modes: {
		default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
	},
	defaultNode: {
		size: [120, 30],
		labelCfg: {
			style: {
				fill: '#666',
				fontSize: 14,
				position: 'center',
			},
		},
		anchorPoints: [
			[0.5, 0],
			[0.5, 1],
		],
		style: {
			fill: '#E9F7FF',
			stroke: '#1E8FFF',
			cursor: 'pointer',
			radius: 2,
		},
	},
	defaultEdge: {
		type: 'polyline',
		style: {
			lineDash: [2, 2],
			radius: 4,
			stroke: '#A2B0C6',
			border: 'dotted',
			endArrow: {
				d: 1,
				fill: '#fff',
				stroke: '#A2B0C6',
				lineDash: [0],
			},
		},
	},
};
// 获取图标
function getImg(cfg, isSigin) {
	let modelLayer = cfg.modelLayer;
	if (modelLayer.includes('SYNC')) {
		if (modelLayer === 'DWS_SYNC') {
			return isSigin ? iconImgDWS2 : iconImgDWS1;
		} else if (modelLayer === 'DWD_SYNC') {
			return isSigin ? iconImgDWD2 : iconImgDWD1;
		} else if (modelLayer === 'DIM_SYNC') {
			return isSigin ? iconImgDIM2 : iconImgDIM1;
		} else if (modelLayer === 'ODS_SYNC') {
			return isSigin ? iconImgODS2 : iconImgODS1;
		} else if (modelLayer === 'ADS_SYNC') {
			return isSigin ? iconImgADS2 : iconImgADS1;
		}
	} else {
		if (isSigin) {
			if (modelLayer === 'ADS') {
				return iconImgADS;
			} else if (modelLayer === 'DWS') {
				return iconImgDWS;
			} else if (modelLayer === 'DWD') {
				return iconImgDWD;
			} else if (modelLayer === 'DIM') {
				return iconImgDIM;
			} else if (modelLayer === 'ODS') {
				return iconImgODS;
			}
		}
		return null;
	}
}
// 绘制长方形节点函数
function handleDrawShape(G6, cfg, group, isSign) {
	const shape = group.addShape('rect', {
		attrs: {
			x: -60,
			y: -15,
			width: cfg.size[0],
			height: cfg.size[1],
			radius: 2,
			stroke: cfg.style.stroke,
			fill: cfg.style.fill,
			cursor: 'pointer',
		},
		name: 'main-box',
		draggable: true,
	});
	group.addShape('text', {
		attrs: {
			x: 0,
			y: 6,
			textAlign: 'center',
			text: fittingString(G6, cfg.name, 100, 14),
			fill: '#666',
			cursor: 'pointer',
		},
		name: 'path-shape',
		draggable: true,
	});
	if (cfg.modelLayer.includes('SYNC') && isSign) {
		group.addShape('image', {
			attrs: {
				x: 36,
				y: -15,
				height: 12,
				width: 24,
				img: getImg(cfg, isSign),
			},
			name: 'node-icon',
		});
	} else {
		group.addShape('image', {
			attrs: {
				x: 44,
				y: -15,
				height: 16,
				width: 16,
				img: getImg(cfg, isSign),
			},
			name: 'node-icon',
		});
	}
	return shape;
}

// 自定义标记node
export function creatSignNode(G6) {
	G6.registerNode(
		'signNode',
		{
			drawShape: function(cfg, group) {
				return handleDrawShape(G6, cfg, group, true);
			},
		},
		'rect'
	);
}
// 自定义普通node
export function creatRectNode(G6) {
	G6.registerNode(
		'rectNode',
		{
			drawShape: function(cfg, group) {
				return handleDrawShape(G6, cfg, group, false);
			},
		},
		'rect'
	);
}

import _ from 'lodash';

// 自定义连线
export function creatCustomEdge(G6, layoutList, dataList) {
	G6.registerEdge('customEdge', {
		draw(cfg, group) {
			const startPoint = cfg.startPoint;
			const endPoint = cfg.endPoint;
			let sourceLen = 0;
			let targetLen = 0;
			let sourceIds = [];
			let targetIds = [];
			let dataSource = _.cloneDeep(dataList);
			dataSource.edges.forEach((edge) => {
				if (edge.source === cfg.source) {
					targetIds.push(edge.target);
					sourceLen++;
				}
				if (edge.target === cfg.target) {
					sourceIds.push(edge.source);
					targetLen++;
				}
			});
	
			let len = 0;
			let index = 0;
			let bool = false;
			if (layoutList && layoutList.length) {
				let list = [];
				if (sourceLen > targetLen) {
					len = sourceLen;
					bool = false;
					layoutList.forEach((lists) => {
						lists.forEach((item, i) => {
							if (item.id === cfg.target) {
								list = _.cloneDeep(lists);
							}
						});
					});
					let list1 = [];
					list.forEach((item) => {
						if (targetIds.indexOf(item.id) !== -1) {
							list1.push(item);
						}
					});
					list1.forEach((item, i) => {
						if (item.id === cfg.target) {
							index = i + 1;
						}
					});
				} else {
					len = targetLen;
					bool = true;
					layoutList.forEach((lists) => {
						lists.forEach((item, i) => {
							if (item.id === cfg.source) {
								list = _.cloneDeep(lists);
							}
						});
					});
					let list1 = [];
					list.forEach((item) => {
						if (sourceIds.indexOf(item.id) !== -1) {
							list1.push(item);
						}
					});
					list1.forEach((item, i) => {
						if (item.id === cfg.source) {
							index = i + 1;
						}
					});
				}
			}
			const shape = group.addShape('path', {
				attrs: {
					lineDash: [2, 2],
					radius: 4,
					stroke: cfg.style.stroke,
					border: 'dotted',
					endArrow: {
						path: G6.Arrow.triangle(8, 10, 1),
						d: 1,
						fill: '#fff',
						stroke: '#A2B0C6',
						lineDash: [0],
					},
					path: this.getPath(startPoint, endPoint, index, len, !bool),
				},
				name: 'path-shape',
			});
			return shape;
		},
		// 响应状态变化
		setState(name, value, item) {
			const group = item.getContainer();
			const shape = group.get('children')[0]; // 顺序根据 draw 时确定
			if (name === 'active') {
				shape.attr('border', 'solid');
				shape.attr('lineDash', [0]);
				shape.attr('stroke', '#F6BD16');
				shape.attr('endArrow', {
					path: G6.Arrow.triangle(8, 10, 1),
					d: 1,
					fill: '#fff',
					stroke: '#F6BD16',
					lineDash: [0],
				});
			} else {
				shape.attr('border', 'dotted');
				shape.attr('lineDash', [2, 2]);
				shape.attr('stroke', '#A2B0C6');
				shape.attr('endArrow', {
					path: G6.Arrow.triangle(8, 10, 1),
					d: 1,
					fill: '#fff',
					stroke: '#A2B0C6',
					lineDash: [0],
				});
			}
		},
		getPath(startPoint, endPoint, index, len, bool) {
			if (len <= 3) {
				return [
					['M', startPoint.x, startPoint.y],
					['L', startPoint.x, startPoint.y - (startPoint.y - endPoint.y) / 2],
					['L', endPoint.x, startPoint.y - (startPoint.y - endPoint.y) / 2],
					['L', endPoint.x, endPoint.y],
				];
			} else {
				if (bool) {
					if (len % 2 === 1) {
						let n = (len + 1) / 2;
						// let m = n + 1;
						if (index < n) {
							return [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / n) * index],
								['L', endPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / n) * index],
								['L', endPoint.x, endPoint.y],
							];
						} else if (index > n) {
							return [
								['M', startPoint.x, startPoint.y],
								[
									'L',
									startPoint.x,
									startPoint.y - ((startPoint.y - endPoint.y) / n) * (2 * n - index),
								],
								[
									'L',
									endPoint.x,
									startPoint.y - ((startPoint.y - endPoint.y) / n) * (2 * n - index),
								],
								['L', endPoint.x, endPoint.y],
							];
						}
						return [
							['M', startPoint.x, startPoint.y],
							['L', startPoint.x, startPoint.y - (startPoint.y - endPoint.y) + 20],
							['L', endPoint.x, startPoint.y - (startPoint.y - endPoint.y) + 20],
							['L', endPoint.x, endPoint.y],
						];
					} else {
						let n = len / 2;
						let m = n + 1;
						if (index <= n) {
							return [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / m) * index],
								['L', endPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / m) * index],
								['L', endPoint.x, endPoint.y],
							];
						} else if (index > n) {
							return [
								['M', startPoint.x, startPoint.y],
								[
									'L',
									startPoint.x,
									startPoint.y - ((startPoint.y - endPoint.y) / m) * (2 * n - index),
								],
								[
									'L',
									endPoint.x,
									startPoint.y - ((startPoint.y - endPoint.y) / m) * (2 * n - index),
								],
								['L', endPoint.x, endPoint.y],
							];
						}
					}
				} else {
					if (len % 2 === 1) {
						let n = (len + 1) / 2;
						// let m = n + 1;
						if (index < n) {
							return [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / n) * (n - index)],
								['L', endPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / n) * (n - index)],
								['L', endPoint.x, endPoint.y],
							];
						} else if (index > n) {
							return [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / n) * (index - n)],
								['L', endPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / n) * (index - n)],
								['L', endPoint.x, endPoint.y],
							];
						}
						return [
							['M', startPoint.x, startPoint.y],
							['L', startPoint.x, startPoint.y - 20],
							['L', endPoint.x, startPoint.y - 20],
							['L', endPoint.x, endPoint.y],
						];
					} else {
						let n = len / 2;
						let m = n + 1;
						if (index <= n) {
							return [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / m) * (m - index)],
								['L', endPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / m) * (m - index)],
								['L', endPoint.x, endPoint.y],
							];
						} else if (index > n) {
							return [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / m) * (index - n)],
								['L', endPoint.x, startPoint.y - ((startPoint.y - endPoint.y) / m) * (index - n)],
								['L', endPoint.x, endPoint.y],
							];
						}
					}
				}
			}
		},
	});
}
