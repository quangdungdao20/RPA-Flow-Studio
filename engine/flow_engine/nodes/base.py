from abc import ABC, abstractmethod
from typing import Any, Dict
from flow_engine.context import ExecutionContext

class BaseNode(ABC):
    def __init__(self, node_id: str, node_type: str, configuration: Dict[str, Any]):
        self.node_id = node_id
        self.node_type = node_type
        self.configuration = configuration

    @abstractmethod
    def execute(self, context: ExecutionContext) -> Any:
        """
        Execute the node logic.
        Should mutate context or return outputs.
        """
        pass
