import I18n from "I18n";
import { withPluginApi } from "discourse/lib/plugin-api";
import showModal from "discourse/lib/show-modal";

export default {
  name: "raw-post-button",
  initialize() {
    withPluginApi("0.8.7", api => {
      const currentUser = api.getCurrentUser();
      if (!currentUser) return;

      if (
        currentUser.staff ||
        currentUser.trust_level >= settings.min_trust_level
      ) {
        // TMP: translation hack for raw button and modal title
        I18n.translations[I18n.currentLocale()].js.raw_post = {
          modal_title: "Raw Post",
          button_title: "raw post"
        };

        api.attachWidgetAction("post-menu", "showRaw", function() {
          const model = this.attrs;
          showModal("rawPost", {
            model,
            title: "raw_post.modal_title"
          });
        });

        api.addPostMenuButton("show-raw", () => {
          return {
            action: "showRaw",
            icon: "file-alt",
            className: "raw-post",
            title: "raw_post.button_title",
            position: "second-last-hidden"
          };
        });
      }
    });
  }
};
