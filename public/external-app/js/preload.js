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

window.addEventListener('load', () => {
    const currentApp = fin.desktop.Application.getCurrent();
    const currentWin = fin.desktop.Window.getCurrent();
    const inputEvt = new Event('input', { 'bubbles': true, 'cancelable': true });

    fin.desktop.FDC3.subscribe((message) => {
        if (message.intent === 'ticker') {
            const tickerInput = document.querySelector('.freeText');
            tickerInput.value = message.context.data[0].id.ticker;
            tickerInput.dispatchEvent(inputEvt);
        }
    });
});