const Popup = {
    show: function(msgs) {
        m.render(
            document.getElementById("popup"),
            m("div.ui.message.error", [
                m("i.close.icon", {
                    onclick: () => {
                        m.render(document.getElementById("popup"), null);
                    }
                }),
                m("div", msgs.map(function(msg) { return m("li", msg)}))
            ])
        );
        setTimeout(this.close, 5000);
    },

    close: (popupId = "popup") => {
        m.render(document.getElementById("popup"), null);
    }
};

module.exports = Popup;
