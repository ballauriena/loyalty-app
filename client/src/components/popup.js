const Popup = {
    show: function(content) {
        m.render(
            document.getElementById("popup"),
            m("div.ui.message.error", [
                m("i.close.icon", {
                    onclick: () => {
                        m.render(document.getElementById("popup"), null);
                    }
                }),
                m("div", m("p", content))
            ])
        );
        setTimeout(this.close, 5000);
    },

    close: (popupId = "popup") => {
        m.render(document.getElementById("popup"), null);
    }
};

module.exports = Popup;
