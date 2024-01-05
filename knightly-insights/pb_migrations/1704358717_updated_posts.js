/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fih777vd28r1425")

  collection.name = "openings"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fih777vd28r1425")

  collection.name = "posts"

  return dao.saveCollection(collection)
})
