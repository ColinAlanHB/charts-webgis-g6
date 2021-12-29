<template>
	<div class="dataPlan">
		<div class="dataPlan-content">
			<div id="container" ref="container"></div>
		</div>
	</div>
</template>

<script>
import G6 from '@antv/g6';
import { dataSource } from './dataSource';

export default {
	data() {
		return {
			screenWidth: 0,
			screenHeight: 0,
			graph: {},
		};
	},
	mounted() {
		G6.registerNode('dom-node', {
			draw: (cfg, group) => {
				//最外面的那层
				const shape = group.addShape('rect', {
					attrs: {
						x: 0,
						y: 0,
						width: cfg.size[0],
						height: cfg.size[1],
						fill: cfg.style.fill || '#F4F6F9', //填充色
						stroke: cfg.style.stroke || '#E2EAF1', //边框
						radius: 4,
						cursor: 'pointer',
					},
					name: 'dom-node',
				});
				//里面的那层
				group.addShape('image', {
					attrs: {
						x: cfg.textX[0] || 161,
						y: cfg.textY[0] || 10,
						width: 65,
						height: 65,
						img: cfg.img,
						cursor: 'pointer',
					},
				});
				//文字
				group.addShape('text', {
					attrs: {
						x: cfg.textX[1] || 167,
						y: cfg.textY[1] || 90,
						text: cfg.label,
						fill: cfg.labelCfg.style.fill || '#333333',
						fontFamily: cfg.labelCfg.style.fontFamily || 'PingFangSC-Regular',
						fontSize: 14,
						letterSpacing: 0,
						cursor: 'pointer',
					},
				});
				group.addShape('text', {
					attrs: {
						x: cfg.textX[2] || 125,
						y: cfg.textY[2] || 114,
						text: cfg.description,
						fill: '#999999',
						fontFamily: 'PingFangSC-Regular',
						fontSize: cfg.labelCfg.style.fontSize || 12,
						lineHeight: cfg.labelCfg.style.lineHeight || 18,
						letterSpacing: 0,
						cursor: 'pointer',
					},
				});
				return shape;
			},

			setState(name, value, item) {
				const group = item.getContainer();
				const rect = group.get('children')[0];
				const label = group.get('children')[2];
				if (name === 'shadow') {
					if (value) {
						rect.attr('shadowOffsetX', '0');
						rect.attr('shadowOffsetY', '4');
						rect.attr('shadowBlur', '20');
						rect.attr('shadowColor', 'rgba(0,0,0,0.08)');
						rect.attr('fill', '#fff');
						rect.attr('stroke', '#fff');
						label.attr('fill', '#4285F4');
					} else {
						rect.attr('shadowOffsetX', '0');
						rect.attr('shadowOffsetY', '0');
						rect.attr('shadowBlur', '0');
						rect.attr('shadowColor', 'rgba(0,0,0,0)');
						rect.attr('fill', '#F4F6F9');
						rect.attr('stroke', '#E2EAF1');
						label.attr('fill', '#333333');
					}
				}
			},
		});

		const graph = new G6.Graph({
			container: 'container',
			width: 1056,
			height: 490,
			groupByTypes: false,
			defaultNode: {
				size: [1251, 139],
				style: {
					fill: '#E4EAF2', //填充色
					stroke: '#E4EAF2', //边框
					radius: 4,
					cursor: 'pointer',
				},
				labelCfg: {
					style: {
						fill: '#666666',
						fontSize: 14,
						fontFamily: 'PingFangSC-Regular',
						letterSpacing: 0,
					},
				},
			},
			defaultEdge: {
				style: {
					endArrow: {
						path: 'M 0,0 L 6,3 L 6,-3 Z',
						fill: '#B5B5B3',
						stroke: '#B5B5B3',
					},
				},
			},
		});
		graph.data(dataSource);
		graph.render();

		let nodes = graph.getNodes(); //获取所有节点
		const edges = graph.getEdges();
		//提高边的层级
		edges.forEach((edge) => {
			edge.toFront();
		});

		//节点事件
		graph.on('node:mouseenter', (ev) => {
			const node = ev.item;
			if (
				node._cfg.model.type == 'rect' ||
				(node._cfg.model.type == 'dom-node' && node._cfg.model.parentId)
			) {
				const parentId = node._cfg.model.parentId;
				nodes.map((v) => {
					if (v._cfg.id == parentId) {
						graph.setItemState(v, 'shadow', true);
					}
				});
			} else {
				//如果就是自定义的dom-node节点，即node1-node5
				graph.setItemState(node, 'shadow', true);
			}
		});
		graph.on('node:mouseleave', (ev) => {
			const node = ev.item;
			if (
				node._cfg.model.type == 'rect' ||
				(node._cfg.model.type == 'dom-node' && node._cfg.model.parentId)
			) {
				const parentId = node._cfg.model.parentId;
				nodes = graph.getNodes(); //获取所有节点
				nodes.map((v) => {
					if (v._cfg.id == parentId) {
						graph.setItemState(v, 'shadow', false);
					}
				});
			} else {
				//如果就是自定义的dom-node节点，即node1-5
				graph.setItemState(node, 'shadow', false);
			}
		});
		this.graph = graph;
	},
	methods: {
	},
	computed: {
	},
	watch: {
	},
};
</script>

<style lang="less" scoped>
.dataPlan {
	height: auto;
	padding: 12px;

	&-content {
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: calc(100vh - 94px);
		position: relative;

		#container {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.shelter {
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-radius: 4px;
			position: absolute;
			top: 0px;
			left: 0px;
		}
	}
}
</style>
