import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ActivityCreated,
  ActivityDeleted,
  ActivityUpdated,
  ParticipantAdded,
  ParticipantRemoved
} from "../generated/Contract/Contract"

export function createActivityCreatedEvent(
  activityId: BigInt,
  activity: ethereum.Tuple
): ActivityCreated {
  let activityCreatedEvent = changetype<ActivityCreated>(newMockEvent())

  activityCreatedEvent.parameters = new Array()

  activityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "activityId",
      ethereum.Value.fromUnsignedBigInt(activityId)
    )
  )
  activityCreatedEvent.parameters.push(
    new ethereum.EventParam("activity", ethereum.Value.fromTuple(activity))
  )

  return activityCreatedEvent
}

export function createActivityDeletedEvent(
  activityId: BigInt,
  user: Address
): ActivityDeleted {
  let activityDeletedEvent = changetype<ActivityDeleted>(newMockEvent())

  activityDeletedEvent.parameters = new Array()

  activityDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "activityId",
      ethereum.Value.fromUnsignedBigInt(activityId)
    )
  )
  activityDeletedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return activityDeletedEvent
}

export function createActivityUpdatedEvent(
  activityId: BigInt,
  activity: ethereum.Tuple
): ActivityUpdated {
  let activityUpdatedEvent = changetype<ActivityUpdated>(newMockEvent())

  activityUpdatedEvent.parameters = new Array()

  activityUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "activityId",
      ethereum.Value.fromUnsignedBigInt(activityId)
    )
  )
  activityUpdatedEvent.parameters.push(
    new ethereum.EventParam("activity", ethereum.Value.fromTuple(activity))
  )

  return activityUpdatedEvent
}

export function createParticipantAddedEvent(
  activityId: BigInt,
  participant: Address
): ParticipantAdded {
  let participantAddedEvent = changetype<ParticipantAdded>(newMockEvent())

  participantAddedEvent.parameters = new Array()

  participantAddedEvent.parameters.push(
    new ethereum.EventParam(
      "activityId",
      ethereum.Value.fromUnsignedBigInt(activityId)
    )
  )
  participantAddedEvent.parameters.push(
    new ethereum.EventParam(
      "participant",
      ethereum.Value.fromAddress(participant)
    )
  )

  return participantAddedEvent
}

export function createParticipantRemovedEvent(
  activityId: BigInt,
  participant: Address
): ParticipantRemoved {
  let participantRemovedEvent = changetype<ParticipantRemoved>(newMockEvent())

  participantRemovedEvent.parameters = new Array()

  participantRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "activityId",
      ethereum.Value.fromUnsignedBigInt(activityId)
    )
  )
  participantRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "participant",
      ethereum.Value.fromAddress(participant)
    )
  )

  return participantRemovedEvent
}
