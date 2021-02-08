module.exports = {
  friendlyName: "View available things",

  description: 'Display "Available things" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/things/available-things",
    },
  },

  fn: async function () {
    var url = require("url");

    var me = await User.findOne({
      id: this.req.me.id,
    }).populate("friends");

    var friendsIds = _.pluck(me.friends, "id");
    var things = await Thing.find({
      or: [{ owner: this.req.me.id }, { owner: { in: friendsIds } }],
    }).populate("owner");

    _.each(things, (thing) => {
      thing.imageSrc = url.resolve(
        sails.config.custom.baseUrl,
        "/api/v1/things/" + thing.id
      );
      delete thing.imageUploadFd;
      delete thing.imageUploadMime;
    });

    // Respond with view.
    return {
      currentSection: things,
      things,
    };
  },
};
