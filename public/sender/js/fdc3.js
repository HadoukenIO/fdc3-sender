fin.desktop.FDC3 = {
    publish(intent, context) {
        console.log("FDC3.Publish: ", { intent: intent, context: context });
        fin.desktop.InterApplicationBus.publish("FDC3", { intent: intent, context: context });
    },

    subscribe(callback) {
        fin.desktop.InterApplicationBus.subscribe("*", "FDC3", (message, uuid, name) => {
            message.origin = { uuid: uuid, name: name };

            console.log("FDC3.Subscribe: ", message);
            callback(message);
        });
    }
};

console.log("FDC3 READY: ", fin.desktop.FDC3);