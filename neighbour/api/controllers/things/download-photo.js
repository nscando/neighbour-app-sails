module.exports = {
  friendlyName: "Download photo",

  description: "Download photo file (returning a stream).",

  inputs: {
    id: {
      description: "The ID of the thing whose photo we're downloading.",
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      outputDescription: "The streaming byte of the especified thing's photo",
      outputType: "ref",
    },
    notFound: {
      responseType: "notFound",
    },

    forbidden: {
      responseType: "forbidden",
    },
  },

  fn: async function (inputs) {
    var thing = await Thing.findOne({ id: inputs.id });

    if (!thing) {
      throw "notFound";
    }
    var friends = User.findOne({ id: this.req.me.id }).populate("friends");

    if (
      this.req.me.id !== thing.owner &&
      !_.any(friends, { id: thing.owner })
    ) {
      throw "forbidden";
    }

    //Set the mime type for the response
    this.res.type(thing.imageUploadMime);

    var downloading = await sails.startDownload(thing.imageUploadFd);

    return downloading;
  },
};
