import { config } from "./src/config/config.js";
import app from "./app.js"

const startServer = () => {
    const PORT:number = config.get("PORT");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();


