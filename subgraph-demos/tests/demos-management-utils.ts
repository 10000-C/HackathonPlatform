import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { DemoSubmitted } from "../generated/DemosManagement/DemosManagement"

export function createDemoSubmittedEvent(
  activityId: BigInt,
  demo: ethereum.Tuple
): DemoSubmitted {
  let demoSubmittedEvent = changetype<DemoSubmitted>(newMockEvent())

  demoSubmittedEvent.parameters = new Array()

  demoSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "activityId",
      ethereum.Value.fromUnsignedBigInt(activityId)
    )
  )
  demoSubmittedEvent.parameters.push(
    new ethereum.EventParam("demo", ethereum.Value.fromTuple(demo))
  )

  return demoSubmittedEvent
}
