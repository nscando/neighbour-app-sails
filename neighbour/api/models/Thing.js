/**
 * Thing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    label: {
      type: "string",
      example: "Mr. Waffle Maker",
      description: "A user-submitted label describing this thing.",
    },

    imageUploadFd: {
      type: "string",
      description:
        'The Skipper file descriptor uniquely identifies this uploaded image associated  with this "Thing"',
      required: true,
    },

    imageUploadMime: {
      type: "string",
      description: "The MIME type for the uoloaded image.",
      required: true,
    },

    expectedReturnAt: {
      type: "number",
      description:
        "A JS timestamp representing the moment of this item's expected return.",
      example: 15023432546,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    borrowedBy: {
      model: "User",
      description:
        "The ID of the user who is currently borrowing this item, or null if it's not currently being borrowed.",
    },

    owner: {
      model: "User",
      required: true,
    },
  },
};
