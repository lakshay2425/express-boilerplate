import app from "./app.js";
import { config } from "./src/config/config.js";


const startServer = () => {
    const PORT = config.get("PORT") || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();


