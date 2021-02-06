module.exports = {
  friendlyName: "Destroy one thing",

  description: 'Delete one "thing" with the specified ID from the database.',

  inputs: {
    id: {
      type: "number",
      required: true,
    },
  },

  exits: {
    notFound: {
      description: "No such thing with that ID exist.",
      responseType: "notFound",
    },
    forbidden: {
      description:
        " The User making this request doesn`t have permissions to delete this thing!",
      responseType: "forbidden",
    },
  },

  fn: async function (inputs) {
    var thing = await Thing.findOne({
      id: inputs.id,
    });

    if (!thing) {
      throw "notFound";
    }
    if (thing.owner !== this.req.me.id) {
      throw "forbidden";
    }

    var destroyThing = await Thing.destroy({ id: inputs.id });
    return destroyThing;
  },
};
