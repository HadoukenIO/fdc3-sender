//event listeners.
document.addEventListener('DOMContentLoaded', () => {
    if (typeof fin != 'undefined') {
        fin.desktop.main(onMain);
    } else {
        ofVersion.innerText =
            'OpenFin is not available - you are probably running in a browser.';
    }
});

//once the DOM has loaded and the OpenFin API is ready
function onMain() {
    //get a reference to the current Application.
    const app = fin.desktop.Application.getCurrent();

    const getContextData = (secName) => {
        let data;

        data = securities.find(security => {
            return security.name === secName;
        });

        return data;
    };

    const createContextObject = (secName) => {
        let context = JSON.parse(JSON.stringify(contextTemplate)); //breaks ref links vs Object.assign
        let data = {};

        context.data.push(Object.assign(data, getContextData(secName)));

        console.log(context);

        return context;
    };

    let contextTemplate = {
        object: "fdc3-context",
        definition: "https://fdc3.org/context/1.0.0/",
        version: "1.0.0",
        data: []
    };

    let securities = [
        {
            name: "ibm",
            id: {
                ticker: "IBM"
            }
        },
        {
            name: "apple",
            id: {
                ticker: "AAPL"
            }
        }
    ];

    const ibmBtn = document.querySelector('#ibm');

    ibmBtn.addEventListener('click', () => {
        let context = createContextObject('ibm');
        console.log(context);
        fin.desktop.FDC3.publish('ticker', context);
    });

    const appleBtn = document.querySelector('#apple');

    appleBtn.addEventListener('click', () => {
        let context = createContextObject('apple');
        console.log(context);
        fin.desktop.FDC3.publish('ticker', context);
    });

    fin.desktop.Application.createFromManifest('http://localhost:5555/external-app/app.json', app => {
        app.run(null, console.log);
    }, console.log);
}
