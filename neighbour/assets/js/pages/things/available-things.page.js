parasails.registerPage("available-things", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    thing: [],
    confirmDeleteThingModalOpen: false,
    selectedThing: undefined,

    uploadThingModalOpen: false,
    uploadFormData: {
      label: "",
      photo: undefined,
      previewImageSrc: "",
    },

    //Syncing /loading state
    syncing: false,

    //Validation errors:
    formErrors: {},

    //Server error state:
    cloudError: "",
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    _.extend(this, SAILS_LOCALS);
    // this.things = this._marshalEntries(this.things);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    clickDeleteThing: function (thingId) {
      console.log("clicked the delete button");
      this.confirmDeleteThingModalOpen = true;
      this.selectedThing = _.find(this.things, { id: thingId });
    },

    closeDeleteThingModal: function () {
      this.selectedThing = undefined;
      this.confirmDeleteThingModalOpen = false;
      this.cloudError = "";
    },

    handleParsingDeleteForm: function () {
      return { id: this.selectedThing.id };
    },

    submittedDeleteThingForm: function () {
      _.remove(this.things, { id: this.selectedThing.id });
      this.$forceUpdate();

      //Close the modal.
      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
      this.cloudError = "";
    },

    clickAddButton: function () {
      this.uploadThingModalOpen = true;
    },

    _clearUploadThingModal: function () {
      //Close modal
      this.uploadThingModalOpen = false;
      //Reset form  data
      this.uploadFormData = {
        label: "",
        photo: undefined,
        previewImageSrc: "",
      };
      //Clear error states
      this.formErrors = {};
      this.cloudError = "";
    },

    closeUploadThingModal: function () {
      this._clearUploadThingModal();
    },

    handleParsingUploadThingForm: function () {
      //Clear aut any pre-existing error messages.
      this.formErrors = {};

      var argins = this.uploadFormData;

      //TODO: validations go here
      //if there were any issues, they've already now bee comincated tod the user,
      //so simply return undefined.(This signifies that submission should be cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      return argins;
    },

    submittedUploadThingForm: function (result) {
      this.thing.push({
        label: this.uploadFormData.label,
        id: result.id,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });

      //Close the modal.
      this._clearUploadThingModal();
    },

    changeFileInput: function (files) {
      if (files.length !== 1 && !this.uploadFormData.photo) {
        throw new Error(
          "Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more tahn one file in the array! This should never happen unless ther is already an uploaded file tracked ."
        );
      }
      var selectedFile = files[0];

      if (!selectedFile && this.uploadFormData.photo) {
        return;
      }
      this.uploadFormData.photo = selectedFile;

      //Set up the file preview for the UI:

      var reader = new FileReader();
      reader.onload = (e) => {
        this.uploadFormData.previewImageSrc = e.target.result;

        //Unbind this "onload" event.
        delete reader.onload;
      };
      this.formErrors.photo = false;
      reader.readAsDataURL(selectedFile);
    },
  },
});
