import { Server } from "./presentation/server";


( async () => {

    try {
        
        main();
        
    } catch (error) {
        console.error('Error starting server:', error)
    };
})();


function main() {
    
    Server.start();
    // console.log('main2')
}