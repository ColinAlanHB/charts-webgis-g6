const lineWidth = 8;
function getTwoTurnEdgeOption(color, isVertical, width = lineWidth) {
	return {
		draw(cfg, group) {
			let isAnimate = false;
			if (cfg.type.indexOf('animate') > 0) {
				isAnimate = true;
			}
			const startPoint = cfg.startPoint;
			const endPoint = cfg.endPoint;
			const shape = group.addShape('path', {
				attrs: {
					stroke: isAnimate ? '#ffffff' : color,
					lineWidth: isAnimate ? 2 : width,
					path: isVertical
						? [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, endPoint.y / 2 + (1 / 2) * startPoint.y], // 三分之一处
								['L', endPoint.x, endPoint.y / 2 + (1 / 2) * startPoint.y], // 三分之二处
								['L', endPoint.x, endPoint.y],
						  ]
						: [
								['M', startPoint.x, startPoint.y],
								['L', endPoint.x / 2 + (1 / 2) * startPoint.x, startPoint.y], // 三分之一处
								['L', endPoint.x / 2 + (1 / 2) * startPoint.x, endPoint.y], // 三分之二处
								['L', endPoint.x, endPoint.y],
						  ],
				},
				name: 'path-shape',
			});
			return shape;
		},
		afterDraw,
	};
}

function getOneTurnEdgeOption(color, isVertical) {
	return {
		draw(cfg, group) {
			const startPoint = cfg.startPoint;
			const endPoint = cfg.endPoint;
			let isAnimate = false;
			if (cfg.type.indexOf('animate') > 0) {
				isAnimate = true;
			}
			const shape = group.addShape('path', {
				attrs: {
					stroke: isAnimate ? '#ffffff' : color,
					lineWidth: isAnimate ? 2 : lineWidth,
					path: isVertical
						? [
								['M', startPoint.x, startPoint.y],
								['L', startPoint.x, endPoint.y], // 三分之一处
								['L', endPoint.x, endPoint.y],
						  ]
						: [
								['M', startPoint.x, startPoint.y],
								['L', endPoint.x, startPoint.y], // 三分之一处
								['L', endPoint.x, endPoint.y],
						  ],
				},
				name: 'path-shape',
			});
			return shape;
		},
		afterDraw,
	};
}
function getEdgeOption(color) {
	return {
		draw(cfg, group) {
			let isAnimate = false;
			if (cfg.type.indexOf('animate') > 0) {
				isAnimate = true;
			}
			const startPoint = cfg.startPoint;
			const endPoint = cfg.endPoint;
			const shape = group.addShape('path', {
				attrs: {
					stroke: isAnimate ? '#ffffff' : color,
					lineWidth: isAnimate ? 2 : lineWidth,
					path: [
						['M', startPoint.x, startPoint.y],
						['L', endPoint.x, endPoint.y],
					],
				},
				name: 'path-shape',
			});
			return shape;
		},
		afterDraw,
	};
}

const lineDash = [5, 3];
function afterDraw(cfg, group) {
	if (cfg.type.indexOf('animate') > 0) {
		const shape = group.get('children')[0];
		let index = 0;
		shape.animate(
			() => {
				index++;
				if (index > 7) {
					index = 0;
				}
				const res = {
					lineDash,
					lineDashOffset: -index,
				};
				return res;
			},
			{
				repeat: true,
				duration: 3000,
			}
		);
	}
}

export function registerEdge(G6) {

	G6.registerEdge('path-across-twoturn-blue', getTwoTurnEdgeOption('#93D1F6', false));
	G6.registerEdge('path-across-twoturn-green', getTwoTurnEdgeOption('#8DDBCA', false));
	G6.registerEdge('path-across-twoturn-animate', getTwoTurnEdgeOption('#ffffff', false));

	G6.registerEdge('path-vertical-twoturn-blue', getTwoTurnEdgeOption('#93D1F6', true));
	G6.registerEdge('path-vertical-twoturn-green', getTwoTurnEdgeOption('#8DDBCA', true));
	G6.registerEdge('path-vertical-twoturn-animate', getTwoTurnEdgeOption('#ffffff', true));

	G6.registerEdge('path-vertical-twoturn-green-small', getTwoTurnEdgeOption('#8DDBCA', true, 6));
	G6.registerEdge('path-vertical-twoturn-animate-small', getTwoTurnEdgeOption('#ffffff', true, 6));

	G6.registerEdge('path-across-oneturn-blue', getOneTurnEdgeOption('#93D1F6', false));
	G6.registerEdge('path-across-oneturn-grey', getOneTurnEdgeOption('#C9D3E1', false));
	G6.registerEdge('path-across-oneturn-green', getOneTurnEdgeOption('#8DDBCA', false));
	G6.registerEdge('path-across-oneturn-animate', getOneTurnEdgeOption('#ffffff', false));

	G6.registerEdge('path-vertical-oneturn-blue', getOneTurnEdgeOption('#93D1F6', true));
	G6.registerEdge('path-vertical-oneturn-green', getOneTurnEdgeOption('#8DDBCA', true));
	G6.registerEdge('path-vertical-oneturn-animate', getOneTurnEdgeOption('#ffffff', true));

	G6.registerEdge('path-blue', getEdgeOption('#93D1F6'));
	G6.registerEdge('path-green', getEdgeOption('#8DDBCA'));
	G6.registerEdge('path-animate', getEdgeOption('#ffffff'));
}
