import { Server } from "./presentation/server";


( async () => {

    try {
        await main();
    } catch (error) {
        console.error('Error starting server:', error)
    };
})();


function main() {
    Server.start();
}