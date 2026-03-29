from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from collections import defaultdict, deque

app = FastAPI(title="VectorShift Pipeline API")

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Models ───────────────────────────────────────────────────────────────────

class NodeData(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, float]] = None
    data: Optional[Dict[str, Any]] = None


class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelinePayload(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]


# ─── Helpers ──────────────────────────────────────────────────────────────────

def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """Return True if the directed graph formed by nodes+edges has no cycles (is a DAG)."""
    node_ids = {n.id for n in nodes}
    adjacency: Dict[str, List[str]] = defaultdict(list)
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            adjacency[edge.source].append(edge.target)

    # Kahn's algorithm (topological sort via BFS)
    in_degree: Dict[str, int] = defaultdict(int)
    for node_id in node_ids:
        in_degree.setdefault(node_id, 0)
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            in_degree[edge.target] += 1

    queue = deque(n for n in node_ids if in_degree[n] == 0)
    visited = 0
    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in adjacency[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelinePayload):
    """
    Analyse a pipeline and return:
      - num_nodes
      - num_edges
      - is_dag  (True if the graph contains no cycles)
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag,
    }

