import express from "express";
import minimist from "minimist";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PUERTO argumento por defecto
const args = minimist(process.argv.slice(2), {
	default: {
		PORT: 8080,
	},
	alias: {
		p: "PORT",
	},
});

/**routes */
import indexRoutes from "./src/routes/indexRoutes.js";
app.use("/", indexRoutes);

const server = app.listen(args.PORT, () =>
	console.log(
		`Server started on port ${args.PORT} at ${new Date().toLocaleString()}`
	)
);
server.on("error", (err) => console.log(err));

export { args };
