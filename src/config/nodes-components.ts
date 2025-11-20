import { InitialNode } from "@/components/initial-node";
import { HttpRequestsNode } from "@/features/executions/components/http-request/node";
import { ManualTriggersNode } from "@/features/triggers/components/manual-trigger/node";
import { NodeType } from "@/generated/prisma";
import type { NodeTypes } from "@xyflow/react";


export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestsNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggersNode,
} as const satisfies NodeTypes;

export type RegisteredNodetype = keyof typeof nodeComponents;

