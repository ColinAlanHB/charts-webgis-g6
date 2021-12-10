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

import signImg from '@/assets/dataStorage/ic_blue@2x.png';
import detailImg from '@/assets/dataQuality/ic_link@3x.png';

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
	{
		id: 6,
		label: 'TMP',
		boxStyle: 'box6',
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

import _ from 'lodash';

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
		text: '全屏',
		img0: FullScreen0,
		img1: FullScreen1,
		key: 10,
		checked: false,
	},
];

// G6 节点、线、事件配置
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
export const options = {
	container: 'bloodGragh', // 指定画布容器
	layout: {
		type: 'dagre',
		rankdir: 'LR',
		nodesep: 55,
		ranksep: 40,
	},
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
			[1, 0.5],
			[0, 0.5],
		],
		style: {
			fill: '#EAF2FF',
			stroke: '#3582FF',
			cursor: 'pointer',
			radius: 2,
		},
	},
	defaultEdge: {
		type: 'polyline',
		style: {
			radius: 4,
			stroke: '#A2B0C6',
			border: 'dotted',
			endArrow: {
				// path: G6.Arrow.triangle(8, 10, 1),
				d: 1,
				fill: '#fff',
				stroke: '#A2B0C6',
			},
		},
	},
};

function getPath(cfg) {
	const path = [
		['M', -60, 15],
		['L', 60, 15],
		['Z'], // 封闭
	];
	return path;
}

function getImg(cfg, focus) {
	if (focus) {
		if (cfg.name.includes('ads')) {
			return iconImgADS;
		} else if (cfg.name.includes('dws')) {
			return iconImgDWS;
		} else if (cfg.name.includes('dwd')) {
			return iconImgDWD;
		} else if (cfg.name.includes('dim')) {
			return iconImgDIM;
		} else if (cfg.name.includes('ods')) {
			return iconImgODS;
		}
		return iconImgADS;
	} else {
		if (cfg.name.includes('ads')) {
			return iconImgADS1;
		} else if (cfg.name.includes('dws')) {
			return iconImgDWS1;
		} else if (cfg.name.includes('dwd')) {
			return iconImgDWD1;
		} else if (cfg.name.includes('dim')) {
			return iconImgDIM1;
		} else if (cfg.name.includes('ods')) {
			return iconImgODS1;
		}
		return iconImgADS1;
	}
}

function drawShape(G6, cfg, group, maxLen) {
	if (cfg.colNameList && cfg.colNameList.length) {
		let len = 1;
		const shape = group.addShape('rect', {
			attrs: {
				x: -60,
				y: -15,
				width: 120,
				height: 30 * (cfg.colNameList.length > maxLen ? maxLen + 1 : cfg.colNameList.length + 1),
				cursor: 'pointer',
			},
			name: 'main-box',
			draggable: true,
		});
		group.addShape('rect', {
			attrs: {
				x: -60,
				y: -15,
				width: 120,
				height: 30,
				// fill: '#eaf2ff',
				fill: cfg.style.fill,
				cursor: 'pointer',
			},
			name: 'table-box',
			draggable: true,
		});
		if (cfg.focus || cfg.modelLayer.includes('EXPORT')) {
			group.addShape('image', {
				attrs: {
					x: 44,
					y: -15,
					height: 16,
					width: 16,
					img: getImg(cfg, cfg.focus),
				},
				name: 'node-icon',
			});
		}
		group.addShape('text', {
			attrs: {
				x: 0,
				y: 6,
				textAlign: 'center',
				text: fittingString(G6, cfg.name, 100, 14),
				fill: '#666',
				cursor: 'pointer',
			},
			name: 'table-name',
			draggable: true,
		});
		group.addShape('path', {
			attrs: {
				path: getPath(cfg),
				// stroke: '#3582FF',
				stroke: cfg.style.stroke,
				cursor: 'pointer',
			},
			name: 'main-line',
			draggable: true,
		});
		cfg.colNameList.forEach((item, index) => {
			if (len < maxLen) {
				group.addShape('rect', {
					attrs: {
						x: -60,
						y: 16 + index * 30,
						width: 120,
						height: 30,
						fill: '#fff',
						cursor: 'pointer',
					},
					name: item.index + 'box',
					draggable: true,
				});
				group.addShape('text', {
					attrs: {
						x: 0,
						y: 36 + index * 30,
						textAlign: 'center',
						text: fittingString(G6, item.value, 100, 14),
						fill: item.isInfluence ? '#4285F4' : '#666',
						cursor: 'pointer',
					},
					name: item.index + 'text',
					draggable: true,
				});
				len++;
			} else if (len === maxLen) {
				group.addShape('rect', {
					attrs: {
						x: -60,
						y: 16 + index * 30,
						width: 120,
						height: 30,
						// fill: '#F1F6FD',
						cursor: 'pointer',
					},
					name: 'open-text',
					draggable: true,
				});
				group.addShape('text', {
					attrs: {
						x: 0,
						y: 36 + index * 30,
						textAlign: 'center',
						text: fittingString(G6, '展开全部 + ', 100, 14),
						fill: '#666',
						cursor: 'pointer',
					},
					name: 'open-text',
					draggable: true,
				});
				group.addShape('rect', {
					attrs: {
						x: -60,
						y: 16 + index * 30,
						width: 120,
						height: 30,
						fill: '#F1F6FD',
						opacity: 0,
						cursor: 'pointer',
					},
					name: 'open-rect',
					draggable: true,
				});
				len++;
			}
		});
		group.addShape('rect', {
			attrs: {
				x: -60,
				y: -15,
				width: 120,
				height: 30 * (cfg.colNameList.length > maxLen ? len : cfg.colNameList.length + 1),
				radius: 2,
				stroke: cfg.style.stroke,
				cursor: 'pointer',
			},
			name: 'main-box',
			draggable: true,
		});
		return shape;
	} else {
		if (cfg.focus) {
			group.addShape('rect', {
				attrs: {
					x: -60,
					y: -15,
					width: 120,
					height: 30,
					// fill: '#eaf2ff',
					// stroke: '#3582FF',
					fill: cfg.style.fill,
					stroke: cfg.style.stroke,
					radius: 2,
					cursor: 'pointer',
				},
				name: 'table-box',
				draggable: true,
			});
			group.addShape('image', {
				attrs: {
					x: 44,
					y: -15,
					height: 16,
					width: 16,
					img: signImg,
				},
				name: 'node-icon',
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
				name: 'table-name',
				draggable: true,
			});
			return group;
		} else {
			const shape = group.addShape('rect', {
				attrs: {
					x: -60,
					y: -15,
					width: 120,
					height: 30,
					fill: cfg.style.fill,
					stroke: cfg.style.stroke,
					radius: 2,
					cursor: 'pointer',
				},
				name: 'table-box',
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
				name: 'table-name',
				draggable: true,
			});
			return shape;
		}
	}
}

