module.exports = {
  friendlyName: "Upload thing",

  description: "",

  files: ["photo"],

  inputs: {
    photo: {
      type: "ref",
      description: "Uploaded file stream",
      required: true,
    },
    label: {
      type: "string",
    },
  },

  exits: {
    success: {
      outputDescription: "Information about the newly created record.",
      output: {
        id: "number",
        imageSrc: "string",
      },
    },
    badRequest: {
      descriptio: "No image upload was provided.",
      responseType: "badRequest",
    },
  },

  fn: async function (inputs) {
    var url = require("url");

    var info = await sails.uploadOne(inputs.photo);

    if (!info) {
      throw "badRequest";
    }
    var newThing = await Thing.create({
      imageUploadFd: info.fd,
      imageUploadMime: info.type,
      owner: this.req.me.id,
      label: inputs.label,
    }).fetch();

    return {
      id: newThing.id,
      imageSrc: url.resolve(
        sails.config.custom.baseUrl,
        "/api/v1/things/" + newThing.id
      ),
    };
  },
};
