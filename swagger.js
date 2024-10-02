const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "User Api",
        description: "Pokemon Api"
    },
    host: "cse341-project-2-zk81.onrender.com",
    schemes: ["https"]
};

const outputfile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputfile, endpointsFiles, doc);