function afterDraw(cfg, group, signObj, isSign, maxLen) {
	let elArr = group.cfg.children;
	if (cfg.colNameList && cfg.colNameList.length) {
		cfg.colNameList.forEach((item, index) => {
			let elBox = elArr.find((i) => i.cfg.name === item.index + 'box');
			let elText = elArr.find((i) => i.cfg.name === item.index + 'text');
			if (elBox && elText) {
				if (cfg.modelLayer !== 'API') {
					elBox.on('click', () => {
						signObj.isExtend = false;
						signObj.signNodeName = cfg.name;
						signObj.signFiledName = elBox.attrs.name ? elBox.attrs.name : item.value;
						signObj.showLineDetail = isSign;
					});
					elText.on('click', () => {
						signObj.isExtend = false;
						signObj.signNodeName = cfg.name;
						signObj.signFiledName = elBox.attrs.name ? elBox.attrs.name : item.value;
						signObj.showLineDetail = isSign;
					});
				}
				elBox.on('contextmenu', () => {
					signObj.filedValue = item.value;
				});
				elBox.on('mouseover', () => {
					signObj.isSign = isSign;
					elBox.attr('fill', ' #F1F6FD');
					signObj.isExtend = true;
					signObj.textName = elBox.attrs.name ? elBox.attrs.name : item.value;
				});
				elBox.on('mouseout', () => {
					signObj.isSign = false;
					elBox.attr('fill', '#fff');
					signObj.isExtend = true;
					signObj.textName = undefined;
				});
				elText.on('contextmenu', () => {
					signObj.filedValue = item.value;
				});
				elText.on('mouseover', () => {
					signObj.isSign = isSign;
					elBox.attr('fill', ' #F1F6FD');
					signObj.isExtend = true;
					signObj.textName = elText.attrs.name ? elText.attrs.name : item.value;
				});
				elText.on('mouseout', () => {
					signObj.isSign = false;
					elBox.attr('fill', '#fff');
					signObj.isExtend = true;
					signObj.textName = undefined;
				});
			}
		});
		if (cfg.colNameList.length >= maxLen) {
			let el = elArr.find((i) => i.cfg.name === 'open-rect');
			if (el) {
				el.on('click', () => {
					signObj.isExtend = true;
					signObj.showOpenAll = true;
					signObj.isSign = isSign;
					signObj.signNodeName = cfg.name;
					signObj.colNameList = _.cloneDeep(cfg.colNameList);
					signObj.showLineDetail = isSign;
					signObj.modelLayer = cfg.modelLayer;
				});
				el.on('contextmenu', () => {
					signObj.filedValue = '展开全部';
				});
				el.on('mouseover', () => {
					signObj.isExtend = true;
					signObj.textName = '展开全部';
				});
				el.on('mouseout', () => {
					signObj.isExtend = true;
					signObj.textName = undefined;
				});
			}
		}
	}
	let elTBox = elArr.find((i) => i.cfg.name === 'table-box');
	let elTName = elArr.find((i) => i.cfg.name === 'table-name');
	if (elTBox && elTName) {
		elTBox.on('contextmenu', () => {
			signObj.filedValue = undefined;
		});
		elTName.on('contextmenu', () => {
			signObj.filedValue = undefined;
		});
	}
}

