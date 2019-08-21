Component({
    externalClasses: [ "custom-class" ],
    properties: {
        info: null,
        name: String,
        size: String,
        color: String
    },
    methods: {
        onClick: function() {
            this.triggerEvent("click");
        }
    }
});