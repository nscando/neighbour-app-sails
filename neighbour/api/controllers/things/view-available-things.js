module.exports = {
  friendlyName: "View available things",

  description: 'Display "Available things" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/things/available-things",
    },
  },

  fn: async function () {
    //TODO: come back to this and only fetch things that the current user is allowed to see.
    var things = await Thing.find();
    return { things };
  },
};