function unpdate(G6, cfg, node, signObj, isSign, maxLen) {
	const group = node.getContainer();
	const elArr = group.cfg.children;
	if (cfg.colNameList && cfg.colNameList.length) {
		cfg.colNameList.forEach((item, index) => {
			let elBox = elArr.find((i) => i.cfg.name === item.index + 'box');
			let elText = elArr.find((i) => i.cfg.name === item.index + 'text');
			if (elText && elBox) {
				elText.attr('text', fittingString(G6, item.value, 100, 14));
				elText.attr('fill', item.isInfluence ? '#4285F4' : '#666');
				elBox.attr('name', item.value);
				elText.attr('name', item.value);
			}
		});
	}
}
// 标记node
export function creatSignNode(G6, signObj) {
	G6.registerNode(
		'signNode',
		{
			drawShape: function(cfg, group) {
				return drawShape(G6, cfg, group, 10);
			},
			afterDraw: (cfg, group) => {
				afterDraw(cfg, group, signObj, true, 10);
			},
			update: (cfg, node) => {
				unpdate(G6, cfg, node, signObj, true, 10);
			},
		},
		'rect'
	);
}

export function creatRectNode(G6, signObj) {
	G6.registerNode(
		'rectNode',
		{
			drawShape: function(cfg, group) {
				return drawShape(G6, cfg, group, 5);
			},
			afterDraw: (cfg, group) => {
				afterDraw(cfg, group, signObj, false, 5);
			},
			update: (cfg, node) => {
				unpdate(G6, cfg, node, signObj, false, 5);
			},
		},
		'rect'
	);
}

export function creatCustomEdge(G6, edgeObj, dataList, signObj) {
	G6.registerEdge('customEdge', {
		draw(cfg, group) {
			const startPoint = cfg.startPoint;
			const endPoint = cfg.endPoint;
			let path = [
				['M', startPoint.x, startPoint.y],
				['L', startPoint.x + 35, startPoint.y],
				['Q', startPoint.x + 35, startPoint.y, startPoint.x + 35, endPoint.y],
				['L', endPoint.x, endPoint.y],
			];
			if (Math.abs(startPoint - endPoint) <= 5 || dataList.edges.length === 1) {
				path = [
					['M', startPoint.x, startPoint.y],
					['L', endPoint.x, endPoint.y],
				];
			}
			const shape = group.addShape('path', {
				attrs: {
					radius: 4,
					stroke: cfg.style.stroke,
					border: 'dotted',
					path,
					endArrow: {
						path: G6.Arrow.triangle(8, 10, 1),
						d: 1,
						fill: '#fff',
						stroke: '#A2B0C6',
					},
				},
				name: 'path-shape',
			});
			if (cfg.detailFlag) {
				group.addShape('image', {
					attrs: {
						height: 20,
						width: 20,
						x: startPoint.x + 45,
						y: endPoint.y - 10,
						img: detailImg,
						opacity: cfg.detailFlag ? 1 : 0,
						cursor: 'pointer',
					},
					name: 'icon-detail',
				});
			}
			return shape;
		},
		update: undefined,
		afterDraw(cfg, group) {
			let elArr = group.cfg.children;
			let el = elArr.find((i) => i.cfg.name === 'icon-detail');
			if (el) {
				el.on('click', () => {
					edgeObj.showDetail = true;
					edgeObj.sourceNodeId = cfg.source;
					edgeObj.targetNodeId = cfg.target;
				});
				el.on('mouseover', () => {
					if (cfg.detailFlag) {
						signObj.textName = '变更详情';
					} else {
						signObj.textName = undefined;
					}
				});
				el.on('mouseout', () => {
					signObj.textName = undefined;
				});
			}
		},
		// 响应状态变化
		setState(name, value, node) {
			const group = node.getContainer();
			const shape = group.get('children')[0]; // 顺序根据 draw 时确定
			if (name === 'active') {
				shape.attr('border', 'solid');
				shape.attr('stroke', '#F6BD16'); //#F6BD16
				shape.attr('endArrow', {
					path: G6.Arrow.triangle(8, 10, 1),
					d: 1,
					fill: '#fff',
					stroke: '#F6BD16',
				});
			} else {
				shape.attr('border', 'dotted');
				shape.attr('stroke', '#A2B0C6');
				shape.attr('endArrow', {
					path: G6.Arrow.triangle(8, 10, 1),
					d: 1,
					fill: '#fff',
					stroke: '#A2B0C6',
				});
			}
		},
	});
}
