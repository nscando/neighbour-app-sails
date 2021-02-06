module.exports = {
  friendlyName: "View available things",

  description: 'Display "Available things" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/things/available-things",
    },
  },

  fn: async function () {
    // Get the list of things this user can see.
    var things = await Thing.find({
      or: [
        // Friend things:
        //prettier-ignore
        { owner: { 'in': _.pluck(this.req.me.friends, "id") } },
        // My things:
        { owner: this.req.me.id },
      ],
    }).populate("owner");

    // Respond with view.
    return {
      currentSection: things,
      things: things,
    };
  },
};
