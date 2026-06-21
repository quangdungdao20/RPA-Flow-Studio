import time
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class ExecutionContext(BaseModel):
    execution_id: str
    variables: Dict[str, Any] = Field(default_factory=dict)
    node_outputs: Dict[str, Any] = Field(default_factory=dict)
    status: str = "pending"
    error: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    start_time: float = Field(default_factory=time.time)
    end_time: Optional[float] = None

    def get(self, key: str, default: Any = None) -> Any:
        # Check in variables first, then node outputs
        if key in self.variables:
            return self.variables[key]
        return self.node_outputs.get(key, default)

    def set_variable(self, key: str, value: Any):
        self.variables[key] = value

    def set_node_output(self, node_id: str, output: Any):
        self.node_outputs[node_id] = output
