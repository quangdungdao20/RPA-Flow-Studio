import logging
from typing import Dict, List, Any
from collections import defaultdict, deque
from flow_engine.context import ExecutionContext
from flow_engine.nodes.base import BaseNode

logger = logging.getLogger(__name__)

class FlowEngine:
    def __init__(self, nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]):
        self.nodes = {n['id']: n for n in nodes}
        self.edges = edges
        self.adjacency_list = defaultdict(list)
        self.in_degree = {node_id: 0 for node_id in self.nodes}
        self._build_graph()

    def _build_graph(self):
        for edge in self.edges:
            source = edge['source']
            target = edge['target']
            if source in self.nodes and target in self.nodes:
                self.adjacency_list[source].append(target)
                self.in_degree[target] += 1

    def get_execution_order(self) -> List[str]:
        """
        Kahn's algorithm for Topological Sort
        """
        in_deg = self.in_degree.copy()
        queue = deque([node_id for node_id, deg in in_deg.items() if deg == 0])
        order = []

        while queue:
            curr = queue.popleft()
            order.append(curr)
            for neighbor in self.adjacency_list[curr]:
                in_deg[neighbor] -= 1
                if in_deg[neighbor] == 0:
                    queue.append(neighbor)

        if len(order) != len(self.nodes):
            raise ValueError("Cycle detected in flow diagram - cannot execute.")
        return order

    def execute(self, context: ExecutionContext, node_factory) -> ExecutionContext:
        """
        Executes flow from the topological sort order
        """
        try:
            order = self.get_execution_order()
            context.status = "running"
            
            for node_id in order:
                node_data = self.nodes[node_id]
                logger.info(f"Executing node: {node_id} ({node_data.get('type')})")
                
                # Instantiate node using custom factory
                node_instance: BaseNode = node_factory(node_data)
                
                # Execute node
                output = node_instance.execute(context)
                context.set_node_output(node_id, output)
                
            context.status = "success"
        except Exception as e:
            logger.error(f"Flow execution failed: {e}")
            context.status = "failed"
            context.error = str(e)
        finally:
            import time
            context.end_time = time.time()
            
        return context
