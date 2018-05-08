Component({
    properties: {
        modalTitle: {
            type: String,
            value: "请填写"
        },
        hidden: {
            type: Boolean,
            value: !0
        },
        from: {
            type: String,
            value: "aniu"
        }
    },
    options: {
        multipleSlots: !0
    },
    data: {},
    methods: {
        hideKefu: function() {
            this.setData({
                hidden: !0
            });
        }
    }
});