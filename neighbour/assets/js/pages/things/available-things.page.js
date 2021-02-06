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
  beforeMount: function () {},
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
      console.log("this works ok");
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
      //TODO

      //Close the modal.
      this._clearUploadThingModal();
    },
  },
});
