import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  DemosManagement,
  DemoSubmitted
} from "../generated/DemosManagement/DemosManagement"
import { Demo } from "../generated/schema"

export function handleDemoSubmitted(event: DemoSubmitted): void {
  // Entities can be loaded from the store using an ID; this ID
  // needs to be unique across all entities of the same type
  const id = event.transaction.hash.concat(
    Bytes.fromByteArray(Bytes.fromBigInt(event.logIndex))
  )
  let entity = Demo.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Demo(id)

    // Entity fields can be set using simple assignments
  }

  // BigInt and BigDecimal math are supported
  entity.activityId = event.params.activityId
  entity.demo_demoId = event.params.demo.demoId
  entity.demo_cohortId = event.params.demo.cohortId
  entity.demo_dataCID = event.params.demo.dataCID

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
  // - contract.demos(...)
  // - contract.getDemoCohortId(...)
}
