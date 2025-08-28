import { BigInt, Bytes, store } from "@graphprotocol/graph-ts"
import {
  ActivitiesManagement,
  ActivityCreated,
  ActivityDeleted,
  ActivityUpdated,
  ParticipantAdded,
  ParticipantRemoved
} from "../generated/ActivitiesManagement/ActivitiesManagement"
import { Activity } from "../generated/schema"

export function handleActivityCreated(event: ActivityCreated): void {
  // Entities can be loaded from the store using an ID; this ID
  // needs to be unique across all entities of the same type
  const entity = new Activity(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.activityId))
  )
  



  // Entity fields can be set based on event parameters
  entity.activityId = event.params.activityId
  entity.activity_dataCID = event.params.activity.dataCID
  entity.activity_topic = event.params.activity.topic
  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.activities(...)
  // - contract.activityCount(...)
  // - contract.getActivity(...)
  // - contract.isParticipant(...)
  // - contract.isParticipantInActivity(...)
}

export function handleActivityDeleted(event: ActivityDeleted): void {
  let id = Bytes.fromByteArray(Bytes.fromBigInt(event.params.activityId));
  let entity = Activity.load(id);
  if (entity == null) {
    return;
  }
  store.remove("Activity", id.toHexString());
}

export function handleActivityUpdated(event: ActivityUpdated): void {
  let id = Bytes.fromByteArray(Bytes.fromBigInt(event.params.activityId));
  let entity = Activity.load(id);
  if (entity == null) {
    return;
  }
  entity.activity_dataCID = event.params.activity.dataCID
  entity.activity_topic = event.params.activity.topic
  entity.save();
}

export function handleParticipantAdded(event: ParticipantAdded): void {}

export function handleParticipantRemoved(event: ParticipantRemoved): void {}
